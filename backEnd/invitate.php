<?php
	include "connect.php";
	function str_rand(& $str, $invitater, $length = 15, $char = '0123456789qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM&*()^%$#@') {
		if (!is_int($length) || $length < 0) {
			return false;
		}
		$s = '';
		for ($i = $length; $i > 0; $i--) {
			$s.=$char[mt_rand(0, strlen($char)-1)];
		}
		$conn = connect();
		if (!$conn) {
			die("Connection Failed" . mysqli_connect_error());
			exit;
		}
		mysqli_query($conn, "SET NAMES utf8");
		$sql = "SELECT invitation_code FROM invitate WHERE inviter_id = '" . $invitater . "'";
		$rslt = mysqli_query($conn, $sql);
		if (mysqli_num_rows($rslt) != 0) {
			$row = mysqli_fetch_assoc($rslt);
			$str = $row['invitation_code'];
			return true;
		}
		$sql = "SELECT COUNT(*) AS num FROM invitate WHERE invitation_code = '" . $s . "'";
		$rslt = mysqli_query($conn, $sql);
		$row = mysqli_fetch_assoc($rslt);
		if ($row['num'] != 0) {
			return false;
		}
		$sql = "INSERT INTO invitate(invitation_code, inviter_id) VALUES ('" . $s . "', '" . $invitater . "')";
		$rslt = mysqli_query($conn, $sql);
		if (!$rslt) {
			echo "error";
			return false;
		}
		$str = $s;
		return true;
	}
	$str = '';
	while (true) {
		if (str_rand($str, $_REQUEST['invitater'])) {
			break;
		}
	}
	echo $str;
?>