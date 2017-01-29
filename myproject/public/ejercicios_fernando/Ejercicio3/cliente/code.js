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
    //se prepara la función de respuesta
    //Almacena el nombre de la función que se ejecutará cuando el objeto XMLHttpRequest cambie de estado.
    peticion_http.onreadystatechange = muestraContenido;
    //petición al server con POST,śe le envía un parámetro al servidor, url solicitada
    peticion_http.open("POST", "http://192.168.33.44/ejercicios_fernando/Ejercicio3/servidor/compruebaDisponibilidad.php", true);
    //Permite establecer cabeceras personalizadas en la petición HTTP. Se debe invocar el método open() antes que setRequestHeader()
    peticion_http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    //Realiza la petición HTTP al servidor
    peticion_http.send("nick="+nick);
    //console.log("nick="+nick);
  }
}

function muestraContenido() {

  //status  :: El código de estado HTTP devuelto por el servidor (200 para una respuesta correcta, 404 para "No encontrado",
  // 500 para un error de servidor, etc.)

//comprueba en primer lugar que se ha recibido la respuesta del servidor (mediante el valor de la propiedad readyState).
//Si se ha recibido alguna respuesta, se comprueba que sea válida y correcta (comprobando si el código de estado HTTP devuelto es igual a 200).

   if(peticion_http.readyState == READY_STATE_COMPLETE) {
    if(peticion_http.status == 200) {
       //necesario obtener de nuevo el valor de nick, para darle el valor al objeto HTML para darle valor al objeto.
      var nick = document.getElementById("nick").value;
      //se va comprobando cual es el texto que devuelve con la propiedad responseText.
      if(peticion_http.responseText == "si") {

        document.getElementById("disponibilidad").innerHTML = "El nick : " + nick+ " está disponible";

      }
      if(peticion_http.responseText=="vacio"){
        document.getElementById("disponibilidad").innerHTML = "El nick : " + nick+ " está vacío";
     }
     if(peticion_http.responseText=="no"){

        document.getElementById("disponibilidad").innerHTML = "El nick : " + nick+ " NO está disponible";
     }

	}
   }
}


window.onload = function() {
  document.getElementById("comprobar").onclick = validar;
}