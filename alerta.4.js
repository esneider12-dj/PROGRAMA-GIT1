let formulario = document.getElementById('iniciar-sesion');

if (formulario) { 
    formulario.addEventListener('enviar', (e) => {
        e.preventDefault();

        let nombre = document.getElementById('usuario').value.trim();
        let password = document.getElementById('password').value.trim();

       
        if (nombre === '' || password === '') {
            Swal.fire({
                title: "Error",
                text: "Por favor, complete todos los campos para iniciar sesion",
                icon: "error",
            });
        } else {

            Swal.fire({
                title: "¡Inicio de sesion exitoso!",
                text: "Usted ha iniciado sesion correctamente.",
                icon: "success",
            }).then(() => {
				//resetear formulario
				document.getElementById('usuario').value = '';
				document.getElementById('password').value = '';
            });
        }
    });
}
