<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include "db.php";

if (!isset($_FILES['profile_pic']) || !isset($_POST['user_id'])) {
    echo json_encode(["status" => "error", "message" => "Missing data"]);
    exit;
}

$user_id = (int)$_POST['user_id'];
$file = $_FILES['profile_pic'];

$target_dir = "uploads/profile_pics/";
$file_extension = strtolower(pathinfo($file["name"], PATHINFO_EXTENSION));
$new_filename = "user_" . $user_id . "_" . time() . "." . $file_extension;
$target_file = $target_dir . $new_filename;

// Check if image file is a actual image
$check = getimagesize($file["tmp_name"]);
if($check === false) {
    echo json_encode(["status" => "error", "message" => "File is not an image."]);
    exit;
}

// Allow certain file formats
if($file_extension != "jpg" && $file_extension != "png" && $file_extension != "jpeg" && $file_extension != "gif" ) {
    echo json_encode(["status" => "error", "message" => "Only JPG, JPEG, PNG & GIF files are allowed."]);
    exit;
}

if (move_uploaded_file($file["tmp_name"], $target_file)) {
    // Update database
    $image_url = "http://localhost/gym-backend/" . $target_file;
    $sql = "UPDATE users SET ProfilePic = ? WHERE UID = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("si", $image_url, $user_id);
    
    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Profile picture updated", "url" => $image_url]);
    } else {
        echo json_encode(["status" => "error", "message" => "Database update failed"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Sorry, there was an error uploading your file."]);
}

$conn->close();
?>
