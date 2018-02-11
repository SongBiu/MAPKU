<?php
	include "connect.php";
	$conn = connect();
	if (!$conn) {
		die("Connection Failed" . mysqli_connect_error());
		exit;
	}
	mysqli_query($conn, "SET NAMES utf8");
	$sql = "UPDATE usr SET PKU = TRUE WHERE usrID = '" . $_REQUEST['usrID'] . "'";
	mysqli_query($conn, $sql);
?>