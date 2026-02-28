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

$uid = $data['uid'];
$status = $data['status']; // 'Active' or 'Rejected'

$sql = "UPDATE users SET Status = ? WHERE UID = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("si", $status, $uid);

if ($stmt->execute()) {
    echo json_encode(["message" => "Member status updated to $status"]);
} else {
    echo json_encode(["message" => "Update failed"]);
}
$stmt->close();
$conn->close();
?>
