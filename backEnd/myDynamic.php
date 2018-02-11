<?php
	include "connect.php";
	$conn = connect();
	if (!$conn) {
		die("Connection Failed" . mysqli_connect_error());
		exit;
	}
	mysqli_query($conn, "SET NAMES utf8");
	$sql = "SELECT * FROM dyna WHERE usrID = '" . $_REQUEST['usrID'] . "' ORDER BY dynamicDate ASC";
	$rslt = mysqli_query($conn, $sql);
	$data = Array();
	$index = 0;
	while ($row = mysqli_fetch_assco($rslt)) {
		$dyna = Array();
		$dyna['good'] = $row['good'];
		$dyna['countBag'] = $row['countBag'];
		$dyna['image'] = $row['image'];
		$dyna['say'] = $row['say'];
		$dyna['dynamicDate'] = $row['dynamicDate'];
		$data[$index++] = $dyna;
	}
	print(json_encode($data));
?>