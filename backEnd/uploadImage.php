<?php
	if ($_FILES["image"]["error"] > 0) {
		echo "Error: " . $_FILES["image"]["error"] . "<br>";
	} else {
		$usrID = $_REQUEST["ID"];
		$name = $_FILES["image"]["name"];
		$tmp = mime_content_type($_FILES["image"]["tmp_name"]);
		$data = Array();
		$data['type'] = $tmp;
		$data['name'] = $name;
		$data['id'] = $usrID;
		$file = "img/qq.gif";
		move_uploaded_file($_FILES["image"]["tmp_name"],
		$file);
		chmod($file, 755);
	}
	print($_FILES["image"]["name"]);	
?>