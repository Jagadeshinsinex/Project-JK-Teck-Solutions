<?php
$email = $_POST['email'] ?? null;
$password = $_POST['password'] ?? null;
$confirm_password = $_POST['confirm_password'] ?? null;

// Simple validation to check if any of the fields are empty
if (empty($email) || empty($password) || empty($confirm_password)) {
    echo "All fields are required.";
    exit(); // Stop the script execution if any field is empty
}

// Database connection
$conn = new mysqli('localhost', 'root', '', 'Registration');

if ($conn->connect_error) {
    echo "$conn->connect_error";
    die("Connection Failed: " . $conn->connect_error);
} 

// Check if the email already exists in the database
$stmt = $conn->prepare("SELECT * FROM registration WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();
if ($result->fetch_assoc()) {
    echo "This email is already registered.";
    exit(); // Stop the script if the email is found in the database
}

// Proceed with registration if the email does not exist
$stmt = $conn->prepare("INSERT INTO registration (email, password, confirm_password) VALUES (?, ?, ?)");
if ($stmt === false) {
    die("Error preparing statement: " . $conn->error);
}

// Bind the variables to the statement as parameters
$stmt->bind_param("sss", $email, $password, $confirm_password);

// Execute the statement
if ($stmt->execute()) {
    echo "Registration successfully...";
} else {
    echo "Error: " . $stmt->error;
}

// Close statement and connection
$stmt->close();
$conn->close();
?>
