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
		var_dump('error');die();
		echo "Error";
		die();
	}
}

//si existe el nick, entra, sino lanza error, se comprueba que no esté vacío el input, sino lanza error.
//entonces se abre la conexión, se almacena el valor que viene por post en una variable,
//se almacena la consulta buscando resultados con el valor de la variable.
//se ejecuta la consulta
//si devuelve resultados, retorna al fichero ajax un no(no está disponible el nick), si no devuelve nada retorna un si(nick disponible)


if(isset($_POST['nick'])){
	if(!empty($_POST['nick'])){

		$conexion =  abrir_conexion();
		$nick= $_POST['nick'];
		$sql ="SELECT nick FROM usuario WHERE nick='{$nick}'";
		$resultado= mysqli_query($conexion,$sql);
		$row= mysqli_fetch_row($resultado);
		if($row)
		{
   	 		echo $disponibilidad = 'no';
		} else {
   			echo $disponibilidad = 'si';
		}

	}else{

		echo $disponibilidad = "vacio";
	}


}else{

	echo $disponibilidad = "No existe dato a comprobar";
}


?>
