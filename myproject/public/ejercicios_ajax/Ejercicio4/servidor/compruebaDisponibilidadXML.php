<?php
	// Generar un número aleatorio
	srand((double)microtime()*1000000);
	$numeroAleatorio = rand(0, 10);
	// Simular un falso retardo por la red y el servidor (entre 0 y 3 segundos)
	sleep($numeroAleatorio % 3);
	header('Content-Type: text/xml');
	// El script devuelve alatoriamente 'si' o 'no' para que la aplicación
	// cliente pueda comprobar los dos casos
	if ($numeroAleatorio % 2 == 0){
		echo "<respuesta>".
       "<disponible>si</disponible>".
       "</respuesta>";
	} else {
		if (isset($_POST['nick'])) {
			$nick = $_POST['nick'];
			$nickAlternativos = array($nick."123", "123".$nick, $nick."abc","abc".$nick);
			echo "<respuesta>".
		       "<disponible>no</disponible>".
		       "<alternativas>".
		       "<nick>".$nickAlternativos[0]."</nick>".
		       "<nick>".$nickAlternativos[1]."</nick>".
		       "<nick>".$nickAlternativos[2]."</nick>".
		       "<nick>".$nickAlternativos[3]."</nick>".
		       "</alternativas>".
		       "</respuesta>";
		} else {
			$nickAlternativos = array("123", "abc","test");
			echo "<respuesta>".
		       "<disponible>no</disponible>".
		       "<alternativas>".
		       "<nick>".$nickAlternativos[0]."</nick>".
		       "<nick>".$nickAlternativos[1]."</nick>".
		       "<nick>".$nickAlternativos[2]."</nick>".
		       "</alternativas>".
		       "</respuesta>";
		}

	}

?>