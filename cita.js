document.getElementById("reservar-cita").addEventListener("submit",(e) => {
    e.preventDefault();
       
    
        const fecha = document.getElementById("fecha").value;
        
    
        if (fecha) {
            window.location.href=("Reserva-confirmada.html");
        }
    });
