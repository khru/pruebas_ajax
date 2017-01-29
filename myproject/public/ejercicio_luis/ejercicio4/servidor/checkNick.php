<?php
//Check nick's disponibility
function checkNick($nick){
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

	$ssql = "SELECT * from usuarios where nick = :nick";
	$query = $connection->prepare($ssql);
	$query->bindParam(':nick', $nick);
	$query->execute();

	return $query->rowCount();
}
//Generate $amount alternative nicks bassed in a random pattern
function generateAlternative($amount, $nick){
	$patterns = [rand(), "123", date("Y"), "100", "abc", "aatrox"];
	if($amount > 6){
		$amount = 6;
	}
	for($i=0; $i<$amount; $i++){
		$checked = true;
		while($checked){
			$randomField = array_rand($patterns); 
			$newNick = $nick . $patterns[$randomField];
			$checked = checkNick($newNick);
			if($randomField != 0){
				unset($patterns[$randomField]);
			}
			$patterns[0] = rand();
		} ?>
		<nick><?= $newNick ?></nick>
	<?php }
}

if($_GET){
	if(isset($_GET['nick']) && !empty($_GET['nick'])){
		
		$checked = checkNick($_GET['nick']);
		//HTTP Header
		header('Content-Type: text/xml');
		
		if(!$checked){ ?>
			<respuesta>
				<disponible>yes</disponible>
			</respuesta>
		<?php } else { ?>
			<respuesta>
				<disponible>no</disponible>
				<alternativas>
					<?php generateAlternative(4, $_GET['nick']) ?>			
				</alternativas>
			</respuesta>
		<?php }
	}
}

