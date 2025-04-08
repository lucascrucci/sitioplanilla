const URL_BASE = "https://script.google.com/a/macros/iplan.com.ar/s/AKfycbw3MRAKuEquhWtNHIfUSu9jBrxHsxfzgzSxr6qTHSIg0I-8Sr6l_qjSZcKaDPDr_L9M/exec"; // <- reemplazá esto

function sincronizarAbiertos() {
    document.getElementById("resultado").innerText = "Sincronizando...";
  
    fetch(`${WEBAPP_URL}?accion=sincronizarAbiertos`)
      .then(res => res.json())
      .then(data => {
        document.getElementById("resultado").innerText = data.mensaje;
      })
      .catch(error => {
        document.getElementById("resultado").innerText = "Error al sincronizar.";
        console.error(error);
      });
  }

  function sincronizarCerrados() {
    document.getElementById("resultado").innerText = "Sincronizando...";
  
    fetch(`${WEBAPP_URL}?accion=sincronizarCerrados`)
      .then(res => res.json())
      .then(data => {
        document.getElementById("resultado").innerText = data.mensaje;
      })
      .catch(error => {
        document.getElementById("resultado").innerText = "Error al sincronizar.";
        console.error(error);
      });
  }
