function mostrarTabla(datos) {
    if (!Array.isArray(datos) || datos.length === 0) {
      document.getElementById('tabla-container').innerHTML = 'No hay datos para mostrar.';
      return;
    }
  
    let html = '<table class="mi-tabla">';
    html += '<thead><tr>';
    datos[0].forEach(col => {
      html += `<th>${col}</th>`;
    });
    html += '</tr></thead><tbody>';
  
    for (let i = 1; i < datos.length; i++) {
      html += '<tr>';
      datos[i].forEach(celda => {
        html += `<td>${celda}</td>`;
      });
      html += '</tr>';
    }
  
    html += '</tbody></table>';
    document.getElementById('tabla-container').innerHTML = html;
  }

  function cargarCerradosDesdeJSONP(datos) {
    if (!datos || datos.length === 0) {
      document.getElementById('tabla-container').innerHTML = 'No hay datos para mostrar.';
      return;
    }
  
    let html = '<table class="mi-tabla">';
    html += '<thead><tr>';
    datos[0].forEach(col => {
      html += `<th>${col}</th>`;
    });
    html += '</tr></thead><tbody>';
  
    for (let i = 1; i < datos.length; i++) {
      html += '<tr>';
      datos[i].forEach(celda => {
        html += `<td>${celda}</td>`;
      });
      html += '</tr>';
    }
  
    html += '</tbody></table>';
    document.getElementById('tabla-container').innerHTML = html;
  }  
  
  // Esta función será llamada desde el JSONP
  function cargarCerrados() {
    const script = document.createElement('script');
    script.src = 'https://script.google.com/macros/s/AKfycbyAHkYacvU6fR46i6qnW01yY1vOxNLRycAf3xInYmazVsr3xI-XNyaAtwivNe8E_X22/exec?tipo=cerrados&callback=cargarCerradosDesdeJSONP';
    document.body.appendChild(script);
  }
  
  function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
  }
  
  window.onload = cargarCerrados;