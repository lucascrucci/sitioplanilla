const URL_API = "AKfycbyAHkYacvU6fR46i6qnW01yY1vOxNLRycAf3xInYmazVsr3xI-XNyaAtwivNe8E_X22";

// checklist.js

function agregarFila(idTabla) {
  const tabla = document.getElementById(idTabla);
  const tbody = tabla.querySelector("tbody");
  const fila = document.createElement("tr");

  const columnas = tabla.querySelector("thead tr").children.length;
  for (let i = 0; i < columnas; i++) {
    const celda = document.createElement("td");
    celda.contentEditable = "true";
    fila.appendChild(celda);
  }

  tbody.appendChild(fila);
}

function cargarChecklist() {
  // Temas a revisar
  fetch(`${URL_API}?tipo=leerTemasRevisar`)
    .then(res => res.json())
    .then(data => {
      const tabla = document.getElementById("tabla-revisar");
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

      agregarFila("tabla-revisar"); // Agrega la fila vacía editable
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

      agregarFila("tabla-frecuentes"); // Agrega la fila vacía editable
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

      agregarFila("tabla-fixes"); // Agrega la fila vacía editable
    });
}

function guardarChecklist() {
  // Implementación posterior
  alert("Checklist guardado correctamente (funcionalidad pendiente de implementar)");
}










  