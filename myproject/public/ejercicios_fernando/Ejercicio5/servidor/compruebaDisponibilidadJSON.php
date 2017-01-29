<?php
function abrir_conexion(){

	$user = "root";
	$pass = "123";
	$host = "localhost";
	$db =  "ajaxusuario";

	$conexion = mysqli_connect($host,$user,$pass,$db);
	if($conexion){

		mysqli_set_charset($conexion,"UTF-8");
		return $conexion;
	}else{

		echo "ERrror";
		die();
	}
}

//si existe el nick, entra, sino lanza error, se comprueba que no esté vacío el input, sino lanza error.
//entonces se abre la conexión, se almacena el valor que viene por post en una variable,
//se almacena la consulta buscando resultados con el valor de la variable.
//se ejecuta la consulta
//si devuelve resultados, retorna al fichero ajax un no(no está disponible el nick), si no devuelve nada retorna un si(nick disponible)

$disponible= "";
if(isset($_POST['nick'])){

	if(!empty($_POST['nick'])){

		$conexion =  abrir_conexion();
		$nick= $_POST['nick'];
		$sql ="SELECT nick FROM usuario WHERE nick='{$nick}'";
		$resultado= mysqli_query($conexion,$sql);
		$row= mysqli_fetch_row($resultado);
		if($row)
		{
   	 		$disponibilidad = "no";
		} else {
   			$disponibilidad = "si";
		}

	}else{

		$disponibilidad = "vacio";
	}


}else{

	$disponibilidad = "vacio";
}

/* NO FUNCIONA
if($disponibilidad == "vacio") {
  echo "<respuesta>".
       "<disponible>vacio</disponible>".
       "</respuesta>";

}*/

// En caso de no estar disponible, éstos son los nicks alternativos.
if($disponibilidad == "no") {

  $nickAlternativos = array($nick."123", "123".$nick, $nick."abc","abc".$nick);

}

// Necesario para que el navegador trate la respuesta como XML
header('Content-Type: text/xml');


// Se generan los contenidos xml de respuestas.
// en caso de que esté disponible, el json contiene un elemento padre "respuesta" y elemento hijo "disponible"
if($disponibilidad == "si") {
  echo "{ ".
		" disponible: \"si\" ".
		"}";
}
else {
 echo "{ ".
		" disponible: \"no\", ".
		" alternativas: [ \"$nickAlternativos[0]\" , \"$nickAlternativos[1]\" , \"$nickAlternativos[2]\" , \"$nickAlternativos[3]\" ]".
		"}";
}

?>
