<?php
//Check nick's disponibility
function getMunicipios($provincia){
	//Connection parameters
	$dsn = 'mysql:dbname=mybd;host=127.0.0.1';
	$user = 'root';
	$passwd = '123';

	//Get the Database connection
	try {
	    $connection = new PDO($dsn, $user, $passwd);
	} catch (PDOException $e) {
		exit('La base de datos no se encuentra accesible: ' . $e->getMessage()); 
	}

	$ssql = "SELECT nombre, codigo from municipios where provincia = (SELECT id_provincias FROM provincias WHERE nombre = :provincia)";
	$query = $connection->prepare($ssql);
	$query->bindParam(':provincia', $provincia);
	$query->execute();

	return $query->fetchAll();
}

//HTTP Header
header('Content-Type: text/xml');?>

<municipios>
<?php $municipios = getMunicipios($_POST["provincia"]);
foreach ($municipios as $municipio) { ?>
	<municipio>
    	<codigo><?= $municipio["codigo"] ?></codigo>
    	<nombre><?= $municipio["nombre"] ?></nombre>
  	</municipio>
<?php } ?>
</municipios>