<?php
session_start();

$email = $_POST['email'] ?? null;
$password = $_POST['password'] ?? null;

if (empty($email) || empty($password)) {
    echo "Both email and password are required.";
    exit();
}


$conn = new mysqli('localhost', 'root', '', 'Registration');

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$stmt = $conn->prepare("SELECT * FROM registration WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($user = $result->fetch_assoc()) {
    if ($password == $user['password']) {
        $_SESSION['user_email'] = $email; 
        echo "Login successful.";
        header("Location: dashboard.php");
        exit();
    } else {
        echo "Invalid email or password.";
    }
} else {
    echo "User does not exist.";
}

$stmt->close();
$conn->close();
?>
