function deconnexion() {
    localStorage.removeItem("token");
    window.location.href = "login.html";
}

const boutonDeconnexion = document.querySelector('#boutonDeconnexion');

boutonDeconnexion.addEventListener("click", function(event) {
    event.preventDefault();
    if (event.target.id === 'boutonDeconnexion') {
        deconnexion();
    }
});

function log(){
    const logout = document.getElementById("logout_visible");
    const login = document.getElementById("login_visible");

    if(localStorage.getItem('token')) {
        logout.style.display = "flex";
        login.style.display = "none";
    }
    else{
        logout.style.display = "none";
        login.style.display = "flex";
    }
}

log();