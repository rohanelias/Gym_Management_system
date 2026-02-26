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

$email = isset($data['email']) ? $data['email'] : "";
$password = isset($data['password']) ? $data['password'] : "";

$sql = "SELECT UID, Name, Email, Role FROM users WHERE Email = ? AND Password = ?";
$stmt = $conn->prepare($sql);
if (!$stmt) {
    echo json_encode(["message" => "Prepare failed", "error" => $conn->error]);
    exit();
}

$stmt->bind_param("ss", $email, $password);
$stmt->execute();
$result = $stmt->get_result();

if ($row = $result->fetch_assoc()) {
    echo json_encode([
        "message" => "Login successful",
        "role"    => strtolower($row["Role"]),
        "user_id" => (int)$row["UID"],
        "name"    => $row["Name"],
        "email"   => $row["Email"]
    ]);
} else {
    echo json_encode(["message" => "Invalid credentials"]);
}

$stmt->close();
$conn->close();
