<?php
	include "connect.php";
	$conn = connect();
	if (!$conn) {
		die("Connection Failed" . mysqli_connect_error());
		exit;
	}
	mysqli_query($conn, "SET NAMES utf8");
	$sql = "UPDATE usr SET PKU = TRUE WHERE usr_id = '" . $_REQUEST['usr_id'] . "'";
	mysqli_query($conn, $sql);
?>