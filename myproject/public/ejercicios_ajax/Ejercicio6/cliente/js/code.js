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
	provincia     = document.getElementById("provincia");
	municipio     = document.getElementById("municipio");
	// Llamamos al manejador de eventos que va ha gestionar
	// el inicio del resto de la aplicación, si existe
	if (provincia) {
		sendOnLoad();
		provincia.onchange = function(){
			indice = provincia.options[provincia.selectedIndex].value;
			parametro = "provincia=" + indice;
			sendRequest('POST', '../servidor/cargaMunicipiosXML.php', cargarMunicipio, parametro)
		};
	}

}// init()

// =========================================
// Manejador del evento
// =========================================
function sendOnLoad(){
	var method = 'GET'
	var script = '../servidor/cargaProvinciasXML.php'
	sendRequest(method, script, cargarProvincia);
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
function sendRequest(method, url, funct, enviar) {
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
	    // AL ir por GET no necesito mandarle nada al método
	    if (!enviar) {
	    	request.send(null);
	    } else {
	    	request.send(enviar);
	    }

	}
}// sendRequest()

//--------------------------------------------------------------------------------

// ================================================
//  Método que muestra la salida de la petición
//  del servidor y la página web
// =================================================
function cargarProvincia(){
	// Si se establece la conexión
	if (request.readyState == READY_STATE_COMPLETE) {
		// y el estado de la conexión ha sido un OK
		if (request.status == 200) {
			//se obtiene el valor de la lista con id provincia del HTML
			//se obtiene el contenido del documento XML
			var documento_xml = request.responseXML;

			//se accede al elemento provincias
			var provincias = documento_xml.getElementsByTagName("provincias")[0];

			//se obtiene cada uno de los elementos provincia dentro de provincias
			var lasProvincias = provincias.getElementsByTagName("provincia");

			//a la lista se le crea una nueva opción en el valor 0, que pondrá "selecciona"
			provincia.options[0] = new Option("- selecciona -");

			//se recorren todas las provincias
			for(i = 0 ; i < lasProvincias.length; i++) {

				//se obtiene el valor de cada elemento código de cada provincia
				var codigo = lasProvincias[i].getElementsByTagName("codigo")[0].firstChild.nodeValue;

				//se obtiene el valor de cada elemento nombre de cada provincia
				var nombre = lasProvincias[i].getElementsByTagName("nombre")[0].firstChild.nodeValue;

				//se va sumando 1 al value del option y se va generando una nueva opción pasándole como parámetros el nombre y código de cada provincia
				//del documento XML
				provincia.options[i+1] = new Option(nombre, codigo);

			}
		}
	}
}// cargarProvincia()

function cargarMunicipio() {

	//si se ha recibido respuesta del servidor y es una respuesta válida
	if (request.readyState == 4) {
		if (request.status == 200) {

			//se obtiene del documento XML
			var documento_xml = request.responseXML;

			//se accede al elemento municipios del XML
			var municipios = documento_xml.getElementsByTagName("municipios")[0];
			//se almacenan todos los elemento municipio del XML(Todos los municipios)
			var losMunicipios = municipios.getElementsByTagName("municipio");

			// Borrar elementos anteriores
			municipio.options.length = 0;

			// se recorren todos los municipios
			for(i=0; i<losMunicipios.length; i++) {

				//se obtiene el valor de cada elemento código de cada municipio
				var codigo = losMunicipios[i].getElementsByTagName("codigo")[0].firstChild.nodeValue;

				//se obtiene el valor de cada elemento nombre de cada municipio
				var nombre = losMunicipios[i].getElementsByTagName("nombre")[0].firstChild.nodeValue;

				//se va sumando 1 al value del option y se va generando una nueva opción pasándole como parámetros el nombre y código de cada municipio
				//del documento XML
				municipio.options[i] = new Option(nombre, codigo);
			}
		}
	}

}// cargarMunicipio()