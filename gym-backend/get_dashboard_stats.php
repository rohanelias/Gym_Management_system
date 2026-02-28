<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
include "db.php";

$data = [];

/* 1. KEY COUNTS */
$res = $conn->query("SELECT COUNT(*) AS total FROM users WHERE Role = 'Member' AND Status = 'Active'");
$data['members'] = $res ? (int)$res->fetch_assoc()['total'] : 0;

$res = $conn->query("SELECT COUNT(*) AS total FROM users WHERE Role = 'Trainer' AND Status = 'Active'");
$data['trainers'] = $res ? (int)$res->fetch_assoc()['total'] : 0;

$res = $conn->query("SELECT IFNULL(SUM(Amount), 0) AS total FROM payment");
$data['revenue'] = $res ? (float)$res->fetch_assoc()['total'] : 0;

$res = $conn->query("SELECT COUNT(*) AS total FROM attendance WHERE `Date` = CURDATE()");
$data['attendance'] = $res ? (int)$res->fetch_assoc()['total'] : 0;

/* 2. REVENUE TREND (Last 6 Months) */
$revenueTrend = [];
for ($i = 5; $i >= 0; $i--) {
    $monthName = date('M', strtotime("-$i months"));
    $monthNum = date('m', strtotime("-$i months"));
    $yearNum = date('Y', strtotime("-$i months"));
    
    $query = "SELECT SUM(Amount) as total FROM payment WHERE MONTH(PaymentDate) = '$monthNum' AND YEAR(PaymentDate) = '$yearNum'";
    $r = $conn->query($query);
    $val = $r ? (float)$r->fetch_assoc()['total'] : 0;
    
    $revenueTrend[] = ["month" => $monthName, "revenue" => $val];
}
$data['revenueTrend'] = $revenueTrend;

/* 3. ATTENDANCE TREND (Last 7 Days) */
$attendanceTrend = [];
for ($i = 6; $i >= 0; $i--) {
    $dayName = date('D', strtotime("-$i days"));
    $dateStr = date('Y-m-d', strtotime("-$i days"));
    
    $query = "SELECT COUNT(*) as total FROM attendance WHERE `Date` = '$dateStr'";
    $r = $conn->query($query);
    $val = $r ? (int)$r->fetch_assoc()['total'] : 0;
    
    $attendanceTrend[] = ["day" => $dayName, "count" => $val];
}
$data['attendanceTrend'] = $attendanceTrend;

/* 4. RECENT PAYMENTS */
$recentPayments = [];
$pRes = $conn->query("SELECT p.PID, p.Amount, p.PaymentDate, u.Name as member_name FROM payment p JOIN users u ON p.UID = u.UID ORDER BY p.PaymentDate DESC, p.PID DESC LIMIT 5");
if ($pRes) {
    while($row = $pRes->fetch_assoc()) {
        $recentPayments[] = $row;
    }
}
$data['recentPayments'] = $recentPayments;

echo json_encode($data);
$conn->close();
?>