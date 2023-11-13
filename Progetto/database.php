
<?php
// create a new connection
$conn = new mysqli("localhost", "username", "password", "myDB");

// check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// sql to create a table
$sql = "CREATE TABLE clienti (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    email VARCHAR(50),
    phone VARCHAR(20)
)";

if ($conn->query($sql) === TRUE) {
    echo "Table clienti created successfully";
} else {
    echo "Error creating table: " . $conn->error;
}

// sql to create a table
$sql = "CREATE TABLE staff (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL,
    email VARCHAR(50),
    phone VARCHAR(20)
)";

if ($conn->query($sql) === TRUE) {
    echo "Table staff created successfully";
} else {
    echo "Error creating table: " . $conn->error;
}

// sql to create a table
$sql = "CREATE TABLE professioni (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
)";

if ($conn->query($sql) === TRUE) {
    echo "Table professioni created successfully";
} else {
    echo "Error creating table: " . $conn->error;
}

// sql to create a table
$sql = "CREATE TABLE staff_professioni (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    staff_id INT(6) NOT NULL,
    professioni_id INT(6) NOT NULL,
    FOREIGN KEY (staff_id) REFERENCES staff(id),
    FOREIGN KEY (professioni_id) REFERENCES professioni(id)
)";

if ($conn->query($sql) === TRUE) {
    echo "Table staff_professioni created successfully";
} else {
    echo "Error creating table: " . $conn->error;
}

// sql to create a table
$sql = "CREATE TABLE hobby (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
)";

if ($conn->query($sql) === TRUE) {
    echo "Table hobby created successfully";
} else {
    echo "Error creating table: " . $conn->error;
}

// sql to create a table
$sql = "CREATE TABLE staff_hobby (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    staff_id INT(6) NOT NULL,
    hobby_id INT(6) NOT NULL,
    FOREIGN KEY (staff_id) REFERENCES staff(id),
    FOREIGN KEY (hobby_id) REFERENCES hobby(id)
)";

if ($conn->query($sql) === TRUE) {
    echo "Table staff_hobby created successfully";
} else {
    echo "Error creating table: " . $conn->error;
}

$conn->close();
?>
