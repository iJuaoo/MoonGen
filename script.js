var generando = false;
var tiempoRestante = 0;

document.getElementById('hbo').addEventListener('click', function() {
  mostrarServicio('HBO');
});

document.getElementById('disney').addEventListener('click', function() {
  mostrarServicio('Disney+');
});

document.getElementById('generar').addEventListener('click', function() {
  if (!generando) {
    generando = true;
    var archivo = (document.getElementById('logo').src.includes('hbo.png')) ? 'hbo.txt' : 'disney.txt';

    fetch(archivo)
      .then(response => response.text())
      .then(data => {
        var lineas = data.split('\n');
        if (lineas.length > 0) {
          var indiceAleatorio = Math.floor(Math.random() * lineas.length);
          var registroAleatorio = lineas[indiceAleatorio].trim();
          var datos = registroAleatorio.split(':');
          document.getElementById('correo').innerText = 'Correo: ' + datos[0];
          document.getElementById('contrasena').innerText = 'Contraseña: ' + datos[1];
          tiempoRestante = 10; // Establece el tiempo restante en 120 segundos (2 minutos)
          actualizarTiempoRestante();
          var intervalo = setInterval(function() {
            tiempoRestante--;
            if (tiempoRestante <= 0) {
              clearInterval(intervalo);
              generando = false;
              document.getElementById('generar').innerText = 'Generar';
            } else {
              actualizarTiempoRestante();
            }
          }, 1000); // Actualiza el tiempo restante cada segundo
        } else {
          document.getElementById('correo').innerText = 'No hay más correos y contraseñas disponibles.';
          document.getElementById('contrasena').innerText = '';
        }
      })
      .catch(error => console.error('Error:', error));
  }
});

function mostrarServicio(servicio) {
  document.getElementById('logo').src = servicio.toLowerCase() + '.png';
  document.getElementById('servicio-titulo').innerText = servicio;
  document.getElementById('menu-container').style.display = 'none';
  document.getElementById('logo-container').style.display = 'block';
  document.getElementById('info-container').style.display = 'block';
}

function actualizarTiempoRestante() {
  var minutos = Math.floor(tiempoRestante / 60);
  var segundos = tiempoRestante % 60;
  var mensaje = 'Puedes volver a generar en: ' + minutos.toString().padStart(2, '0') + ':' + segundos.toString().padStart(2, '0');
  document.getElementById('generar').innerText = mensaje;
}
