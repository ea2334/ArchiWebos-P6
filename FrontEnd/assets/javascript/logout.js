function deconnexion() {
    localStorage.removeItem("token");
    window.location.href = "login.html";
  }
  
  const boutonDeconnexion = document.querySelector('.logout');
  
  boutonDeconnexion.addEventListener("click", function(event) {
    event.preventDefault();
    if (event.target.classList.contains('logout')) {
      deconnexion();
    }
  });
  
  function log() {
    const logout = document.querySelector(".logout");
    const login = document.querySelector(".login");
  
    if (localStorage.getItem('token')) {
      logout.style.display = "block";
      login.style.display = "none";
    } else {
      logout.style.display = "none";
      login.style.display = "block";
    }
  }
  
  log();
  
  