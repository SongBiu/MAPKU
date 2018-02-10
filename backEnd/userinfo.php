<?php
	include "connect.php";
	$conn = connect();
	if (!$conn) {
		die("Connection Failed" . mysqli_connect_error());
		exit;
	}
	mysqli_query($conn, "SET NAMES utf8");
	$sql = "SELECT score, community_id, countBag FROM usr WHERE usr_id = '5'";
	$rslt = mysqli_query($conn, $sql);
	$data = Array();
	while ($row = mysqli_fetch_assoc($rslt)) {
		$data['score'] = $row['score'];
		$data['countBag'] = $row['countBag'];
		$community_id = $row['community_id'];
		$sql = "SELECT name FROM community WHERE community_id = '" . $community_id . "'";
		$r = mysqli_query($conn, $sql);
		while ($row = mysqli_fetch_assoc($r)) {
			$data['community_name'] = $row['name'];
		}
	}
	print(json_encode($data));
	mysqli_close($conn);
?>