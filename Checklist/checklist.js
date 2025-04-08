// Al cargar la página, cargamos datos desde localStorage (si existen)
function inicializarTablas() {
  const datos = JSON.parse(localStorage.getItem("datosChecklist"));
  if (!datos) return;

  cargarDatosEnTabla("tabla-revisar", datos.revisar);
  cargarDatosEnTabla("tabla-frecuentes", datos.frecuentes);
  cargarDatosEnTabla("tabla-fixes", datos.fixes);
  document.getElementById("fecha-paquete").value = datos.fechaPaquete || "";
}

function agregarFilaVacia(idTabla) {
  const tabla = document.getElementById(idTabla).getElementsByTagName("tbody")[0];
  const fila = tabla.insertRow();

  let cantidadCeldas = 0;
  switch (idTabla) {
    case "tabla-revisar":
      cantidadCeldas = 2;
      break;
    case "tabla-frecuentes":
      cantidadCeldas = 8;
      break;
    case "tabla-fixes":
      cantidadCeldas = 2;
      break;
  }

  for (let i = 0; i < cantidadCeldas; i++) {
    const celda = fila.insertCell();
    const input = document.createElement("input");
    input.type = "text";
    celda.appendChild(input);
  }
}

function guardarChecklist() {
  const revisar = obtenerDatosDeTabla("tabla-revisar");
  const frecuentes = obtenerDatosDeTabla("tabla-frecuentes");
  const fixes = obtenerDatosDeTabla("tabla-fixes");
  const fechaPaquete = document.getElementById("fecha-paquete").value;

  const datos = {
    revisar,
    frecuentes,
    fixes,
    fechaPaquete
  };

  localStorage.setItem("datosChecklist", JSON.stringify(datos));
  alert("✅ Checklist guardado localmente");
}

function obtenerDatosDeTabla(idTabla) {
  const tabla = document.getElementById(idTabla).getElementsByTagName("tbody")[0];
  const datos = [];

  for (let fila of tabla.rows) {
    const filaDatos = [];
    for (let celda of fila.cells) {
      const input = celda.querySelector("input");
      filaDatos.push(input ? input.value : "");
    }
    datos.push(filaDatos);
  }

  return datos;
}

function cargarDatosEnTabla(idTabla, datos) {
  const tabla = document.getElementById(idTabla).getElementsByTagName("tbody")[0];
  tabla.innerHTML = ""; // Limpia la tabla antes de insertar

  datos.forEach(filaDatos => {
    const fila = tabla.insertRow();
    filaDatos.forEach(valor => {
      const celda = fila.insertCell();
      const input = document.createElement("input");
      input.type = "text";
      input.value = valor;
      celda.appendChild(input);
    });
  });
}

// Al cargar, hacé que se pueda seleccionar una fila con clic
function inicializarSeleccionDeFilas() {
  document.querySelectorAll("tbody").forEach(tbody => {
    tbody.addEventListener("click", e => {
      const fila = e.target.closest("tr");
      if (!fila) return;

      // Desmarcar cualquier otra fila seleccionada
      tbody.querySelectorAll("tr").forEach(tr => tr.classList.remove("seleccionada"));

      // Marcar la fila actual
      fila.classList.add("seleccionada");
    });
  });
}

// Eliminar la fila seleccionada de una tabla
function eliminarFilaSeleccionada(idTabla) {
  const tabla = document.getElementById(idTabla);
  const filaSeleccionada = tabla.querySelector("tbody tr.seleccionada");
  if (filaSeleccionada) {
    filaSeleccionada.remove();
  } else {
    alert("Seleccioná una fila para eliminar.");
  }
}

















  