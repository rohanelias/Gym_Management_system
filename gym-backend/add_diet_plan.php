<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once "db.php";

$json = file_get_contents('php://input');
$data = json_decode($json, true);

if (!$data) {
    echo json_encode(["status" => "error", "message" => "No data received"]);
    exit;
}

$trainer_id = isset($data['trainer_id']) ? (int)$data['trainer_id'] : 0;
$member_id  = isset($data['member_id']) ? (int)$data['member_id'] : 0;
$plan       = isset($data['plan']) ? $conn->real_escape_string($data['plan']) : "";

if ($trainer_id <= 0 || $member_id <= 0 || empty($plan)) {
    echo json_encode(["status" => "error", "message" => "Missing required fields"]);
    exit;
}

// SQL using your columns for diet_plans: id, trainer_id, member_id, plan, created_at
$sql = "INSERT INTO diet_plans (trainer_id, member_id, plan) 
        VALUES ($trainer_id, $member_id, '$plan')
        ON DUPLICATE KEY UPDATE plan = '$plan', created_at = CURRENT_TIMESTAMP";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["status" => "success", "message" => "Diet plan saved!"]);
} else {
    echo json_encode(["status" => "error", "message" => "SQL Error: " . $conn->error]);
}

$conn->close();
?>