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
	operando1 = document.getElementById('operando1');
	operando2 = document.getElementById('operando2');
	resultado = document.getElementById('resultado');
	// obtenemos los botones de acciones
	suma 			= document.getElementById('suma');
	resta 			= document.getElementById('resta');
	multiplicacion	= document.getElementById('multiplicacion');
	division 		= document.getElementById('division');

	// accíones
	if (suma) {
		suma.onclick = sumar;
	}
	if (resta) {
		resta.onclick = restar;
	}
	if (multiplicacion) {
		multiplicacion.onclick = multiplicar;
	}
	if (division) {
		division.onclick = dividir;
	}

}// init()

function sumar(){
	op1 = parseInt(operando1.value);
	op2 = parseInt(operando2.value);
	res = op1 + op2;
	resultado.value = res;
}

function restar(){
	op1 = parseInt(operando1.value);
	op2 = parseInt(operando2.value);
	res = op1 - op2;
	resultado.value = res;
}

function multiplicar(){
	op1 = parseInt(operando1.value);
	op2 = parseInt(operando2.value);
	res = op1 * op2;
	resultado.value = res;
}
function dividir(){
	op1 = parseInt(operando1.value);
	op2 = parseInt(operando2.value);
	res = op1 / op2;
	resultado.value = res;
}