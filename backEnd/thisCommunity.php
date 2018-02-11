<?php
	include "connect.php";
	$conn = connect();
	if (!$conn) {
		die("Connection Failed" . mysqli_connect_error());
		exit;
	}
	mysqli_query($conn, "SET NAMES utf8");
	$sql = "SELECT communityID FROM usr WHERE usrID = '" . $_REQUEST["usrID"] . "'";
	$rslt = mysqli_query($conn, $sql);
	$row = mysqli_fetch_assoc($rslt);
	$communityID = $row['communityID'];
	$sql = "SELECT name, countBag FROM usr WHERE communityID = '" . $communityID . "' ORDER BY countBag DESC";
	$rslt = mysqli_query($conn, $sql);
	$data = Array();
	$index = 0;
	while ($row = mysqli_fetch_assoc($rslt)) {
		$usr = Array();
		$usr['countBag'] = $row['countBag'];
		$usr['name'] = $row['name'];
		$data[$index++] = $usr;
	}
	print(json_encode($data));
?>