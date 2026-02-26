<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$conn = new mysqli("localhost", "root", "", "gym_management");

if ($conn->connect_error) {
    die("Database connection failed");
}
?>
