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

// Preparar los datos para la inserción
$nombres = $request->names;
$apellidos = $request->lastnames;
$correo = $request->email;
$contraseña = $request->password;

// Verificar si el correo ya está registrado
$sql_select = "SELECT * FROM usuario WHERE email='$correo'";
$result_select = $conn->query($sql_select);

if ($result_select->num_rows > 0) {
    // El correo ya está registrado, enviar mensaje de error
    echo json_encode(array('message' => 'El correo ya está registrado'));
} else {
    // Ejecutar la consulta de inserción
    $sql_insert = "INSERT INTO usuario (nombre, apellido, email, contraseña) VALUES ('$nombres','$apellidos','$correo', '$contraseña')";
    if ($conn->query($sql_insert) === TRUE) {
        echo json_encode(array('message' => '¡Listo! Ahora inicia sesión'));
    } else {
        echo json_encode(array('message' => 'Error al insertar datos: ' . $conn->error));
    }
}

$conn->close();
?>
