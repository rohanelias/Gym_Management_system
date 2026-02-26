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

if (!isset($data['member_id'])) {
    echo json_encode(["status" => "error", "message" => "Member ID missing"]);
    exit;
}

$uid = (int)$data['member_id'];

/* CHECK MEMBER EXISTS */
$userSql = "SELECT Name FROM users WHERE UID = ?";
$userStmt = $conn->prepare($userSql);
$userStmt->bind_param("i", $uid);
$userStmt->execute();
if ($userStmt->get_result()->num_rows === 0) {
    echo json_encode(["status" => "error", "message" => "Invalid Member ID"]);
    exit;
}

/* PREVENT DUPLICATE ATTENDANCE */
$checkSql = "SELECT ATTID FROM attendance WHERE UID = ? AND `Date` = CURDATE()";
$checkStmt = $conn->prepare($checkSql);
$checkStmt->bind_param("i", $uid);
$checkStmt->execute();
if ($checkStmt->get_result()->num_rows > 0) {
    echo json_encode(["status" => "error", "message" => "Attendance already marked today"]);
    exit;
}

/* INSERT ATTENDANCE */
$insertSql = "INSERT INTO attendance (UID, `Date`, CheckIn) VALUES (?, CURDATE(), CURTIME())";
$insertStmt = $conn->prepare($insertSql);
$insertStmt->bind_param("i", $uid);

if ($insertStmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Attendance marked successfully"]);
} else {
    echo json_encode(["status" => "error", "message" => $conn->error]);
}

$conn->close();
