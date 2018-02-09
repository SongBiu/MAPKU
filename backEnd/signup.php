<?php
	include "connect.php";
	$conn = connect();
	if (!$conn) {
		die("Connection Failed" . mysqli_connect_error());
		exit;
	}
	mysqli_query($conn, "SET NAMES utf8");
	// echo $_REQUEST['openid'];
	$sql = "INSERT INTO usr(usr_id) VALUES ('" . $_REQUEST["openid"] . "')";
	echo $sql;
	$rslt = mysqli_query($conn, $sql);
	if (!$rslt) {
		die("error");
	}
	// echo "OK";
	mysqli_close($conn);
?>