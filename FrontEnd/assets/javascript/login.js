const btnSubmit = document.querySelector("#connection");

btnSubmit.addEventListener("click", function(event) {
  event.preventDefault();

  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;

  if (!email || !password) {
    document.querySelector(".error").innerHTML = 'Email ou mot de passe incorrect';
    return;
  }

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
    .catch(error => {
      console.error("Erreur lors de la requête de connexion :", error);
    });
});


    

    

     
      
    

    
  
  
  
  
      
  
  