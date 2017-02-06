<?php


const DSN = "mysql:host=localhost; dbname=zhiwen";
const DBUSER = "root";
const DBPASS = null;

try{
	$pdo = new PDO(DSN, DBUSER, DBPASS);
}catch (PDOException $e){
	echo "ERROR:".$e->getMessage();
}
?>