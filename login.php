<?php
// Start or resume a session
session_start();

$email = $_POST['email'] ?? null;
$password = $_POST['password'] ?? null;

if (empty($email) || empty($password)) {
    echo "Both email and password are required.";
    exit();
}

// Database connection
$conn = new mysqli('localhost', 'root', '', 'Registration');

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Prepare SQL statement to protect against SQL injection
$stmt = $conn->prepare("SELECT * FROM registration WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

// Verify if a user exists with the provided email
if ($user = $result->fetch_assoc()) {
    // Assuming the password in your database is stored securely (e.g., hashed with password_hash())
    // Here we're directly comparing, but you should use password_verify() in real applications
    if ($password == $user['password']) {
        // Successful login
        $_SESSION['user_email'] = $email; // Store the email in session to track the user's login status
        echo "Login successful.";
        // Redirect to a logged-in page or dashboard
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
