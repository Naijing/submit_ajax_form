<?php
	sleep(3);
	require 'config.php';
	$stmt=$pdo->prepare("INSERT INTO user (user, pass, email, sex, birthday, date)
			VALUES (?, md5(?), ?, ?, ?, NOW())");
	$stmt->execute(array($_POST['user'],$_POST['pass'],$_POST['email'],$_POST['sex'],$_POST['birthday']));

	echo $stmt->rowCount();
?>