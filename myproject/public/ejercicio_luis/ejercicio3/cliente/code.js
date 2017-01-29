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
		request.onreadystatechange = funct;
	    request.open(method, url, true);
	    request.send(null);
	}
}//sendRequest

/* STATE-CHANGE FUNCTIONS ========================*/

//Checks the nick availability
function checkNick() {
	if(request.readyState == READY_STATE_COMPLETE) {	    
	    if(request.status == 200) {
	    	var text = "";
	    	//Remove the previous response (if exists)
	    	if(nickChecked.innerHTML){
	    		nickChecked.innerHTML = text;
	    	}
	    	switch(request.responseText){
	    		//Server response with styles
	    		case "-1": text = "<span style='color:red; font-weight:bold'>No se ha recibido el nombre</span>"; break;
	    		case  "0": text = "<span style='color:green'>✓<span>"; break;
	    		case  "1": text = "<span style='color:red; font-weight:bold'>Ya existe un usuario con ese nombre</span>"; break;
	    		
	    	}
	    	//Display response
	    	nickChecked.innerHTML = text;
	    } else {
	    	alert("Ha habido un error, inténtelo más tarde");
	    }
	}
}//checkNick

/* EVENT HANDLER FUNCTIONS */
//The event function
function sendOnBlur(){
	sendRequest('GET', '../../ejercicio3/servidor/checkNick.php?nick='+login.value, checkNick);
}
/* INIT ========================*/

//The main function
function init() {
	//Display containers
	nickChecked = document.getElementById('checklogin');

	//Event handlers
	login = document.getElementById('login');
	login.onblur = sendOnBlur;

}//init

//All start here
window.onload = init;