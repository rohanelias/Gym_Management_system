<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include "db.php";

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(["message" => "Invalid data"]);
    exit;
}

$name = $data["name"];
$email = $data["email"];
$password = $data["password"];
$role = isset($data["role"]) ? $data["role"] : "Member"; // Allow role choice, default to Member

$sql = "INSERT INTO users (Name, Email, Password, Role, Status, JoinDate) VALUES (?, ?, ?, ?, 'Pending', CURDATE())";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssss", $name, $email, $password, $role);

if ($stmt->execute()) {
    echo json_encode(["message" => "Signup successful. Your account is pending admin approval."]);
} else {
    echo json_encode(["message" => "Signup failed"]);
}
$stmt->close();
$conn->close();
