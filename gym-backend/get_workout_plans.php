<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
include "db.php";

$trainer_id = isset($_GET['trainer_id']) ? (int)$_GET['trainer_id'] : null;

if (!$trainer_id) {
  echo json_encode([]);
  exit;
}

$sql = "
  SELECT 
    wp.id,
    u.Name AS member_name,
    wp.plan,
    wp.created_at
  FROM workout_plans wp
  JOIN users u ON wp.member_id = u.UID
  WHERE wp.trainer_id = ?
  ORDER BY wp.created_at DESC
";

$stmt = $conn->prepare($sql);
if (!$stmt) {
    echo json_encode(["error" => $conn->error]);
    exit;
}

$stmt->bind_param("i", $trainer_id);
$stmt->execute();

$result = $stmt->get_result();
$plans = [];

while ($row = $result->fetch_assoc()) {
  $plans[] = $row;
}

echo json_encode($plans);
$conn->close();
