/* Autor: Luis Cavero Martínez */

/* CONSTANTS =============================*/

//Request state
var READY_STATE_UNINITIALIZED = 0;
var READY_STATE_LOADING = 1;
var READY_STATE_LOADED = 2;
var READY_STATE_INTERACTIVE = 3;
var READY_STATE_COMPLETE = 4;

/* AJAX UTILITIES ========================*/

//Obtains the request object
function getRequest() {
	if(window.XMLHttpRequest) {
		return new XMLHttpRequest();
	} else if(window.ActiveXObject) {
		return new ActiveXObject("Microsoft.XMLHTTP");
	} else {
		alert("Tu navegador no soporta AJAX"); 
	}
}//getRequest

//Send an AJAX request
function sendRequest(method, url, funct) {
	request = getRequest();
	if(request){
		//Display initial request state
		if(!request.onreadystatechange){
			requestState = "Petición no inicializada";
			state.textContent+= requestState+"\n";
		}
		request.onreadystatechange = funct;
	    request.open(method, url, true);
	    request.send(null);
	}
}//sendRequest

/* STATE-CHANGE FUNCTIONS ========================*/

//Display the server response in the page
function displayContent() {
	switch(request.readyState){
	    case 0: requestState = "Petición no inicializada"; break; //Not really ussefull
	    case 1: requestState = "Cargando petición... ×"; break;
	    case 2: requestState = "Petición cargada, enviando al servidor... ×";break;
	    case 3: requestState = "Recibiendo respuesta del servidor... ×"; break;
	    case 4: requestState = "Petición completada ✓\n________________\n"; break;
    }
    //Display request state
    state.textContent+= requestState+"\n";
    //Display response status
	responseStatus.innerHTML = request.status+": "+request.statusText;

    if(request.readyState == READY_STATE_COMPLETE) {
	    
	    if(request.status == 200) {
	    	//Display response content
		    textContent.innerHTML=request.responseText;
		    //Display response HTTP headers
		    responseHeader.innerHTML=request.getAllResponseHeaders();
	    } else {
	    	//Display response not found
	    	textContent.innerHTML="NO DATA";
	    	//Display response HTTP headers
		    responseHeader.innerHTML=request.getAllResponseHeaders();
	    }
	}
}//displayContent

/* EVENT HANDLER FUNCTIONS */
//The event function
function sendOnClick(){
	sendRequest('GET', url.value, displayContent);
}
/* INIT ========================*/

//The main function
function init() {
	//Display containers
	url = document.getElementById('recurso');
	textContent = document.getElementById('contenidos');
	state = document.getElementById('estados');
	responseHeader = document.getElementById('cabeceras');
	responseStatus = document.getElementById('codigo');
	
	//Initial url display
	url.value = window.location.href;
	
	//Event handlers
	document.getElementById('enviar').onclick = sendOnClick;

}//init

//All start here
window.onload = init;