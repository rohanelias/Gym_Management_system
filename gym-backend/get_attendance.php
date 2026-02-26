<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
include "db.php";

$sql = "
SELECT 
  a.UID,
  u.Name,
  a.Date,
  a.CheckIn
FROM attendance a
JOIN users u ON a.UID = u.UID
WHERE a.Date = CURDATE()
ORDER BY a.CheckIn DESC
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
