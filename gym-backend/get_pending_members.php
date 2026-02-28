<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
include "db.php";

$sql = "SELECT UID as id, Name as name, Email as email, JoinDate as date, Role as role FROM users WHERE Status = 'Pending'";
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
