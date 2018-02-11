<?php
	include "connect.php";
	$conn = connect();
	if (!$conn) {
		die("Connection Failed" . mysqli_connect_error());
		exit;
	}
	mysqli_query($conn, "SET NAMES utf8");
	$sql = "SELECT community_id FROM usr WHERE usr_id = '" . $_REQUEST["usrID"] . "'";
	$rslt = mysqli_query($conn, $sql);
	$row = mysqli_fetch_assoc($rslt);
	$communityID = $row['community_id'];
	$sql = "SELECT name, countBag FROM usr WHERE community_id = '" . $communityID . "' ORDER BY countBag DESC";
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