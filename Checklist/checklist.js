// ✅ checklist.js

// 🌐 URL del Web App desplegado (modo ejecución como tu usuario)
const URL_API = 'https://script.google.com/macros/s/AKfycbyAHkYacvU6fR46i6qnW01yY1vOxNLRycAf3xInYmazVsr3xI-XNyaAtwivNe8E_X22/exec';

// ➕ Agregar una nueva fila editable en la tabla indicada
function agregarFila(idTabla) {
  const tabla = document.getElementById(idTabla);
  const fila = tabla.insertRow();
  const columnas = tabla.rows[0].cells.length;

  for (let i = 0; i < columnas; i++) {
    const celda = fila.insertCell();
    celda.contentEditable = "true";
  }
}

// 💾 Guardar los datos del checklist en la hoja
function guardarChecklist() {
  const revisar = obtenerDatosTabla("tabla-revisar");
  const frecuentes = obtenerDatosTabla("tabla-frecuentes");
  const fixes = obtenerDatosTabla("tabla-fixes");
  const fechaFixes = document.getElementById("fecha-paquete").value.trim();

  const payload = {
    tipo: "guardarChecklist",
    revisar,
    frecuentes,
    fixes,
    fechaFixes
  };

  // ✅ POST limpio (sin callback) + parseo como texto
  fetch(URL_API, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(response => response.json())
  .then(data => {
    if (data.status === "OK") {
      alert("✅ Checklist guardado correctamente.");
    } else {
      alert("❌ Ocurrió un error al guardar el checklist.");
      console.error("Respuesta inesperada:", data);
    }
  })  
    .catch(error => {
      console.error("❌ Error al guardar checklist:", error);
      alert("❌ Ocurrió un error al guardar el checklist.");
    });
}

// 📋 Obtener todos los datos editados de una tabla (salta la fila 0 que es el header)
function obtenerDatosTabla(idTabla) {
  const tabla = document.getElementById(idTabla);
  const datos = [];

  for (let i = 1; i < tabla.rows.length; i++) {
    const fila = [];
    for (let j = 0; j < tabla.rows[i].cells.length; j++) {
      fila.push(tabla.rows[i].cells[j].innerText.trim());
    }
    datos.push(fila);
  }

  return datos;
}






  