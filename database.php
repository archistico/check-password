<?php

$servername = "localhost";
$username = "";
$password = "";
$dbname = "";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
	die("Connection failed: " . $conn->connect_error);
}
//echo '<div class="alert alert-success" role="alert"> <strong>OK!</strong> Connessione al database attiva. </div>';
?> 