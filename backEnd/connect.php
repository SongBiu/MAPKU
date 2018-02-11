<?php
	function connect() {
		$dbHost = "localhost";
   	 	$dbUsr = "root";
   	 	$dbPasswd = "database";
		$dbName = "PUMA";
		return mysqli_connect($dbHost, $dbUsr, $dbPasswd, $dbName);	
	}
?>