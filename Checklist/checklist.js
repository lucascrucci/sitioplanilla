const URL_API = "TU_URL_DEL_DEPLOY"; // Reemplazá esto con tu URL real

function cargarChecklist() {
  // Temas a revisar
  fetch(`${URL_API}?tipo=leerTemasRevisar`)
    .then(res => res.json())
    .then(data => {
      const tabla = document.getElementById("tabla-revisar");
      const tbody = tabla.querySelector("tbody");
      tbody.innerHTML = ""; // Limpiar solo el cuerpo

      data.forEach(fila => {
        const tr = document.createElement("tr");
        fila.forEach(celda => {
          const td = document.createElement("td");
          td.textContent = celda;
          td.contentEditable = "true";
          tr.appendChild(td);
        });
        tbody.appendChild(tr);
      });
    });

  // Temas frecuentes
  fetch(`${URL_API}?tipo=leerChecklist`)
    .then(res => res.json())
    .then(data => {
      const tabla = document.getElementById("tabla-frecuentes");
      const tbody = tabla.querySelector("tbody");
      tbody.innerHTML = "";

      data.forEach(fila => {
        const tr = document.createElement("tr");
        fila.forEach(celda => {
          const td = document.createElement("td");
          td.textContent = celda;
          td.contentEditable = "true";
          tr.appendChild(td);
        });
        tbody.appendChild(tr);
      });
    });

  // Fixes + fecha
  fetch(`${URL_API}?tipo=leerFixes`)
    .then(res => res.json())
    .then(data => {
      const tabla = document.getElementById("tabla-fixes");
      const tbody = tabla.querySelector("tbody");
      const inputFecha = document.getElementById("fecha-paquete");

      inputFecha.value = data.fecha || "";

      tbody.innerHTML = "";

      data.fixes.forEach(fila => {
        const tr = document.createElement("tr");
        fila.forEach(celda => {
          const td = document.createElement("td");
          td.textContent = celda;
          td.contentEditable = "true";
          tr.appendChild(td);
        });
        tbody.appendChild(tr);
      });
    })
    .catch(err => console.warn("No se pudo leer la tabla de fixes todavía (no implementada)"));
}

// ✅ Agrega fila editable
function agregarFila(tablaId) {
  const tabla = document.getElementById(tablaId);
  const tbody = tabla.querySelector("tbody");
  const nuevaFila = tbody.insertRow();

  const columnas = tabla.querySelectorAll("thead th").length;
  for (let i = 0; i < columnas; i++) {
    const celda = nuevaFila.insertCell();
    celda.contentEditable = "true";
    celda.innerText = "";
  }
}

// ✅ Guarda todas las tablas
function guardarChecklist() {
  const revisar = obtenerDatosDesdeTabla("tabla-revisar");
  const frecuentes = obtenerDatosDesdeTabla("tabla-frecuentes");
  const fixes = obtenerDatosDesdeTabla("tabla-fixes");
  const fechaFixes = document.getElementById("fecha-paquete").value;

  const payload = {
    tipo: "guardarChecklistCompleto",
    revisar,
    frecuentes,
    fixes,
    fechaFixes
  };

  fetch(URL_API, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: { "Content-Type": "application/json" }
  })
    .then(res => res.json())
    .then(data => {
      alert("✅ Checklist guardado correctamente");
    })
    .catch(err => {
      console.error(err);
      alert("❌ Error al guardar el checklist");
    });
}

// ✅ Extrae los datos de la tabla como array de arrays
function obtenerDatosDesdeTabla(tablaId) {
  const tabla = document.getElementById(tablaId);
  const filas = tabla.querySelectorAll("tbody tr");
  const datos = [];

  filas.forEach(fila => {
    const celdas = fila.querySelectorAll("td");
    const filaDatos = Array.from(celdas).map(td => td.innerText.trim());
    datos.push(filaDatos);
  });

  return datos;
}








  