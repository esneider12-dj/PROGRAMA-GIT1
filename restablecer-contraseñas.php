<?php
error_reporting(E_ALL);

$host = "localhost";
$dbname = "usuarios_petcare";
$usuario = "root";
$contraseña = "";

$opciones = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

// Crea el objeto PDO
try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $usuario, $contraseña, $opciones);
} catch (PDOException $e) {
    echo json_encode(array("exito" => false, "mensaje" => "Error de conexión: " . $e->getMessage()));
    exit;
}

// Recibe datos del formulario
$data = json_decode(file_get_contents('php://input'), true);

$usuario = $data['usuario'];
$nuevaContrasena = $data['nuevaContraseña'];

// Actualiza la contraseña
$sentencia = $pdo->prepare("UPDATE usuarios SET password = :nuevaContraseña WHERE nombre = :usuario");
$sentencia->bindParam(":usuario", $usuario, PDO::PARAM_STR);
$sentencia->bindParam(":nuevaContraseña", $nuevaContraseña, PDO::PARAM_STR);
$sentencia->execute();

// Verifica resultado
if ($sentencia->rowCount() > 0) {
    $respuesta = array("exito" => true, "mensaje" => "Contraseña actualizada correctamente.");
} else {
    $respuesta = array("exito" => false, "mensaje" => "No se pudo actualizar la contraseña.");
}

// Cierra la conexión
$pdo = null;

// Devuelve la respuesta en JSON
echo json_encode($respuesta);
?>