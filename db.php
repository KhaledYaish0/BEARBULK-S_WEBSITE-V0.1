<?php
$servername = "localhost";
$username = "root"; // Default XAMPP/MAMP username
$password = ""; // Default XAMPP/MAMP password is empty
$dbname = "shopping_cart";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
