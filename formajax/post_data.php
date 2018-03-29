<?php
$listUsername = Array("binhnguyen","test", "admin");
if($_POST["username"]){
	foreach ($listUsername as $key => $username) {
		if($username === $_GET["username"]){
			echo "true";
		}
	}
}