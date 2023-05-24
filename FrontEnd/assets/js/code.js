fetch('http://localhost:5678/api/')
  .then(donnees => donnees.json())
  .then(lesdonnes => {
    console.log(lesdonnes); 
  }
  )

  .catch( erreur => {
    console.erreur('Une erreur s\'est produite:', erreur);
  }
  );