<?php
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

if($_GET){
	if(isset($_GET['nick']) && !empty($_GET['nick'])){
		$ssql = "SELECT * from usuarios where nick = :nick";
		$query = $connection->prepare($ssql);
		$query->bindParam(':nick', $_GET['nick']);
		$query->execute();
		echo $query->rowCount(); // 0 or 1
	}else{
		echo "-1";
	}
}else {
	echo "-1";
}

