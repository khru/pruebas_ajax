/**
 * @author Emmanuel Valverde Ramos
 * @version 15 - 02 - 2016
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
	url = document.getElementById("recurso");
	textContent = document.getElementById('contenidos');
	state = document.getElementById('estados');
	responseHeader = document.getElementById('cabeceras');
	responseStatus = document.getElementById('codigo');

	// Mostramos en el recurso la URL
	url.value = window.location.href;

	// Llamamos al manejador de eventos que va ha gestionar
	// el inicio del resto de la aplicación
	document.getElementById('enviar').onclick = sendOnClick;

}// init()

// =========================================
// Manejador del evento
// =========================================
function sendOnClick(){
	// Llamamos por GET al recurso estipulado y le decimos
	// que la función que va ha llamar con los resultados
	// es displayContent
	sendRequest('GET', url.value, displayContent);
}// sendOnClick()

//--------------------------------------------------------------------------------
// =================================================
//  Método de obtención de un objeto XMLHTTPREQUEST
//  Este método varia dependiendo del navegador
// =================================================
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
		// muestra el estado inicial de la petición
		if(!request.onreadystatechange){
			// Estado de la petición
			requestState = "Petición no inicializada";
			// Se le concatena a el estado actual
			state.textContent+= requestState+"\n";
		}
		// Se le declara la función a llamar cuando hayan cambios
		request.onreadystatechange = funct;
		// Se llama a la URL con el método que se expecifica
	    request.open(method, url, true);
	    // no se le envia nada de vuelta a la función
	    request.send(null);
	}
}// sendRequest()

// ------------------------------------------------------------------------------

// ========================================
// Muestra el estado de la conexión
// ========================================

function displayContent() {
	// Distintos estados
	switch(request.readyState){
	    case 0: requestState = "Petición no inicializada"; break;
	    case 1: requestState = "Cargando petición... ×"; break;
	    case 2: requestState = "Petición cargada, enviando al servidor... ×";break;
	    case 3: requestState = "Recibiendo respuesta del servidor... ×"; break;
	    case 4: requestState = "Petición completada ✓\n________________\n"; break;
    }
    // Estado de la conexión(Obtenido mediante variable global) + Estado actual + Retorno
    state.textContent+= requestState+"\n";

    // Mostramos el estatus de la conexión
	responseStatus.innerHTML = request.status+": "+request.statusText;

	// Si se extablece la conexión
    if(request.readyState == READY_STATE_COMPLETE) {
    	// y la respuesta es OK
	    if(request.status == 200) {
	    	// Mostramos el contenido del texto
		    textContent.innerHTML=request.responseText;
	    } else {
	    	// No se han encontrados datos
	    	textContent.innerHTML="NO DATA";
	    }
	    // Mostramos los headers de la petición
		responseHeader.innerHTML=request.getAllResponseHeaders();
	}
}// displayContent()
