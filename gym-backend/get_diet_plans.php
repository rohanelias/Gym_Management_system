<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

$conn = new mysqli("localhost", "root", "", "gym_management");

$trainer_id = $_GET['trainer_id'];

if (!$trainer_id) {
  echo json_encode([]);
  exit;
}

$sql = "
  SELECT 
    dp.id,
    u.name AS member_name,
    dp.plan,
    dp.created_at
  FROM diet_plans dp
  JOIN users u ON dp.member_id = u.id
  WHERE dp.trainer_id = ?
  ORDER BY dp.created_at DESC
";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $trainer_id);
$stmt->execute();

$result = $stmt->get_result();
$diets = [];

while ($row = $result->fetch_assoc()) {
  $diets[] = $row;
}

echo json_encode($diets);