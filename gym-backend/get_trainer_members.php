<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
ini_set('display_errors', 1);
error_reporting(E_ALL);

include "db.php";

$trainer_id = isset($_GET['trainer_id']) ? (int)$_GET['trainer_id'] : null;

if (!$trainer_id) {
  echo json_encode([]);
  exit;
}

$sql = "
  SELECT u.UID AS id, u.Name AS name, u.Email AS email, u.AvailableDays AS available_days
  FROM trainer_members tm 
  JOIN users u ON tm.member_id = u.UID 
  WHERE tm.trainer_id = ?
";

$stmt = $conn->prepare($sql);
if (!$stmt) {
    echo json_encode(["error" => "Prepare failed: " . $conn->error]);
    exit;
}

$stmt->bind_param("i", $trainer_id);
$stmt->execute();

$result = $stmt->get_result();
$members = [];

while ($row = $result->fetch_assoc()) {
  $members[] = $row;
}

echo json_encode($members);
$conn->close();
