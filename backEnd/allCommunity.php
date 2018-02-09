<?php
	include "connect.php";
	$conn = connect();
	if (!$conn) {
		die("Connection Failed" . mysqli_connect_error());
		exit;
	}
	mysqli_query($conn, "SET NAMES utf8");
	$sql = "SELECT * FROM community";
	$rslt = mysqli_query($conn, $sql);
	$data = Array();
	while ($row = mysqli_fetch_assoc($rslt)) {
		$id = $row['community_id'];
		$community = Array();
		$community['name'] = $row['name'];
		$community['des'] = $row['des'];
		$data[$id] = $community;
	}
	print(json_encode($data));
?>