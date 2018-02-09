<?php
	include "connect.php";
	$conn = connect();
	if (!$conn) {
		die('error');
		exit;
	}
	$sql = "SELECT * FROM dyna ORDER BY dynamic_data ASC";
	mysqli_query($conn, "SET NAMES utf8");
	$rslt = mysqli_query($conn, $sql);
	if (!$rslt) {
		die("error");
		exit;
	}
?>