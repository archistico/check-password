<?php

require('database.php');

// Getting posted data and decodeing json
//$_POST = json_decode(file_get_contents('php://input'), true);

// checking for blank values.
if (empty($_POST['pw'])) {
    $errors['pw'] = 'Password richiesta';
} else {
    $pw = $_POST['pw'];
}

//echo "pw:".$pw."<br>";

$query = "SELECT testo "
        . "FROM pw "
        . "WHERE testo = '{$pw}'";
$result = $conn->query($query) or die($conn->error . __LINE__);

if ($result->num_rows > 0) {
    echo "true";
} else {
    echo "false";
}

$conn->close();
?>