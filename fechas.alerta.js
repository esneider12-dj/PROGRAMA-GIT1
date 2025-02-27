
let consultarFecha = document.getElementById('fecha-disponibles');

consultarFecha.addEventListener('submit', (e) => {
    e.preventDefault();
    let fechaConsulta = document.getElementById('fecha').value.trim();
    if (fechaConsulta === '') {
        Swal.fire({
            title: "Error",
            text: "Por favor, complete el campo de la fecha.",
            icon: "error",
			footer:" Esta es informacion importante"
        });
    } else {
        Swal.fire({
            title: "Consulta exitosa",
            text: `La fecha de la consulta seleccionada es: ${fechaConsulta}`,
            icon: "success",
			footer:" Esta es informacion importante."
        }).then(() => {
            document.getElementById('fecha').value = '';
        });
    }
});
