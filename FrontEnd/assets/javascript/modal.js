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
  
      gallery.appendChild(figure);
    });
  }

  const BtnAjout = document.querySelector("#btn-ajout");
  const ImgWork = document.querySelector("#work-image");

  BtnAjout.addEventListener("click", function() {
  ImgWork.click();
});

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







