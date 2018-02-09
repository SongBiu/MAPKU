<?php
	include "connect.php";
	$conn = connect();
	if (!$conn) {
		die('error');
		exit;
	}
	$sql = "UPDATE usr SET community_id = '" . $_REQUEST['communityID'] . "' WHERE usr_id = '" . $_REQUEST['usrID'] . "'";
	mysqli_query($conn, "SET NAMES utf8");
	$rslt = mysqli_query($conn, $sql);
	if (!$rslt) {
		die("error");
		exit;
	}
	echo "join OK";
	mysqli_close($conn);
?>