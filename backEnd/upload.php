<?php
	$data = Array();
	include "connect.php";
	$conn = connect();
	$date = date('Y-m-d H:i:s');
	
	if (!$conn) {
		die("Connection Failed" . mysqli_connect_error());
		exit;
	}
	if ($_REQUEST['countBag'] == 0) {
		echo "OK";		
		exit;
	}
	mysqli_query($conn, "SET NAMES utf8");
	$sql = "SELECT signupDate FROM usr WHERE usrID = '" . $_REQUEST['usrID'] . "'";
	
	$rslt = mysqli_query($conn, $sql);
	$score = 2;
	while ($row = mysqli_fetch_assoc($rslt)) {
		
		$signupDate = $row['signupDate'];
		$deltaDay = (strtotime($date) - strtotime($signupDate)) / (3600*24);
		$sql = "SELECT COUNT(*) AS num FROM dyna WHERE usrID = '" . $_REQUEST['usrID'] . "'";
		$rslt = mysqli_query($conn, $sql);
		while ($row = mysqli_fetch_assoc($rslt)) {
			if ($row['num'] == 0) {
				if ($deltaDay <=7) {
					$score = 3;
				}
				$sql = "UPDATE usr, invitate, invitated SET usr.score = usr.score + 3 WHERE usr.usrID = invitate.usrID AND invitate.invitateCode = invitated.invitatedCode AND invitated.usrID = '" . $_REQUEST['usrID'] . "'";
				mysqli_query($conn, $sql);
				$sql = "DELETE FROM invitated WHERE usrID = '" . $_REQUEST['usrID'] . "'";
				mysqli_query($conn, $sql);
			}
		}
		
		if ($_REQUEST['countBag'] > 1) {
			$score += $_REQUEST['countBag'] - 1;
		}
		if ($score > 5) {
			$score = 5;
		}
	}
	$sql = "SELECT COUNT(*) AS num FROM dyna";
	$rslt = mysqli_query($conn, $sql);
	while ($row = mysqli_fetch_assoc($rslt)) {
		$ID = $row['num'];
	}
	$data['dynamicID'] = $ID;
	$sql = "INSERT INTO dyna(dynamicID, usrID, dynamicDate, countBag, say) VALUES ('" . $ID . "', '" . $_REQUEST['usrID'] . "', '" . $date . "', " . $_REQUEST['countBag'] . ", '" . $_REQUEST['say'] . "')";
	mysqli_query($conn, $sql);
	$sql = "UPDATE usr SET score = score + " . $score . " WHERE usrID = '" . $_REQUEST['usrID'] . "'";
	mysqli_query($conn, $sql);
	$sql = "UPDATE usr SET countBag = countBag + " . $_REQUEST['countBag'] . " WHERE usrID = '" . $_REQUEST['usrID'] . "'";
	mysqli_query($conn, $sql);
	print(json_encode($data));
?>
