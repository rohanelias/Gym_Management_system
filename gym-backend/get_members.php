<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
include "db.php";

$sql = "
SELECT 
  UID AS id,
  Name AS name,
  Email AS email
FROM users
WHERE Role = 'Member' AND Status = 'Active'
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
