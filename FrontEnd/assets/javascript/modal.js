let modal = null;

const openModal = function (e) {
  e.preventDefault();
  const target = document.querySelector(e.target.getAttribute('href'))
  modal = document.querySelector(e.target.getAttribute('href'));
  modal.style.display = null;
  modal.removeAttribute('aria-hidden');
  modal = target 
  modal.addEventListener('click', closeModal)
  modal.querySelector('.fermer-js').addEventListener('click', closeModal);
  modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation);
}

const closeModal = function (e) {
    if (modal === null) return
  e.preventDefault();
  modal.style.display = "none";
  modal.removeAttribute('aria-hidden', 'true');
  modal.removeEventListener('click', closeModal);
  modal.querySelector('.fermer-js').removeEventListener('click', closeModal);
  modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation);
  modal = null
}

const stopPropagation = function (e) {
  e.stopPropagation()
}

  document.querySelectorAll('.js-modal').forEach(a => {
    a.addEventListener('click', openModal);
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

      const image = document.createElement ("img");
      image.src = work.imageUrl;

      const btnSupp = document.createElement ("button");
      btnSupp.classList.add("butonSupp");

      btnSupp.dataset.id = work.id;

      const supp = document.createElement ("i");
      supp.classList.add("fa-solid", "fa-trash-can");

      image.alt = work.title;
      const figcaption = document.createElement("figcaption");
      figcaption.textContent = work.title;
      figure.appendChild(image);
      figure.appendChild(figcaption);
      figure.appendChild(btnSupp);
      btnSupp.appendChild(supp);
      gallery.appendChild(figure);
    });
  }
  
