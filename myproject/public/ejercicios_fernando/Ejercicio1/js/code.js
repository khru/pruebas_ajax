
  //necesario para escapar caracteres especiales, para que se pueda visualizar en contenido html.
   String.prototype.transformaCaracteresEspeciales = function() {
    return unescape(escape(this).
                      replace(/%0A/g, '<br/>').
                      replace(/%3C/g, '&lt;').
                      replace(/%3E/g, '&gt;'));
  }

 //posibles estados de la petición
  var estadosPosibles = ['No inicializado', 'Cargando', 'Cargado', 'Interactivo', 'Completado'];

  //variable que utilizaremos para restar al tiempo final.
  var tiempoInicial = 0;

 //función que onload carga la url en el input y también carga el contenido solicitado cuando se pulsa mostrar contenidos(llama a la función de carga).
  window.onload = function() {
    // Cargar en el input text la URL de la página
    var recurso = document.getElementById('recurso');
    recurso.value = location.href;

    // Cargar el recurso solicitado cuando se pulse el botón MOSTRAR CONTENIDOS
    document.getElementById('enviar').onclick = cargaContenido;
  }

  function cargaContenido() {
    // Borrar datos anteriores
    document.getElementById('contenidos').innerHTML = "";
    document.getElementById('estados').innerHTML = "";

    // Instanciar objeto XMLHttpRequest (navegadores antiguos y nuevos)
    if(window.XMLHttpRequest) {
      peticion = new XMLHttpRequest();
    }
    else {
      peticion = new ActiveXObject("Microsoft.XMLHTTP");
    }

    // Preparar función de respuesta
    peticion.onreadystatechange = muestraContenido;

    //damos el valor del tiempo actual
    tiempoInicial = new Date();

    //obtenemos el valor de la url del input.
    var recurso = document.getElementById('recurso').value;

    // Realizar petición
    peticion.open('GET', recurso, true);
    peticion.send(null);
  }

  // Función de respuesta
  function muestraContenido() {

    //primero se obtiene el tiempo en milisegundos real, restando el tiempo inicial de la respuesta, al tiempo final.
    var tiempoFinal = new Date();
    var milisegundos = tiempoFinal - tiempoInicial;

    //obtenemos el div donde se almacenarán los estados y le damos el valor del tiempo tardado y del estado que tiene en cada momento.
    //en este caso el estado de la petición devuelve un valor numérico el cual será el que está almacenado en nuestra variable de estados.
    var estados = document.getElementById('estados');
    estados.innerHTML += "[" + milisegundos + " mseg.] " + estadosPosibles[peticion.readyState] + "<br/>";

    //se comprueba primero que el servidor haya recibido alguna respuesta y en este caso, se comprueba que sea válida.
    if(peticion.readyState == 4) {
      if(peticion.status == 200) {

        //se obtiene el valor del div contenidos. se abre el recurso en este.
        var contenidos = document.getElementById('contenidos');
        contenidos.innerHTML = peticion.responseText.transformaCaracteresEspeciales();
      }
      //llamada a las funciones que mostrarán la cabecera y el código de estado.
      muestraCabeceras();
      muestraCodigoEstado();
    }
  }

  //mostrar cabecera, par ello se obtiene el div que contendrá el valor, y la petición llamará al método getAllResponseHeaders y después se escapan
  //los caracteres especiales.
  function muestraCabeceras() {
    var cabeceras = document.getElementById('cabeceras');
    cabeceras.innerHTML = peticion.getAllResponseHeaders().transformaCaracteresEspeciales();
  }

 //mostrar código de estado, igual que siempre, se obtiene el valor del div contenedor, y se muestra el estado de la peticion con la función status
 //y también se llama a la funcion statusText para mostrar el mensaje de estado.
  function muestraCodigoEstado() {
    var codigo = document.getElementById('codigo');
    codigo.innerHTML = peticion.status + "<br/>" + peticion.statusText;
  }