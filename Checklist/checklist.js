const URL_API = "https://script.google.com/macros/s/AKfycbyAHkYacvU6fR46i6qnW01yY1vOxNLRycAf3xInYmazVsr3xI-XNyaAtwivNe8E_X22/exec";

// Agrega una fila editable al final de una tabla
function agregarFilaVacia(idTabla) {
  const tabla = document.getElementById(idTabla);
  const tbody = tabla.querySelector("tbody");
  const columnas = tabla.querySelector("thead tr").children.length;
  const fila = tbody.insertRow();

  for (let i = 0; i < columnas; i++) {
    const celda = fila.insertCell();
    celda.contentEditable = "true";
  }
}

function inicializarTablas() {
  agregarFilaVacia("tabla-revisar");
  agregarFilaVacia("tabla-frecuentes");
  agregarFilaVacia("tabla-fixes");
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
        alert("⚠️ Error al guardar: " + respuesta.mensaje);
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
















  