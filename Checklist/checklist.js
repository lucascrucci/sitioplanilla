// 📥 Cargar datos del checklist desde la hoja
function cargarChecklist() {
  // Temas a revisar
  fetch(`${URL_API}?tipo=leerTemasRevisar`)
    .then(res => res.json())
    .then(data => {
      const tabla = document.getElementById("tabla-revisar");
      tabla.innerHTML = "<tr><th>Temas a revisar</th><th>Entregas</th></tr>";
      data.forEach(fila => {
        const tr = tabla.insertRow();
        fila.forEach(celda => {
          const td = tr.insertCell();
          td.textContent = celda;
          td.contentEditable = "true";
        });
      });
    });

  // Temas frecuentes
  fetch(`${URL_API}?tipo=leerChecklist`)
    .then(res => res.json())
    .then(data => {
      const tabla = document.getElementById("tabla-frecuentes");
      tabla.innerHTML = `
        <tr>
          <th>Tema</th><th>Responsable</th><th>Nivel</th><th>Analista</th>
          <th>Fecha de entrega</th><th>Entrega prevista</th><th>Invgate</th><th>Comentarios</th>
        </tr>`;
      data.forEach(fila => {
        const tr = tabla.insertRow();
        fila.forEach(celda => {
          const td = tr.insertCell();
          td.textContent = celda;
          td.contentEditable = "true";
        });
      });
    });

  // Fixes + fecha
  fetch(`${URL_API}?tipo=leerFixes`)
    .then(res => res.json())
    .then(data => {
      const tabla = document.getElementById("tabla-fixes");
      const inputFecha = document.getElementById("fecha-paquete");

      inputFecha.value = data.fecha || "";

      tabla.innerHTML = `<tr><th>Inventario de fixes proximo paquete</th><th>Comentarios</th></tr>`;
      data.fixes.forEach(fila => {
        const tr = tabla.insertRow();
        fila.forEach(celda => {
          const td = tr.insertCell();
          td.textContent = celda;
          td.contentEditable = "true";
        });
      });
    })
    .catch(err => console.warn("No se pudo leer la tabla de fixes todavía (no implementada)"));
}







  