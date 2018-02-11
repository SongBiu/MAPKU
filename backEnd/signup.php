<?php
	include "connect.php";
	$conn = connect();
	if (!$conn) {
		die("Connection Failed" . mysqli_connect_error());
		exit;
	}
	mysqli_query($conn, "SET NAMES utf8");
	$data = Array();
	$sql = "SELECT COUNT(*) as num FROM invitate WHERE invitate_code = '" . $_REQUEST['invitateCode'] . "'";
	$data['sql'] = $sql;
	$rslt = mysqli_query($conn, $sql);
	$row = mysqli_fetch_assoc($rslt);
	if ($row['num'] == 0 && $row['num'] != "") {
		$data['error'] = "邀请码不存在";
		exit;
	}
	$sql = "INSERT INTO usr(usr_id, name, email) VALUES ('" . $_REQUEST["openid"] . "', '" . $_REQUEST['name'] . "', '" . $_REQUEST['email'] . "')"; 
	$rslt = mysqli_query($conn, $sql);
	if (!$rslt) {
		$data['error'] = "名字或邮箱填写错误";
		print(json_encode($data));
		exit;
	}
	$sql = "INSERT INTO invitated(newusr_id, invitation_code) VALUES ('" . $_REQUEST['openid'] . "'" . ", '" . $_REQUEST['invitateCode'] . "')";
	mysqli_query($conn, $sql);
	print(json_encode($data));
?>