document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("connexion");
    if (!loginForm) {
      console.error("Formulaire de connexion non trouvé.");
      return;
    }
  
    loginForm.addEventListener("submit", function(event) {
      event.preventDefault();
  
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
  
      fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      })
      .then(response => response.json())
      .then(data => {

        if (data.token) {
            localStorage.setItem("token", data.token);

            window.location.href = "index.html";
        } else {
          console.error("Échec de la connexion :", data);
        }
      })
    });
  });
  
  
  
      
  
  