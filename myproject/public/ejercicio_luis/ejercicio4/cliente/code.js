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
	    	var xmlresponse = request.responseXML; 
	    	var disponibility = xmlresponse.getElementsByTagName("disponible")[0];
	    	if(disponibility.innerHTML == 'yes'){
	    		text = "<span style='color:green'>✓<span>";
	    	}else{
	    		text = "<p>El usuario no está disponible</p><p>Alternativas:</><ul>";
	    		var alternatives = xmlresponse.getElementsByTagName('nick');
	    		for(var i = 0; i<alternatives.length; i++){
	    			text += "<li style='cursor:pointer;margin-bottom:5px' id='" + i + "'>" + alternatives[i].innerHTML + "</li> ";
	    		}
	    		text += "</ul>";
	    	}
	    	//Display response
	    	nickChecked.innerHTML = text;

	    	links = nickChecked.getElementsByTagName("li");
	    	for(var s = 0; s<links.length; s++){
	    		var link = document.getElementById(s);
	    		link.addEventListener("click", function(){
	    			putOnClick(this.id);
	    		});
	    	}

	    } else {
	    	alert("Ha habido un error, inténtelo más tarde");
	    }
	}
}//checkNick

/* EVENT HANDLER FUNCTIONS */
//The onblur event function
function sendOnBlur(){
	sendRequest('GET', '../../ejercicio4/servidor/checkNick.php?nick='+login.value, checkNick);
}
//The onclick event function
function putOnClick(id){
	var link = document.getElementById(id);
	login.value = link.innerHTML;
	nickChecked.innerHTML = "<span style='color:green'>✓<span>";
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