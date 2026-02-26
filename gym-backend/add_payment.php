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

/* React might send as JSON or URLSearchParams, let's handle JSON first */
$data = json_decode(file_get_contents("php://input"), true);

/* If not JSON, check $_POST */
$uid = isset($data['uid']) ? (int)$data['uid'] : (isset($_POST['uid']) ? (int)$_POST['uid'] : 0);
$amount = isset($data['amount']) ? (float)$data['amount'] : (isset($_POST['amount']) ? (float)$_POST['amount'] : 0);

$paymentMode = "Cash";
$status = "Paid";

if ($uid <= 0 || $amount <= 0) {
    echo json_encode(["status" => "error", "message" => "UID or amount missing"]);
    exit;
}

/* Check member exists */
$check = $conn->prepare("SELECT Name FROM users WHERE UID = ?");
$check->bind_param("i", $uid);
$check->execute();
if ($check->get_result()->num_rows === 0) {
    echo json_encode(["status" => "error", "message" => "Invalid Member ID"]);
    exit;
}

$stmt = $conn->prepare("INSERT INTO payment (UID, Amount, PaymentDate, PaymentMode, Status) VALUES (?, ?, CURDATE(), ?, ?)");
$stmt->bind_param("idss", $uid, $amount, $paymentMode, $status);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Payment added successfully"]);
} else {
    echo json_encode(["status" => "error", "message" => $stmt->error]);
}

$conn->close();
