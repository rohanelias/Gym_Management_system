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

$user_id = isset($data['user_id']) ? (int)$data['user_id'] : 0;
$days = isset($data['available_days']) ? (int)$data['available_days'] : 0;

if ($user_id <= 0) {
    echo json_encode(["status" => "error", "message" => "Invalid User ID"]);
    exit;
}

// SQL using your column names: UID and AvailableDays
$sql = "UPDATE users SET AvailableDays = $days WHERE UID = $user_id";

if ($conn->query($sql) === TRUE) {
    echo json_encode([
        "status" => "success", 
        "message" => "Availability updated to $days days!"
    ]);
} else {
    echo json_encode([
        "status" => "error", 
        "message" => "SQL Error: " . $conn->error
    ]);
}

$conn->close();
?>