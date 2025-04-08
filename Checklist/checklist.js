const URL_API = "https://script.google.com/macros/s/AKfycbyAHkYacvU6fR46i6qnW01yY1vOxNLRycAf3xInYmazVsr3xI-XNyaAtwivNe8E_X22/exec";

// Agrega una fila editable al final de una tabla
function agregarFila(idTabla) {
  const tabla = document.getElementById(idTabla);
  if (!tabla) return;

  const tbody = tabla.querySelector("tbody");
  const thead = tabla.querySelector("thead");
  if (!thead) return;

  const columnas = thead.querySelector("tr").children.length;
  const fila = document.createElement("tr");

  for (let i = 0; i < columnas; i++) {
    const celda = document.createElement("td");
    celda.contentEditable = "true";
    fila.appendChild(celda);
  }

  tbody.appendChild(fila);
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
        const tr = document.createElement("tr");
        fila.forEach(celda => {
          const td = document.createElement("td");
          td.textContent = celda;
          td.contentEditable = "true";
          tr.appendChild(td);
        });
        tbody.appendChild(tr);
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
        const tr = document.createElement("tr");
        fila.forEach(celda => {
          const td = document.createElement("td");
          td.textContent = celda;
          td.contentEditable = "true";
          tr.appendChild(td);
        });
        tbody.appendChild(tr);
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
        const tr = document.createElement("tr");
        fila.forEach(celda => {
          const td = document.createElement("td");
          td.textContent = celda;
          td.contentEditable = "true";
          tr.appendChild(td);
        });
        tbody.appendChild(tr);
      });

      agregarFila("tabla-fixes");
    });
}

// Botón de guardar (a implementar más adelante)
function guardarChecklist() {
  alert("Checklist guardado correctamente (funcionalidad pendiente de implementar)");
}











  