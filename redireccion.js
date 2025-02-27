document.getElementById("iniciar-sesion").addEventListener("submit",(e) => {
    e.preventDefault();
       
    
        const usarname = document.getElementById("usarname").value;
        const password = document.getElementById("password").value;
    
        if (usarname && password) {
            window.location.href=("menu-principal.html");
        }
    });
