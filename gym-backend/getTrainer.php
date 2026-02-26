<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

include "db.php";

$sql = "
SELECT 
  UID AS id,
  Name AS name,
  Email AS email,
  Speciality AS specialization
FROM users
WHERE Role = 'Trainer'
";

$result = $conn->query($sql);

$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode($data);
$conn->close();
