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







  