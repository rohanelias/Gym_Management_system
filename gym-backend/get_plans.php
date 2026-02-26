<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Try to get plans from DB, but ALWAYS have a backup so the UI is never empty
try {
    require_once "db.php";

    $plans = [];
    if ($conn) {
        $sql = "SELECT PLID as id, PlanType as name, Details as features, Amount as price FROM plan ORDER BY Amount ASC";
        $result = $conn->query($sql);

        if ($result && $result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $featRaw = $row['features'];
                $decoded = json_decode($featRaw, true);
                if (json_last_error() === JSON_ERROR_NONE && is_array($decoded)) {
                    $row['features'] = $decoded;
                } else {
                    $row['features'] = array_map('trim', explode(',', $featRaw));
                }
                $row['price'] = (float)$row['price'];
                $plans[] = $row;
            }
        }
    }

    // IF DB IS EMPTY OR CONNECTION FAILED, USE THESE DEFAULTS
    if (empty($plans)) {
        $plans = [
            [
                "id" => 1, 
                "name" => "Basic", 
                "price" => 800, 
                "features" => ["Access to Gym Floor", "Locker Room Access", "Basic Equipment", "General Guidance"]
            ],
            [
                "id" => 2, 
                "name" => "Premium", 
                "price" => 2000, 
                "features" => ["Everything in Basic", "Personalized Workout Plan", "Steam & Sauna", "Group Classes"]
            ],
            [
                "id" => 3, 
                "name" => "Elite", 
                "price" => 8000, 
                "features" => ["Everything in Premium", "Personal Trainer", "Nutritional Diet Plan", "Massage Access"]
            ]
        ];
    }

    echo json_encode($plans);

} catch (Exception $e) {
    // Even on crash, return defaults so UI works
    echo json_encode([
        ["id" => 1, "name" => "Basic", "price" => 800, "features" => ["Access to Gym Floor"]],
        ["id" => 2, "name" => "Premium", "price" => 2000, "features" => ["Personalized Plan"]],
        ["id" => 3, "name" => "Elite", "price" => 8000, "features" => ["Personal Trainer"]]
    ]);
}
?>