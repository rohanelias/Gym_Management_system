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
    echo json_encode(["status" => "error", "message" => "No data provided"]);
    exit;
}

$name = $data['name'];
$email = $data['email'];
$password = $data['password'];
$age = (int)$data['age'];
$gender = $data['gender'];

$sql = "
INSERT INTO users 
(Name, Email, Password, Role, Status, JoinDate, Age, Gender)
VALUES (?, ?, ?, 'Member', 'Active', CURDATE(), ?, ?)
";

$stmt = $conn->prepare($sql);
if (!$stmt) {
    echo json_encode(["status" => "error", "message" => $conn->error]);
    exit;
}

$stmt->bind_param("sssis", $name, $email, $password, $age, $gender);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Member added successfully"]);
} else {
    echo json_encode(["status" => "error", "message" => $stmt->error]);
}

$stmt->close();
$conn->close();
