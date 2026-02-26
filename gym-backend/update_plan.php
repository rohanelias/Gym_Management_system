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

$id = isset($data['id']) ? (int)$data['id'] : 0;
$price = isset($data['price']) ? (float)$data['price'] : 0.0;
$features = isset($data['features']) ? json_encode($data['features']) : '[]';

if ($id <= 0) {
    echo json_encode(["status" => "error", "message" => "Invalid Plan ID"]);
    exit;
}

/* Update or Insert plan */
$sql = "UPDATE plan SET price = ?, features = ? WHERE id = ?";
$stmt = $conn->prepare($sql);
if (!$stmt) {
    // If table doesn't exist or column names differ, attempt auto-create or error
    echo json_encode(["status" => "error", "message" => $conn->error]);
    exit;
}

$stmt->bind_param("dsi", $price, $features, $id);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Plan updated successfully"]);
} else {
    echo json_encode(["status" => "error", "message" => $stmt->error]);
}

$stmt->close();
$conn->close();
?>