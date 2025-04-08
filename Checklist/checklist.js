const URL_API = "https://script.google.com/macros/s/AKfycbyAHkYacvU6fR46i6qnW01yY1vOxNLRycAf3xInYmazVsr3xI-XNyaAtwivNe8E_X22/exec";

// Agrega una fila editable al final de una tabla
function agregarFila(idTabla) {
  const tabla = document.getElementById(idTabla);
  const tbody = tabla.querySelector("tbody");
  const columnas = tabla.querySelector("thead tr").children.length;
  const fila = tbody.insertRow();

  for (let i = 0; i < columnas; i++) {
    const celda = fila.insertCell();
    celda.contentEditable = "true";
  }
}

// Carga los datos desde el backend
function cargarChecklist() {
  // Temas a revisar
  fetch(`${URL_API}?tipo=leerTemasRevisar`)
    .then(res => res.json())
    .then(data => {
      const tabla = document.getElementById("tabla-revisar");
      const tbody = tabla.querySelector("tbody");
      tbody.innerHTML = "";

      data.forEach(fila => {
        const nuevaFila = tbody.insertRow();
        fila.forEach(celda => {
          const nuevaCelda = nuevaFila.insertCell();
          nuevaCelda.textContent = celda;
          nuevaCelda.contentEditable = "true";
        });
      });

      agregarFila("tabla-revisar");
    });

  // Temas frecuentes
  fetch(`${URL_API}?tipo=leerChecklist`)
    .then(res => res.json())
    .then(data => {
      const tabla = document.getElementById("tabla-frecuentes");
      const tbody = tabla.querySelector("tbody");
      tbody.innerHTML = "";

      data.forEach(fila => {
        const nuevaFila = tbody.insertRow();
        fila.forEach(celda => {
          const nuevaCelda = nuevaFila.insertCell();
          nuevaCelda.textContent = celda;
          nuevaCelda.contentEditable = "true";
        });
      });

      agregarFila("tabla-frecuentes");
    });

  // Fixes + Fecha del próximo paquete
  fetch(`${URL_API}?tipo=leerFixes`)
    .then(res => res.json())
    .then(data => {
      const tabla = document.getElementById("tabla-fixes");
      const tbody = tabla.querySelector("tbody");
      const inputFecha = document.getElementById("fecha-paquete");
      inputFecha.value = data.fecha || "";
      tbody.innerHTML = "";

      data.fixes.forEach(fila => {
        const nuevaFila = tbody.insertRow();
        fila.forEach(celda => {
          const nuevaCelda = nuevaFila.insertCell();
          nuevaCelda.textContent = celda;
          nuevaCelda.contentEditable = "true";
        });
      });

      agregarFila("tabla-fixes");
    });
}

function guardarChecklist() {
  const revisar = obtenerDatosDeTabla("tabla-revisar");
  const frecuentes = obtenerDatosDeTabla("tabla-frecuentes");
  const fixes = obtenerDatosDeTabla("tabla-fixes");
  const fechaPaquete = document.getElementById("fecha-paquete").value;

  const payload = {
    tipo: "guardarChecklist",
    revisar,
    frecuentes,
    fixes,
    fecha: fechaPaquete
  };

  fetch(URL_API, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(res => res.json())
    .then(respuesta => {
      if (respuesta.resultado === "ok") {
        alert("✅ Checklist guardado correctamente.");
      } else {
        alert("⚠️ Ocurrió un error al guardar: " + respuesta.mensaje);
      }
    })
    .catch(err => {
      console.error(err);
      alert("❌ Error al guardar el checklist.");
    });
}

// Función auxiliar para tomar los datos de una tabla
function obtenerDatosDeTabla(idTabla) {
  const tabla = document.getElementById(idTabla);
  const filas = [];

  const tbody = tabla.querySelector("tbody");
  const tr = tbody.querySelectorAll("tr");

  for (let i = 0; i < tr.length; i++) {
    const celdas = Array.from(tr[i].cells).map(td => td.textContent.trim());
    const filaVacia = celdas.every(cell => cell === "");
    if (!filaVacia) {
      filas.push(celdas);
    }
  }

  return filas;
}














  