<?php
	include "connect.php";
	$conn = connect();
	if (!$conn) {
		die("Connection Failed" . mysqli_connect_error());
		exit;
	}
	mysqli_query($conn, "SET NAMES utf8");
	$sql = "SELECT score, communityID, countBag, PKU FROM usr WHERE usrID = '". $_REQUEST['usrID'] ."'";
	$rslt = mysqli_query($conn, $sql);
	$data = Array();
	while ($row = mysqli_fetch_assoc($rslt)) {
		$data['score'] = $row['score'];
		$data['countBag'] = $row['countBag'];
		$data['PKU'] = $row['PKU'];
		$communityID = $row['communityID'];
		$sql = "SELECT name FROM community WHERE communityID = '" . $communityID . "'";
		$r = mysqli_query($conn, $sql);
		while ($row = mysqli_fetch_assoc($r)) {
			$data['community_name'] = $row['name'];
		}
	}
	print(json_encode($data));
	mysqli_close($conn);
?>