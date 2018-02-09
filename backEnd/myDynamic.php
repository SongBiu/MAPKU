<?php
	include "connect.php";
	$conn = connect();
	if (!$conn) {
		die("Connection Failed" . mysqli_connect_error());
		exit;
	}
	mysqli_query($conn, "SET NAMES utf8");
	$sql = "SELECT * FROM dyna WHERE usr_id = '" . $_REQUEST['usr_id'] . "' ORDER BY dynamic_data ASC";
	$rslt = mysqli_query($conn, $sql);
	$data = Array();
	$index = 0;
	while ($row = mysqli_fetch_assco($rslt)) {
		$dyna = Array();
		$dyna['good'] = $row['good'];
		$dyna['count_bag'] = $row['count_bag'];
		$dyna['image'] = $row['image'];
		$dyna['say'] = $row['say'];
		$dyna['dynamic_date'] = $row['dynamic_date'];
		$data[$index++] = $dyna;
	}
	print(json_encode($data));
?>