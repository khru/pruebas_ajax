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
	sendData = null;
	if(request){
		if(method == 'POST'){
			sendData = "provincia=" + provincias.options[provincias.selectedIndex].value;
		}

		request.onreadystatechange = funct;
	    request.open(method, url, true);
	    if(method == 'POST'){
	    	request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	    }
	    request.send(sendData);
	}
}//sendRequest

/* STATE-CHANGE FUNCTIONS ========================*/
function getProvincias() {
	if(request.readyState == READY_STATE_COMPLETE) {	    
	    if(request.status == 200) {
	 		var response = request.responseXML;
	 		var provinciasResponse = response.getElementsByTagName("provincia");
	 		for(var i = 0; i < provinciasResponse.length; i++){
	 			var option = document.createElement('option');
	 			option.value = provinciasResponse[i].getElementsByTagName('nombre')[0].innerHTML;
	 			option.innerHTML = provinciasResponse[i].getElementsByTagName('nombre')[0].innerHTML;
	 			option.innerHTML += " | <b>Code:</b> " + provinciasResponse[i].getElementsByTagName('codigo')[0].innerHTML;
	 			provincias.appendChild(option);
	 		}
	 	}
	 }
}//getProvincias

function getMunicipios() {
	if(request.readyState == READY_STATE_COMPLETE) {	    
	    if(request.status == 200) {
	 		var response = request.responseXML;
	 		var municipiosResponse = response.getElementsByTagName("municipio");
	 		
	 		while(municipios.hasChildNodes()){
	 			municipios.removeChild(municipios.firstChild);
	 		}
	 		for(var i = 0; i < municipiosResponse.length; i++){
	 			var option = document.createElement('option');
	 			option.value = municipiosResponse[i].getElementsByTagName('codigo')[0].innerHTML;
	 			option.innerHTML = municipiosResponse[i].getElementsByTagName('nombre')[0].innerHTML;
	 			option.innerHTML += " | <b>Code:</b> " + municipiosResponse[i].getElementsByTagName('codigo')[0].innerHTML;
	 			municipios.appendChild(option);
	 		}
	 	}
	 }
}//getMunicipios


/* EVENT HANDLER FUNCTIONS */
//The onblur event function
function sendOnChange(){
	sendRequest('POST', '../../ejercicio6/servidor/checkMunicipios.php', getMunicipios);
}//sendOnBlur


/* INIT ========================*/

//The main function
function init() {
	//Display containers
	provincias = document.getElementById('provincias');
	municipios = document.getElementById('municipios');

	//Event handler
	provincias.onchange = sendOnChange;

	//Charge first element
	sendRequest('GET', '../../ejercicio6/servidor/checkProvincias.php', getProvincias);

	

}//init

//All start here
window.onload = init;