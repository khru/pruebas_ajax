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



function muestraProvincias() {
  if (peticion.readyState == READY_STATE_COMPLETE) {
    if (peticion.status == 200) {

      //se obtiene el valor de la lista con id provincia del HTML
      var lista = document.getElementById("provincia");

      //se obtiene el contenido del documento XML
      var documento_xml = peticion.responseXML;

      //se accede al elemento provincias
      var provincias = documento_xml.getElementsByTagName("provincias")[0];

      //se obtiene cada uno de los elementos provincia dentro de provincias
      var lasProvincias = provincias.getElementsByTagName("provincia");

      //a la lista se le crea una nueva opción en el valor 0, que pondrá "selecciona"
      lista.options[0] = new Option("- selecciona -");

      //se recorren todas las provincias
      for(i=0; i<lasProvincias.length; i++) {

        //se obtiene el valor de cada elemento código de cada provincia
        var codigo = lasProvincias[i].getElementsByTagName("codigo")[0].firstChild.nodeValue;

        //se obtiene el valor de cada elemento nombre de cada provincia
        var nombre = lasProvincias[i].getElementsByTagName("nombre")[0].firstChild.nodeValue;

        //se va sumando 1 al value del option y se va generando una nueva opción pasándole como parámetros el nombre y código de cada provincia
        //del documento XML
        lista.options[i+1] = new Option(nombre, codigo);
      }
    }
  }
}


function cargaMunicipios() {
  //obtenemos el valor de la lista con id provincia del HTML
  var lista = document.getElementById("provincia");

  //almacenamos en una variable el valor del option de la provincia seleccionada, para después obtener los municipios relaciones con esa provincia.
  var provincia = lista.options[lista.selectedIndex].value;

  //si es un número el valor del índice devuelto se envía la petición, si se lleva a cabo la petición,
  if(!isNaN(provincia)) {
    peticion = inicializa_xhr();

    //si la variable ha tomado valor..
    if (peticion) {

      //se prepara la función de respuesta   //Almacena el nombre de la función que se ejecutará cuando el objeto XMLHttpRequest cambie de estado.
      peticion.onreadystatechange = muestraMunicipios;

      //petición al server con POST,śe le envía un parámetro al servidor, url solicitada
      peticion.open("POST", "../servidor/cargaMunicipiosXML.php", true);

       //Permite establecer cabeceras personalizadas en la petición HTTP. Se debe invocar el método open() antes que setRequestHeader()
      peticion.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

      //Realiza la petición HTTP al servidor pasándole el valor de provincia, que nos servirá para mostrar todos los municipios relacionados con ese
      //número de provincia
      peticion.send("provincia=" + provincia);
    }
  }
}

function muestraMunicipios() {

  //si se ha recibido respuesta del servidor y es una respuesta válida
  if (peticion.readyState == 4) {
    if (peticion.status == 200) {

      //se obtiene el valor del select con id municipio del HTML
      var lista = document.getElementById("municipio");

      //se obtiene del documento XML
      var documento_xml = peticion.responseXML;

      //se accede al elemento municipios del XML
      var municipios = documento_xml.getElementsByTagName("municipios")[0];

      //se almacenan todos los elemento municipio del XML(Todos los municipios)
      var losMunicipios = municipios.getElementsByTagName("municipio");

      // Borrar elementos anteriores
      lista.options.length = 0;

      // se recorren todos los municipios
      for(i=0; i<losMunicipios.length; i++) {

        //se obtiene el valor de cada elemento código de cada municipio
        var codigo = losMunicipios[i].getElementsByTagName("codigo")[0].firstChild.nodeValue;

        //se obtiene el valor de cada elemento nombre de cada municipio
        var nombre = losMunicipios[i].getElementsByTagName("nombre")[0].firstChild.nodeValue;

        //se va sumando 1 al value del option y se va generando una nueva opción pasándole como parámetros el nombre y código de cada municipio
        //del documento XML
        lista.options[i] = new Option(nombre, codigo);
      }
    }
  }
}

//onload se comprueba si se ha llevado a cabo la petición, en tal caso se llama a la función muestraProvincias y se hace la petición al server
//al fichero de cargaProvincias
window.onload = function() {
  peticion = inicializa_xhr();
  if(peticion) {
    peticion.onreadystatechange = muestraProvincias;
    peticion.open("GET", "../servidor/cargaProvinciasXML.php", true);
    peticion.send(null);
  }

  //cada vez que hay un cambio en el select de provincias del HTML, se vuelve a llamar a la función de cargar municipios
  document.getElementById("provincia").onchange = cargaMunicipios;
}
