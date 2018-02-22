<?php
	function connect() {
		$db_host = "localhost";
   	 	$db_usr = "root";
   	 	$db_passwd = "database";
		$db_name = "PUMA";
		return mysqli_connect($db_host, $db_usr, $db_passwd, $db_name);	
	}
?>