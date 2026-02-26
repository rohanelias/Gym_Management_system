<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

include "db.php";

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);

$trainer_id = isset($data['trainer_id']) ? (int)$data['trainer_id'] : 0;
$member_id  = isset($data['member_id']) ? (int)$data['member_id'] : 0;

if ($trainer_id <= 0 || $member_id <= 0) {
    echo json_encode(["status" => "error", "message" => "Invalid input"]);
    exit;
}

$sql = "INSERT IGNORE INTO trainer_members (trainer_id, member_id) VALUES (?, ?)";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode(["status" => "error", "message" => $conn->error]);
    exit;
}

$stmt->bind_param("ii", $trainer_id, $member_id);

if ($stmt->execute()) {
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "error", "message" => $stmt->error]);
}

$stmt->close();
$conn->close();
