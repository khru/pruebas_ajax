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
	login          = document.getElementById("login");
	password       = document.getElementById('password');
	checkLogin     = document.getElementById('checklogin');
	disponibilidad = document.getElementById('disponibilidad');

	// Llamamos al manejador de eventos que va ha gestionar
	// el inicio del resto de la aplicación, si existe
	if (login) {
		// Cuando el usuario escriba el nombre del usuario
		// y el campo pierda el foco
		// llamamos a la función sendBlur
		login.onblur = sendOnBlur;
	}

}// init()

// =========================================
// Manejador del evento
// =========================================
function sendOnBlur(){
	var method = 'GET'
	var script = '../servidor/compruebaDisponibilidad.php'
	sendRequest(method, script, comprobarNick);
}// sendOnBlur()

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
	    request.open(method, url, true);
	    // no se le envia nada de vuelta a la función
	    request.send(null);
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

			// comprobamos que existe el campo
			if (checkLogin) {
				// dependiendo de la respuesta del servidor
				// pasada a texto
				switch(request.responseText) {
					case 'si': // si la respuesta es si
						checklogin.setAttribute('style', 'color:green')
						checkLogin.innerHTML = 'El usuario si existe ' + login.value
						break;
					case 'no': // si la respuesta es no
						checklogin.setAttribute('style', 'color:red')
						checkLogin.innerHTML = 'El usuario no existe'
						break;
				}

			}

		}
	}
}// comprobarNick()