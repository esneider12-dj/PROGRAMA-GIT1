let generarContrasena = document.getElementById('generar-contraseña');
let numeroAleatorio;

generarContrasena.addEventListener('click', () => {
    Swal.fire({
        title: 'Ingrese su nombre con el que se registro en la base de datos.',
        input: 'text',
        inputPlaceholder: 'Nombre',
        showCancelButton: true,
        confirmButtonText: 'Continuar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.value) {
            let nombre = result.value.trim();

            if (nombre === '') {
                Swal.fire({
                    title: 'Error',
                    text: 'El nombre no puede estar vacío',
                    icon: 'error'
                });
                return;
            }

            // Verifica si el nombre existe en la base de datos
            verificarNombre(nombre);
        }
    });
});

function verificarNombre(nombre) {
    fetch('actualizar-contraseña.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre })
    })
    .then(respuesta => {
        if (!respuesta.ok) {
            throw new Error('Error en la respuesta del servidor');
        }
        return respuesta.json();
    })
    .then(datos => {
        if (datos.exito) {
            adivinanza(nombre);
        } else {
            Swal.fire({
                title: 'Error',
                text: 'El nombre ingresado no existe en la base de datos. Verifique e intente nuevamente.',
                icon: 'error'
            });
        }
    })
    .catch(error => {
        console.error('Error:', error);
        Swal.fire({
            title: 'Error',
            text: 'Hubo un problema con la solicitud. Por favor, inténtelo más tarde.',
            icon: 'error'
        });
    });
}

function adivinanza(nombre) {
    numeroAleatorio = Math.floor(Math.random() * 5) + 1;
    console.log('Número aleatorio:', numeroAleatorio); 

    manejarIntento(nombre);
}

function manejarIntento(nombre) {
    Swal.fire({
        title: 'Adivine un número del 1 al 5',
        input: 'number',
        showCancelButton: true,
        confirmButtonText: 'Adivinar',
        cancelButtonText: 'Cancelar',
        inputValidator: (value) => {
            if (value < 1 || value > 5) {
                return 'Por favor, ingrese un número entre 1 y 5';
            }
        }
    }).then((respuesta) => {
        if (respuesta.value) {
            let adivinanzaUsuario = parseInt(respuesta.value);

            if (adivinanzaUsuario === numeroAleatorio) {
                Swal.fire({
                    title: '¡Felicitaciones!',
                    text: 'Ha adivinado el número correctamente',
                    icon: 'success'
                }).then(() => {
                    let nuevaContrasena = generarContrasenaAleatoria(7);
                    Swal.fire({
                        title: 'Nueva contraseña',
                        text: 'Su nueva contraseña es: ' + nuevaContrasena,
                        icon: 'info'
                    }).then(() => {
                        actualizarContrasena(nombre, nuevaContrasena);
                    });
                });
            } else {
                let mensaje;
                let icono;

                if (adivinanzaUsuario < numeroAleatorio) {
                    mensaje = 'El número es más grande. Intente de nuevo.';
                    icono = 'error';
                } else {
                    mensaje = 'El número es más pequeño. Intente de nuevo.';
                    icono = 'error';
                }

                // Verifica que si este cerca del número correcto
                if (Math.abs(adivinanzaUsuario - numeroAleatorio) === 1) {
                    mensaje += ' ¡Estás muy cerca!';
                    icono = 'fire';
                }

                Swal.fire({
                    title: 'Incorrecto',
                    text: mensaje,
                    icon: 'error',
                }).then(() => {
                    manejarIntento(nombre);
                });
            }
        }
    });
}

function generarContrasenaAleatoria(longitud) {
    let caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; 
    let nuevaContrasena = ''; 
    for (let i = 0; i < longitud; i++) {
        nuevaContrasena += caracteres.charAt(Math.floor(Math.random() * caracteres.length)); 
    }
    return nuevaContrasena; 
}

function actualizarContrasena(nombre, nuevaContrasena) {
    console.log('Datos enviados:', { nombre, nuevaContrasena });
    fetch('actualizar-contraseña.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre, nuevaContrasena })
    })
    .then(respuesta => {
        if (!respuesta.ok) {
            throw new Error('Error en la respuesta del servidor');
        }
        return respuesta.json();
    })
    .then(datos => {
        if (datos.exito) {
            Swal.fire({
                title: 'Contraseña actualizada',
                html: 'Su contraseña ha sido actualizada correctamente.<br>Será redirigido/a a la página de inicio de sesión.',
                icon: 'success'
            }).then(() => {
                window.location.href = 'formulario-inicio.html';
            });
        } else {
            Swal.fire({
                title: 'Error',
                text: datos.mensaje,
                icon: 'error'
            });
        }
    })
    .catch(error => {
        console.error('Error en la solicitud:', error);
        Swal.fire({
            title: 'Error',
            text: 'Hubo un problema con la solicitud. Por favor, inténtelo más tarde.',
            icon: 'error'
        });
    });
}