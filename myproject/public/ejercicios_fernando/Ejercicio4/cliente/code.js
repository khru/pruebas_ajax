var READY_STATE_UNINITIALIZED = 0;
var READY_STATE_LOADING = 1;
var READY_STATE_LOADED = 2;
var READY_STATE_INTERACTIVE = 3;
var READY_STATE_COMPLETE = 4;
var peticion_http = null;
 

 // encapsular la creación del objeto XMLHttpRequest. Navegadores obsoletos
function inicializa_xhr() {
  if(window.XMLHttpRequest) {
    return new XMLHttpRequest(); 
  }
  else if(window.ActiveXObject) {
    return new ActiveXObject("Microsoft.XMLHTTP");
  } 
}

 
 //validar.
function validar() {

  //obtenemos el valor del input.
  var nick = document.getElementById("nick").value;
  //igualamamos nuestra variable al resultado de la función anterior que nos devolverá el objeto XMLHttpRequest
  peticion_http = inicializa_xhr();

  //si la variable ha tomado valor..
  if(peticion_http) {

    //se prepara la función de respuesta   //Almacena el nombre de la función que se ejecutará cuando el objeto XMLHttpRequest cambie de estado.
    peticion_http.onreadystatechange = muestraContenido;

    //petición al server con POST,śe le envía un parámetro al servidor, url solicitada
    peticion_http.open("POST", "http://localhost:8080/dwes/AJAX/Ejercicio4/servidor/compruebaDisponibilidadXML.php", true);

    //Permite establecer cabeceras personalizadas en la petición HTTP. Se debe invocar el método open() antes que setRequestHeader()
    peticion_http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");	

    //Realiza la petición HTTP al servidor pasándole el valor de nick
    peticion_http.send("nick="+nick);
  }
}
 
function muestraContenido() {

  //status  :: El código de estado HTTP devuelto por el servidor (200 para una respuesta correcta, 404 para "No encontrado",
  // 500 para un error de servidor, etc.)

//comprueba en primer lugar que se ha recibido la respuesta del servidor (mediante el valor de la propiedad readyState).
//Si se ha recibido alguna respuesta, se comprueba que sea válida y correcta (comprobando si el código de estado HTTP devuelto es igual a 200). 

   if(peticion_http.readyState == READY_STATE_COMPLETE) {
    if(peticion_http.status == 200) {

       //necesario obtener de nuevo el valor de nick, para darle el valor al objeto.
      var nick = document.getElementById("nick").value;

      //se obtiene el documento xml
      var documento_xml = peticion_http.responseXML;

      //se busca la raiz del documento, "respuesta".
      var raiz = documento_xml.getElementsByTagName("respuesta")[0];
      
      //dentro de "respuesta", se busca el valor del primer elemento "disponible", en este caso es "si"
      var disponible = raiz.getElementsByTagName("disponible")[0].firstChild.nodeValue;

       /*NO FUNCIONA
      if(disponible == "vacio") {
        document.getElementById("disponibilidad").innerHTML = "El nick está vacío";

      }*/
    
      //en caso de que sea "si", se obtiene el valor del div disponibilidad del formulario y se muestra mensaje diciendo que está disponible.
      if(disponible == "si") {
        document.getElementById("disponibilidad").innerHTML = "El nick elegido ["+nick+"] está disponible";
      }
      //caso negativo, se muestra un mensaje diciendo que no hay disponibilidad  y las alternativas
      else {
          var mensaje = "El nick ["+nick+"] no está disponible . <br> Te ofrecemos unas cuantas alternativas:";

          //accedemos al XML y obtenemos las alternativas.
          var alternativas = raiz.getElementsByTagName("alternativas")[0];

          //dentro del elemento alternativas, se obtiene el valor del elemento nick
          var nicks = alternativas.getElementsByTagName("nick");

          //se abre una lista desordenada "ul"
          mensaje += "<ul>";

          //se recorren todas las etiquetas nicks(XML)
          for(var i=0; i<nicks.length; i++) {

            //se crea un enlace dentro de un "li" por cada etiqueta nick del XML que muestra el valor de cada etiqueta "nick" del XML y al darle onclick, se llama a la función cambiarValorInputNick, a la que se le pasa como parámetro el valor del enlace al que se ha pinchado como parámetro(que será el valor de una etiqueta nick del HTML) y la función cambia el value del input nick por éste
            mensaje += "<li><a href=\"#\" onclick=\"cambiarValorInputNick('"+nicks[i].firstChild.nodeValue+"'); return false\">"+nicks[i].firstChild.nodeValue+"<\/a><\/li>";  
          }
          //cierre etiqueta "ul"
          mensaje += "<\/ul>";
          //se imprime todo
          document.getElementById("disponibilidad").innerHTML = mensaje;
      
      }
	  }
  }	
}

//obtiene el input con id nick y le cambia el valor por el que llega a la función una vez se ha dado onclick.
function cambiarValorInputNick(nick) {
  var cuadroLogin = document.getElementById("nick");
  cuadroLogin.value = nick;
}

window.onload = function() {
  document.getElementById("comprobar").onclick = validar;
}