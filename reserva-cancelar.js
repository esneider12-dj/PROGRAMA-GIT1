document.getElementById("cancelar-reserva").addEventListener("submit",(e) => {
    e.preventDefault();
       
    
        const fecha = document.getElementById("fecha").value;
        
    
        if (fecha) {
            window.location.href=("cita-cancelada.html");
        }
    });