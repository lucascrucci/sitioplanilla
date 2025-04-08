const URL_API = "https://script.google.com/macros/s/AKfycbyAHkYacvU6fR46i6qnW01yY1vOxNLRycAf3xInYmazVsr3xI-XNyaAtwivNe8E_X22/exec";

// Agrega una fila editable al final de una tabla
function agregarFila(idTabla) {
  const tabla = document.getElementById(idTabla);
  const fila = tabla.insertRow();
  const columnas = tabla.rows[0].cells.length;

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
      tabla.innerHTML = tabla.rows[0].outerHTML; // Deja solo encabezado

      data.forEach(fila => {
        const nuevaFila = tabla.insertRow();
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
      tabla.innerHTML = tabla.rows[0].outerHTML;

      data.forEach(fila => {
        const nuevaFila = tabla.insertRow();
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
      const inputFecha = document.getElementById("fecha-paquete");
      inputFecha.value = data.fecha || "";
      tabla.innerHTML = tabla.rows[0].outerHTML;

      data.fixes.forEach(fila => {
        const nuevaFila = tabla.insertRow();
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

  // Saltar la cabecera (row[0])
  for (let i = 1; i < tabla.rows.length; i++) {
    const celdas = Array.from(tabla.rows[i].cells).map(td => td.textContent.trim());
    const filaVacia = celdas.every(cell => cell === "");
    if (!filaVacia) {
      filas.push(celdas);
    }
  }

  return filas;
}













  