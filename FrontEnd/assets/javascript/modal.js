let modal = null;


const openModal = function (e) {
  e.preventDefault();
  const target = document.querySelector(e.target.getAttribute('href'));
  document.querySelector('.overlay').style.display = 'block';
  modal = target;

  modal.style.display = null;
  modal.removeAttribute('aria-hidden');
  modal.addEventListener('click', closeModal);
  modal.querySelector('.fermer-js').addEventListener('click', closeModal);
  modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation);
}

const openModalAjout = function (e) {
  e.preventDefault();
  const target = document.querySelector("#modal-ajout");
  document.querySelector('.overlay').style.display = 'block';
  modal = target;
  modal.style.display = null;
  modal.removeAttribute('aria-hidden');
  modal.addEventListener('click', closeModal);
  modal.querySelector('.fermer-js').addEventListener('click', closeModal);
  modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation);
}


const closeModal = function (e) {
  if (modal === null) return;
  e.preventDefault();
  document.querySelector('.overlay').style.display = 'none';
  modal.style.display = "none";
  modal.removeAttribute('aria-hidden', 'true');
  modal.removeEventListener('click', closeModal);
  modal.querySelector('.fermer-js').removeEventListener('click', closeModal);
  modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation);
  modal = null;
}

const stopPropagation = function (e) {
  e.stopPropagation()
}

  document.querySelectorAll('.js-modal').forEach(a => {
    a.addEventListener('click', openModal);
  })
  document.querySelectorAll('.ajout').forEach(a => {
    a.addEventListener('click', openModalAjout);
  })

  /* Affichage travaux modale */

  fetch("http://localhost:5678/api/works")
  .then (response => response.json())
  .then(works => {
    displayWorks(works);
  });

  function displayWorks(works) {
    const gallery = document.querySelector("#openmodal");
    gallery.innerHTML = "";
  
    works.forEach(work => {
      const figure = document.createElement("figure");
      figure.id = work.id;
  
      const imageWrapper = document.createElement("div");
      imageWrapper.classList.add("image-wrapper");
  
      const image = document.createElement("img");
      image.src = work.imageUrl;
  
      const btnSupp = document.createElement("button");
      btnSupp.classList.add("butonSupp");
      btnSupp.dataset.id = work.id;
  
      const supp = document.createElement("i");
      supp.classList.add("fa-solid", "fa-trash-can");
  
      const figcaption = document.createElement("figcaption");
      figcaption.textContent = "éditer";
  
      imageWrapper.appendChild(image);
      imageWrapper.appendChild(supp);
  
      figure.appendChild(imageWrapper);
      figure.appendChild(figcaption);
      figure.appendChild(btnSupp);
      btnSupp.appendChild(supp)
  
      gallery.appendChild(figure);
    });
  }
  
const ImageWork = document.querySelector("#work-image");
const ApercuImage = document.querySelector("#image-apercu");

ImageWork.addEventListener("change", function(event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function(e) {
    ApercuImage.src = e.target.result;
  };

  reader.readAsDataURL(file);
});

  const categorieSelect = document.querySelector("#categorie-work");

function fetchCategories() {
  fetch("http://localhost:5678/api/categories")
    .then(response => response.json())
    .then(categories => {
      categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category.id;
        option.textContent = category.name;
        categorieSelect.appendChild(option);
      });
    })
    .catch(error => {
      console.error("Erreur lors de la requête GET pour récupérer les catégories :", error);
    });
}

fetchCategories();


const retourIcone = document.querySelector('.retour');

retourIcone.addEventListener('click', function(e) {
  closeModal(e);
  openModal(e, '#modal');
  });


  /* Suppression travaux */

  function deleteWork(workId) {
    const token = localStorage.getItem('token');
    fetch(`http://localhost:5678/api/works/${workId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        if (response.ok) {
          const figure = document.querySelector(`figure[data-id="${workId}"]`);
          if (figure) {
            figure.remove();
            console.log('Travail supprimé');
          }
        } 
        else {
          console.error('Erreur lors de la suppression du travail');
        }
      })
      .catch(error => {
        console.error('Erreur lors de la requête de suppression :', error);
      });
  }
  
  
  

/*Ajout Travaux*/

const workForm = document.getElementById('work-form');
const titre = document.getElementById('titre-work');
const categorieId = document.getElementById('categorie-work');
const imageFile = document.getElementById('image');
const submit = document.getElementById('submit');


submit.addEventListener('click', (e) => {
  e.preventDefault();

const token = localStorage.getItem('token');
const formData = new FormData();
formData.append('title', titre.value);
formData.append('category', categorieId.value);
formData.append('image', imageFile.files[0]);

  fetch('http://localhost:5678/api/works', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: formData
  })
    .then(response => response.json())
    .then(works => {
      displayWorks(works);
      closeModal(e);
    })
    .catch(error => {
      console.error('Erreur lors de l\'ajout du travail :', error);
    });
});


/* Affichage image télechargement */

const inputImage = document.getElementById('image');
const labelImage = document.querySelector('.image-travaux label');
const telechargement = document.querySelector('.telecharger');

const imageApercu = document.createElement('img');
imageApercu.setAttribute('id', 'image-apercu');
imageApercu.style.maxWidth = '200px';
imageApercu.style.maxHeight = '100%';
imageApercu.style.marginLeft = '110px';

inputImage.addEventListener('change', (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = () => {
    imageApercu.src = reader.result;
    imageApercu.style.display = 'block'; 
    labelImage.style.display = 'none'; 

    while (telechargement.firstChild) {
      telechargement.removeChild(telechargement.firstChild);
    }

    telechargement.appendChild(imageApercu);
  };

  if (file) {
    reader.readAsDataURL(file);
  } else {
    imageApercu.src = '';
    imageApercu.style.display = 'none';
    labelImage.style.display = 'block';
  }
});




















