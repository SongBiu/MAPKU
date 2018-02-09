<?php
	if ($_FILES["image"]["error"] > 0) {
		echo "Error: " . $_FILES["image"]["error"] . "<br>";
	} else {
		print(json_encode($_FILES));
	}
?>