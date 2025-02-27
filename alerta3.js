let formulario = document.getElementById('mi-formulario');

if (formulario) { 
    formulario.addEventListener('submit', (e) => {
        e.preventDefault();

        let nombre = document.getElementById('nombre').value.trim();
        let email = document.getElementById('email').value.trim();
        let password = document.getElementById('password').value.trim();

        if (nombre === '' || email === '' || password === '') {
            Swal.fire({
                title: "Error",
                text: "Por favor, complete todos los campos.",
                icon: "error",
            });
        } else {
            Swal.fire({
                title: "¡Registro exitoso!",
                text: "Usted se ha registrado correctamente.",
                icon: "success",
            }).then(() => {
                // Resetear formulario
                document.getElementById('nombre').value = '';
                document.getElementById('password').value = '';
                document.getElementById('email').value = '';
                document.getElementById('date').value = ''; 
            });
        }
    });
}