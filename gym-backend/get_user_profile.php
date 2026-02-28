<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type");

// Suppress PHP warnings from leaking into JSON
error_reporting(0);
ini_set('display_errors', 0);

try {
    require_once "db.php";

    $user_id = isset($_GET['user_id']) ? (int)$_GET['user_id'] : 0;

    if ($user_id <= 0) {
        throw new Exception("Invalid User ID");
    }

    /* 1. GET USER INFO */
    $sql = "SELECT UID AS id, Name AS name, Email AS email, Role AS role, JoinDate, AvailableDays AS available_days, ProfilePic AS profile_pic FROM users WHERE UID = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $profile = $stmt->get_result()->fetch_assoc();

    if (!$profile) {
        throw new Exception("User not found");
    }

    $role = strtolower($profile['role']);

    /* 2. ADMIN SPECIFIC STATS */
    if ($role === 'admin') {
        $revRes = $conn->query("SELECT IFNULL(SUM(Amount), 0) as total FROM payment");
        $profile['total_revenue'] = (float)$revRes->fetch_assoc()['total'];
        
        $memRes = $conn->query("SELECT COUNT(*) as total FROM users WHERE Role = 'Member' AND Status = 'Active'");
        $profile['active_members'] = (int)$memRes->fetch_assoc()['total'];
        
        $trnRes = $conn->query("SELECT COUNT(*) as total FROM users WHERE Role = 'Trainer' AND Status = 'Active'");
        $profile['active_trainers'] = (int)$trnRes->fetch_assoc()['total'];
        
        $attRes = $conn->query("SELECT COUNT(*) as total FROM attendance WHERE Date = CURDATE()");
        $profile['today_attendance'] = (int)$attRes->fetch_assoc()['total'];
    }

    /* 3. TRAINER SPECIFIC STATS */
    if ($role === 'trainer') {
        $memCountRes = $conn->query("SELECT COUNT(*) as total FROM trainer_members WHERE trainer_id = $user_id");
        $profile['member_count'] = (int)$memCountRes->fetch_assoc()['total'];
        
        $wpCountRes = $conn->query("SELECT COUNT(*) as total FROM workout_plans WHERE trainer_id = $user_id");
        $profile['workout_plans_count'] = (int)$wpCountRes->fetch_assoc()['total'];
        
        $dpCountRes = $conn->query("SELECT COUNT(*) as total FROM diet_plans WHERE trainer_id = $user_id");
        $profile['diet_plans_count'] = (int)$dpCountRes->fetch_assoc()['total'];
    }

    /* 4. MEMBER SPECIFIC STATS */
    if ($role === 'member') {
        $trainerSql = "
            SELECT u.Name, u.Email 
            FROM trainer_members tm 
            JOIN users u ON tm.trainer_id = u.UID 
            WHERE tm.member_id = ?
            LIMIT 1
        ";
        $tStmt = $conn->prepare($trainerSql);
        $tStmt->bind_param("i", $user_id);
        $tStmt->execute();
        $tRes = $tStmt->get_result()->fetch_assoc();
        $profile['trainer_name'] = $tRes ? $tRes['Name'] : "Not Assigned";
        $profile['trainer_email'] = $tRes ? $tRes['Email'] : "";

        $wpRes = $conn->query("SELECT plan FROM workout_plans WHERE member_id = $user_id ORDER BY created_at DESC LIMIT 1");
        $profile['workout_plan'] = ($r = $wpRes->fetch_assoc()) ? $r['plan'] : "None";
        
        $dpRes = $conn->query("SELECT plan FROM diet_plans WHERE member_id = $user_id ORDER BY created_at DESC LIMIT 1");
        $profile['diet_plan'] = ($r = $dpRes->fetch_assoc()) ? $r['plan'] : "None";

        $attRes = $conn->query("SELECT COUNT(*) as total FROM attendance WHERE UID = $user_id AND Date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)");
        $profile['attendance_count'] = (int)$attRes->fetch_assoc()['total'];
    }

    /* 5. RECENT ACTIVITY */
    $activity = [];
    if ($role === 'admin') {
        $paySql = "SELECT p.PID, p.Amount, p.PaymentDate, p.Status, u.Name as member_name FROM payment p JOIN users u ON p.UID = u.UID ORDER BY p.PaymentDate DESC LIMIT 10";
        $pRes = $conn->query($paySql);
        while($row = $pRes->fetch_assoc()) $activity[] = $row;
    } else if ($role === 'trainer') {
        $attSql = "SELECT a.Date as PaymentDate, u.Name as member_name, 'Present' as Status, 0 as Amount 
                   FROM attendance a 
                   JOIN users u ON a.UID = u.UID 
                   JOIN trainer_members tm ON u.UID = tm.member_id 
                   WHERE tm.trainer_id = $user_id 
                   ORDER BY a.Date DESC LIMIT 10";
        $aRes = $conn->query($attSql);
        while($row = $aRes->fetch_assoc()) $activity[] = $row;
    } else {
        $paySql = "SELECT PID, Amount, PaymentDate, Status FROM payment WHERE UID = ? ORDER BY PaymentDate DESC LIMIT 5";
        $pStmt = $conn->prepare($paySql);
        $pStmt->bind_param("i", $user_id);
        $pStmt->execute();
        $pRes = $pStmt->get_result();
        while($row = $pRes->fetch_assoc()) $activity[] = $row;
    }
    $profile['recent_activity'] = $activity;

    echo json_encode($profile);

} catch (Exception $e) {
    echo json_encode(["status" => "error", "message" => $e->getMessage()]);
}

$conn->close();
?>