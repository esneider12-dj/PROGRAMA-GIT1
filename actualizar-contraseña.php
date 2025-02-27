<?php
error_reporting(E_ALL);

$host = "localhost";
$dbname = "usuarios_petcare";
$usuario_db = "root";
$contraseña_db = "";

$opciones = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

header('Content-Type: application/json'); 

// Crear objeto PDO
try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $usuario_db, $contraseña_db, $opciones);
} catch (PDOException $e) {
    echo json_encode(array("exito" => false, "mensaje" => "Error de conexión: " . $e->getMessage()));
    exit;
}

try {
    // Recibir datos del formulario
    $data = json_decode(file_get_contents('php://input'), true);

    // Verificar que los datos estén completos
    if (!isset($data['nombre'])) {
        throw new Exception("Datos incompletos");
    }

    $nombre = $data['nombre'];

    // Verificar si el nombre existe
    $sql_verificar_usuario = "SELECT * FROM usuarios WHERE nombre = :nombre";
    $stmt = $pdo->prepare($sql_verificar_usuario);
    $stmt->bindParam(':nombre', $nombre);
    $stmt->execute();
    $resultado = $stmt->fetch();

    if (!$resultado) {
        throw new Exception("Usuario no encontrado");
    }

  
    if (isset($data['nuevaContrasena'])) {
        $nuevaContrasena = $data['nuevaContrasena']; 

        $sql_actualizar_contrasena = "UPDATE usuarios SET password = :nuevaContrasena WHERE nombre = :nombre";
        $stmt = $pdo->prepare($sql_actualizar_contrasena);
        $stmt->bindParam(':nuevaContrasena', $nuevaContrasena);
        $stmt->bindParam(':nombre', $nombre);

        if ($stmt->execute()) {
            echo json_encode(array("exito" => true, "mensaje" => "Contraseña actualizada correctamente"));
        } else {
            throw new Exception("No se pudo actualizar la contraseña");
        }
    } else {
        echo json_encode(array("exito" => true, "mensaje" => "No se solicitó actualización de contraseña"));
    }
} catch (Exception $e) {
    echo json_encode(array("exito" => false, "mensaje" => $e->getMessage()));
}
?>
