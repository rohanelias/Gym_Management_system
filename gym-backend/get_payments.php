<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
include "db.php";

$sql = "
SELECT 
  p.PID,
  p.UID,
  p.Amount,
  p.PaymentDate,
  p.PaymentMode,
  p.Status,
  u.Name AS user_name
FROM payment p
JOIN users u ON p.UID = u.UID
ORDER BY p.PaymentDate DESC
";

$result = $conn->query($sql);

$data = [];
if ($result) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}

echo json_encode($data);
$conn->close();
?>