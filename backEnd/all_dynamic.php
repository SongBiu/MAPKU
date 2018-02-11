<?php
	include "connect.php";
	$conn = connect();
	if (!$conn) {
		die('error');
		exit;
	}
	$sql = "SELECT * FROM dyna ORDER BY dynamic_date DESC";
	mysqli_query($conn, "SET NAMES utf8");
	$rslt = mysqli_query($conn, $sql);
	if (!$rslt) {
		die("error");
		exit;
	}
	$index = 0;
	$data = Array();
	while ($row = mysqli_fetch_assoc($rslt)) {
		$dyna = Array();
		$dyna['say'] = $row["say"];
		$dyna["countBag"] = $row['count_bag'];
		$dyna["good"] = $row["good"];
		$dyna['time'] = $row['dynamic_date'];
		$id = $row['usr_id'];
		$sql = "SELECT name FROM usr WHERE usr_id = '" . $id . "'";
		$r = mysqli_query($conn, $sql);
		$name = '';
		while ($row = mysqli_fetch_assoc($r)) {
			$name = $row['name'];
		}
		$dyna['name'] = $name;
		$data[$index++] = $dyna;
	}
	print(json_encode($data));
?>