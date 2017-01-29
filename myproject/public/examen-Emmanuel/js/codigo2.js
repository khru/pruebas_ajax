// Inicializamos el método init
// cuando se cargue la ventana
window.onload = init;

/**
 * Método de iniciación de la aplicación
 */
function init(){
	// Obtenemos los campos sobre los que vamos a trabajar
	// como variables globales que se puedan acceder desde
	// cualquier método
	nombre		 	= document.getElementById('nombre');		/* Requerido */
	domicilio 		= document.getElementById('domicilio');
	ciudad 			= document.getElementById('ciudad');
	postal 			= document.getElementById('postal');		/* Requerido */
	provincia 		= document.getElementById('provincia');
	telefono 		= document.getElementById('telefono');		/* Requerido */
	email 			= document.getElementById('email');			/* Requerido */
	comentarios 	= document.getElementById('comentario');	/* Requerido */
	// obtenemos los campos de error - SIN SELECT
	error_nombre	= document.getElementById('error_nombre');
	error_domicilio	= document.getElementById('error_domicilio');
	error_ciudad	= document.getElementById('error_ciudad');
	error_postal	= document.getElementById('error_postal');
	error_provincia	= document.getElementById('error_provincia');
	error_telefono	= document.getElementById('error_telefono');
	error_email		= document.getElementById('error_email');
	error_comentarios= document.getElementById('error_comentario');
	error_formulario= document.getElementById('error_formulario');

	formulario 		= document.getElementById('formulario');

	// accíones para campos requeridos
	if (nombre) {
		nombre.onblur = validarNombre;
	}

	if (postal) {
		postal.onblur = validarPostal;
	}

	if (telefono) {
		telefono.onblur = validarTelefono;
	}

	if (email) {
		email.onblur = validarEmail;
	}
	if (comentarios) {
		comentarios.onblur = validarComentario;
	}
	// campos no requeridos pero que si existen
	// se han de validar

	if (domicilio) {
		domicilio.onchange = validarDomicilio;
	}

	if (ciudad) {
		ciudad.onchange = validarCiudad;
	}

	if (provincia) {
		provincia.onchange = validarProvincia;
	}

	if (formulario) {
		formulario.onsubmit = validarTodo;
	}

}// init()

function validarNombre(){
	nomb = nombre.value;
	var regx = /^[a-záéíóúàèìòùçäëïöüñ  -]{3,30}$/i;
	if (nomb.length < 3) {
		error_nombre.setAttribute('class', 'error');
		error_nombre.innerHTML = "La longitud del nombre es demasido corta";
		nombre.setAttribute('class', 'error');
		return false;
	} else if(nomb.length > 100){
		// manera de evitar errores en la consola
		error_nombre.setAttribute('class', 'error');
		error_nombre.innerHTML = "La longitud del nombre es demasido larga";
		nombre.setAttribute('class', 'error');
		return false;
	}else if (!nomb.match(regx)){
		error_nombre.setAttribute('class', 'error');
		error_nombre.innerHTML = "El campo nombre solo puede contener: letras y espacios";
		nombre.setAttribute('class', 'error');
		return false;
	} else {
		nombre.setAttribute('class', 'valido');
		error_nombre.setAttribute('class', 'error oculto');
		return true;
	}
}// validarNombre()
function validarComentario(){
	var com = comentarios.value;
	if (com.length < 6) {
		error_comentarios.setAttribute('class', 'error');
		error_comentarios.innerHTML = "La longitud de los comentarios es demasido corta";
		comentarios.setAttribute('class', 'error');
		return false;
	} else if(com.length > 50){
		error_comentarios.setAttribute('class', 'error');
		error_comentarios.innerHTML = "La longitud del comentarios es demasido larga";
		comentarios.setAttribute('class', 'error');
		return false;

	} else {
		comentarios.setAttribute('class', 'valido');
		error_comentarios.setAttribute('class', 'error oculto');
		return true;
	}
}

function validarPostal(){
	var pos = postal.value;
	var regx = '/^[0-9]{5}$/';
	if (pos.length != 5) {
		error_postal.setAttribute('class', 'error');
		error_postal.innerHTML = "La longitud del código postal no es la adecuada";
		postal.setAttribute('class', 'error');
		return false;
	} else if(pos.match(regx)){
		error_postal.setAttribute('class', 'error');
		error_postal.innerHTML = "El código postal no cumple el formato";
		postal.setAttribute('class', 'error');
		return false;

	} else {
		postal.setAttribute('class', 'valido');
		error_postal.setAttribute('class', 'error oculto');
		return true;
	}
}

function validarTelefono(){
	var tel = telefono.value;
	var regx =  '/^([0-9]+){9}$/i';
	if(tel.length != 9){
		error_telefono.setAttribute('class', 'error');
		error_telefono.innerHTML = "El teléfono no cumple el formato";
		telefono.setAttribute('class', 'error');
		return false;

	} else if(tel.match(regx)){
		error_telefono.setAttribute('class', 'error');
		error_telefono.innerHTML = "El teléfono no cumple el formato";
		telefono.setAttribute('class', 'error');
		return false;

	} else {
		telefono.setAttribute('class', 'valido');
		error_telefono.setAttribute('class', 'error oculto');
		return true;
	}
	return true;
}

function validarEmail(){
	var regx = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/i;
	var em = email.value;
	if (em.length < 6) {
		// manera de evitar errores en la consola
		error_email.setAttribute('class', 'error');
		error_email.innerHTML = "La longitud del email es demasido corta";
		email.setAttribute('class', 'error');
		return false;
	} else if(em.length > 100){
		// manera de evitar errores en la consola
		error_email.setAttribute('class', 'error');
		error_email.innerHTML = "La longitud del email es demasido larga";
		email.setAttribute('class', 'error');
		return false;

	}else if (!em.match(regx)){
		error_email.setAttribute('class', 'error');
		error_email.innerHTML = "El campo email no cumple el formato";
		email.setAttribute('class', 'error');
		return false;
	} else {
		email.setAttribute('class', 'valido');
		error_email.setAttribute('class', 'error oculto');
		return true;
	}
}

function validarDomicilio(){
	var dom = domicilio.value;
	var regx = /^[a-záéíóúàèìòùçäëïöüñ 0-9]{3,50}$/i;
	if (dom) {
		if (!dom.match(regx)){
			error_domicilio.setAttribute('class', 'error');
			error_domicilio.innerHTML = "El campo domicilio no cumple el formato";
			domicilio.setAttribute('class', 'error');
			return false;
		} else {
			domicilio.setAttribute('class', 'valido');
			error_domicilio.setAttribute('class', 'error oculto');
			return true;
		}
	}
	return true;
}

function validarCiudad(){
	var ciu = ciudad.value;
	var regx = /^[a-záéíóúàèìòùçäëïöüñ ]{3,30}$/i;
	if (ciu) {
		if (ciu.length < 3) {
			// manera de evitar errores en la consola
			error_ciudad.setAttribute('class', 'error');
			error_ciudad.innerHTML = "El campo ciudad es demasido corto";
			ciudad.setAttribute('class', 'error');
			return false;
		} else if(ciu.length > 20){
			// manera de evitar errores en la consola
			error_ciudad.setAttribute('class', 'error');
			error_ciudad.innerHTML = "El campo ciudad es demasido largo";
			ciudad.setAttribute('class', 'error');
			return false;

		}else if (!ciu.match(regx)){
			error_ciudad.setAttribute('class', 'error');
			error_ciudad.innerHTML = "El campo ciudad no cumple el formato";
			ciudad.setAttribute('class', 'error');
			return false;
		} else {
			ciudad.setAttribute('class', 'valido');
			error_ciudad.setAttribute('class', 'error oculto');
			return true;
		}
	}
	return true;
}

function validarProvincia(){
	var pro = provincia.value;
	var regx = /^[a-záéíóúàèìòùçäëïöüñ ]{3,30}$/i;
	if (pro) {
		if (pro.length < 3) {
			// manera de evitar errores en la consola
			error_provincia.setAttribute('class', 'error');
			error_provincia.innerHTML = "El campo provincia es demasido corto";
			provincia.setAttribute('class', 'error');
			return false;
		} else if(pro.length > 20){
			// manera de evitar errores en la consola
			error_provincia.setAttribute('class', 'error');
			error_provincia.innerHTML = "El campo provincia es demasido largo";
			provincia.setAttribute('class', 'error');
			return false;

		}else if (!pro.match(regx)){
			error_provincia.setAttribute('class', 'error');
			error_provincia.innerHTML = "El campo provincia no cumple el formato";
			provincia.setAttribute('class', 'error');
			return false;
		} else {
			provincia.setAttribute('class', 'valido');
			error_ciudad.setAttribute('class', 'error oculto');
			return true;
		}
	}
	return true;
}

function validarTodo(){
	var estado = true;

	if (!validarNombre()) {
		estado = false;
	}
	if (!validarComentario()) {
		estado = false;
	}
	if (!validarPostal()) {
		estado = false;
	}
	if (!validarTelefono()) {
		estado = false;
	}
	if (!validarEmail()) {
		estado = false;
	}
	if (!validarDomicilio()) {
		estado = false;
	}
	if (!validarCiudad()) {
		estado = false;
	}
	if (!validarProvincia()) {
		estado = false;
	}

	if (estado == false) {
		if (error_formulario && formulario) {
			error_formulario.setAttribute('class', 'error');
			error_formulario.innerHTML = "No se ha enviado el formulario, debido a errores en el formulario";
			formulario.setAttribute('class', 'error');
		}
		return false;
	}
	return true;
}