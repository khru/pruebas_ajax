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

  //si la variable a tomado valor..
  if(peticion_http) {
    //se prepara la función de respuesta   //Almacena el nombre de la función que se ejecutará cuando el objeto XMLHttpRequest cambie de estado.
    peticion_http.onreadystatechange = muestraContenido;
    //petición al server con POST,śe le envía un parámetro al servidor, url solicitada
    peticion_http.open("POST", "http://localhost:8080/dwes/AJAX/Ejercicio5/servidor/compruebaDisponibilidadJSON.php", true);
    //Permite establecer cabeceras personalizadas en la petición HTTP. Se debe invocar el método open() antes que setRequestHeader()
    peticion_http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");	
    //Realiza la petición HTTP al servidor
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

       //necesario obtener de nuevo el valor de nick, para darle valor al objeto.
      var nick = document.getElementById("nick").value;

      //se obtiene la respuesta del fichero JSON
      var respuestaJSON = peticion_http.responseText;

      //transformamos la cadena de texto en un objeto JSON y se añaden paréntesis al principio y final para evaluarla de forma correcta
      var respuesta = eval("("+respuestaJSON+")");

    
      //en caso de que sea "si", se obtiene el valor del div disponibilidad del formulario y se muestra mensaje diciendo que está disponible.
      if(respuesta.disponible == "si") {
        document.getElementById("disponibilidad").innerHTML = "El nick elegido ["+nick+"] está disponible";
      }
      //caso negativo, se muestra un mensaje diciendo que no hay disponibilidad. y las alternativas.
      else {
          var mensaje = "El nick ["+nick+"] no está disponible . <br> Te ofrecemos unas cuantas alternativas:";

          //se abre una lista desordenada "ul"
          mensaje += "<ul>";
          
          ////se crea un enlace dentro de un "li" por cada alternativa del JSON, que muestra el valor de cada alternativa del JSON y al darle onclick, se llama a la función cambiarValorInputNick, a la que se le pasa como parámetro el valor del enlace al que se ha pinchado como parámetro(que será el valor de una etiqueta nick del HTML) y la función cambia el value del input nick por éste
        for(var i in respuesta.alternativas) {

            mensaje += "<li><a href=\"#\" onclick=\"cambiarValorInputNick('"+respuesta.alternativas[i]+"'); return false\">"+respuesta.alternativas[i]+"<\/a><\/li>"; 
          
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