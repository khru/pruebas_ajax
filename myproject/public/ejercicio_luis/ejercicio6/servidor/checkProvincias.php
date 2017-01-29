<?php
//Check nick's disponibility
function getProvincias(){
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

	$ssql = "SELECT * from provincias";
	$query = $connection->prepare($ssql);
	$query->execute();

	return $query->fetchAll();
}

//HTTP Header
header('Content-Type: text/xml'); ?>
<provincias>
<?php $provincias = getProvincias();
foreach ($provincias as $provincia) { ?>
	<provincia>
    	<codigo><?= $provincia["codigo"] ?></codigo>
    	<nombre><?= $provincia["nombre"] ?></nombre>
  	</provincia>
<?php } ?>
</provincias>