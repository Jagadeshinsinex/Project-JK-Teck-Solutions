<?php
$email = $_POST['email'] ?? null;
$password = $_POST['password'] ?? null;
$confirm_password = $_POST['confirm_password'] ?? null;

if (empty($email) || empty($password) || empty($confirm_password)) {
    echo "All fields are required.";
    exit(); 
}

$conn = new mysqli('localhost', 'root', '', 'Registration');

if ($conn->connect_error) {
    echo "$conn->connect_error";
    die("Connection Failed: " . $conn->connect_error);
} 

$stmt = $conn->prepare("SELECT * FROM registration WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();
if ($result->fetch_assoc()) {
    echo "This email is already registered.";
    exit(); 
}

$stmt = $conn->prepare("INSERT INTO registration (email, password, confirm_password) VALUES (?, ?, ?)");
if ($stmt === false) {
    die("Error preparing statement: " . $conn->error);
}

$stmt->bind_param("sss", $email, $password, $confirm_password);

if ($stmt->execute()) {
    echo "Registration successfully...";
} else {
    echo "Error: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
