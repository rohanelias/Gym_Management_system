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
    dp.id,
    u.Name AS member_name,
    dp.plan,
    dp.created_at
  FROM diet_plans dp
  JOIN users u ON dp.member_id = u.UID
  WHERE dp.trainer_id = ?
  ORDER BY dp.created_at DESC
";

$stmt = $conn->prepare($sql);
if (!$stmt) {
    echo json_encode(["error" => $conn->error]);
    exit;
}

$stmt->bind_param("i", $trainer_id);
$stmt->execute();

$result = $stmt->get_result();
$diets = [];

while ($row = $result->fetch_assoc()) {
  $diets[] = $row;
}

echo json_encode($diets);
$conn->close();
