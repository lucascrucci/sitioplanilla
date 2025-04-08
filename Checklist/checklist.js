const URL_API = "TAKfycbyAHkYacvU6fR46i6qnW01yY1vOxNLRycAf3xInYmazVsr3xI-XNyaAtwivNe8E_X22";

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

      // Agregar fila vacía editable
      const filaVacia = document.createElement("tr");
      for (let i = 0; i < 2; i++) {
        const td = document.createElement("td");
        td.contentEditable = "true";
        filaVacia.appendChild(td);
      }
      tbody.appendChild(filaVacia);
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

      // Fila vacía editable (8 columnas)
      const filaVacia = document.createElement("tr");
      for (let i = 0; i < 8; i++) {
        const td = document.createElement("td");
        td.contentEditable = "true";
        filaVacia.appendChild(td);
      }
      tbody.appendChild(filaVacia);
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

      // Fila vacía editable (2 columnas)
      const filaVacia = document.createElement("tr");
      for (let i = 0; i < 2; i++) {
        const td = document.createElement("td");
        td.contentEditable = "true";
        filaVacia.appendChild(td);
      }
      tbody.appendChild(filaVacia);
    })
    .catch(err => console.warn("No se pudo leer la tabla de fixes todavía (no implementada)"));
}









  