<?php
header('Content-Type: application/json');
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "frontend";

// Crear la conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Error al conectarse a la base de datos: " . $conn->connect_error);
}

// Obtener el correo y la contraseña del POST
$correo = $request->email;
$contraseña = $request->password;

// Consultar si el correo y la contraseña existen en la tabla de usuarios
$sql = "SELECT * FROM usuario WHERE email = '$correo' AND contraseña = '$contraseña'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $nombre = $row['nombre'];
    echo json_encode(array('message' => "¡Bienvenido $nombre!"));
} else {
    echo json_encode(array('message' => 'El correo o la contraseña son incorrectos'));
}

$conn->close();
?>
