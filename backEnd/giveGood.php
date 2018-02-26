<?php
        include "connect.php";
        $conn = connect();
        if (!$conn) {
                die("Connection Failed" . mysqli_connect_error());
                exit;
        }
        mysqli_query($conn, "SET NAMES utf8");
        $sql = "UPDATE dyna SET good = good + 1 WHERE dynamicID = '" . $_REQUEST['dynamicID'] . "'";
	echo $sql;
        $rslt = mysqli_query($conn, $sql);
        $sql = "INSERT INTO good(dynamicID, usrID) VALUES ('" . $_REQUEST['dynamicID'] . "', '" . $_REQUEST['openid'] . "')";
	$rslt = mysqli_query($conn, $sql);
?>
