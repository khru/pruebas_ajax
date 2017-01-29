/**
 * @author Emmanuel Valverde Ramos
 * @version 16 - 02 - 2016
 */
// ----------------------------------------------------------------------------------------
// ===================================
// Variables globales de clase
// ===================================
	var READY_STATE_UNINITIALIZED = 0;
	var READY_STATE_LOADING = 1;
	var READY_STATE_LOADED = 2;
	var READY_STATE_INTERACTIVE = 3;
	var READY_STATE_COMPLETE = 4;

//--------------------------------------------------------------------------------

// ================================================
// Métodos de inicio
// ================================================
// Llamado al método de inicialización
// del script al cargar la página
window.onload = init;

// Función que gestiona toda la lógica del script
function init() {
	// Obtenemos todos los contenedores de forma global
	nick          	= document.getElementById("nick");
	disponibilidad  = document.getElementById('disponibilidad');
	comprobar    	= document.getElementById('comprobar');

	// Llamamos al manejador de eventos que va ha gestionar
	// el inicio del resto de la aplicación, si existe
	if (nick) {
		// Cuando el usuario escriba el nombre del usuario
		// y el campo pierda el foco
		// llamamos a la función sendBlur
		comprobar.onclick = sendOnClick;
	}

}// init()

// =========================================
// Manejador del evento
// =========================================
function sendOnClick(){
	var method = 'POST'
	var script = '../servidor/compruebaDisponibilidadJSON.php'
	sendRequest(method, script, comprobarNick);
}// sendOnClick()

//--------------------------------------------------------------------------------

// =================================================
//  Método de obtención de un objeto XMLHTTPREQUEST
//  Este método varia dependiendo del navegador
// =================================================
/**
 * Método de obtención del objetos XMLHTTPREQUEST
 * @return {Object} Obtención del objeto XMLHTTPREQUEST
 */
function getRequest() {
	if(window.XMLHttpRequest) {
		return new XMLHttpRequest();
	} else if(window.ActiveXObject) {
		return new ActiveXObject("Microsoft.XMLHTTP");
	} else {
		alert("Tu navegador no soporta AJAX");
	}
}// getRequest()

// ================================================
//  Método de negocio entre el lenguaje del lado
//  del servidor y la página web
// =================================================
/**
 * Método que realiza la negociación entre el lenguaje de programación
 * del lado del servidor y del FRONT-END
 * @param  {String} method POST o GET
 * @param  {String} url    URL donde se encuentra el script del servidor
 * @param  {String} funct  Nombre de la función que ejecutar tras recivir el resultado
 *                         del script del servidor
 */
function sendRequest(method, url, funct) {
	// Llamada a la obtención del XMLHTTPREQUEST
	request = getRequest();
	// Si existe el objeto
	if(request){
		// Se le declara la función a llamar cuando hayan cambios
		request.onreadystatechange = funct;
		// Se llama a la URL con el método que se expecifica
	    //request.open(POST, url, true);
	    request.open(method, url, true);
	    // Content-type
	    //Permite establecer cabeceras personalizadas en la petición HTTP.
	    //Se debe invocar el método open() antes que setRequestHeader()
    	request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	    // no se le envia nada de vuelta a la función
	    // IMPORTANTISIMO NO PONER ESPACIOS AL PASAR LAS VARIABLES
	    request.send('nick='+nick.value);
	}
}// sendRequest()

//--------------------------------------------------------------------------------

// ================================================
//  Método que muestra la salida de la petición
//  del servidor y la página web
// =================================================
function comprobarNick(){
	// Si se establece la conexión
	if (request.readyState == READY_STATE_COMPLETE) {
		// y el estado de la conexión ha sido un OK
		if (request.status == 200) {
			//se obtiene la respuesta del fichero JSON
		    var respuestaJSON = request.responseText;

		    //transformamos la cadena de texto en un objeto JSON
		    //y se añaden paréntesis al principio y final para evaluarla de forma correcta
		    var respuesta = eval("("+respuestaJSON+")");
			if (respuesta.disponible == 'si') {
				// devolvemos un mensaje positivo
				disponibilidad.setAttribute('style', 'color: green');
				disponibilidad.innerHTML = '<p>El nick: ' + nick.value + ', esta disponible</p>';
			} else {
				// devolvemos un mensaje de error
				disponibilidad.setAttribute('style', 'color: red');
				mensaje =  '<p>El nick: ' + nick.value + ', no esta disponible</p>';

				mensaje += '<ul>';
				// recordamos los nombres y los mostramos
				for (var i in respuesta.alternativas) {
					mensaje += "<li><a href=\"#\" onclick=\"cambiarNick('"+ respuesta.alternativas[i] +"'); return false\">" + respuesta.alternativas[i] + "<\/a><\/li>";
				}
				mensaje += '<\/ul>';
				disponibilidad.innerHTML = mensaje;
			}
		}
	}
}// comprobarNick()

function cambiarNick(nombre){
	nick.value = nombre;
}