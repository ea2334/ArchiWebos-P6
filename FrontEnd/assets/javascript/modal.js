let modal = null;

const openModal = function (e) {
  e.preventDefault();
  modal = document.querySelector(e.target.getAttribute('href'));
  modal.style.display = null;
  modal.removeAttribute('aria-hidden');
  modal = target
  modal.addEventListener('click', closeModal)
  modal.querySelector('.fermer-js').addEventListener('click', closeModal);
}

const closeModal = function (e) {
    if (modal === null) return
  e.preventDefault();
  modal.style.display = "none";
  modal.removeAttribute('aria-hidden', 'true');
  modal.removeEventListener('click', closeModal);
  modal.querySelector('.fermer-js').removeEventListener('click', closeModal);
  modal = null
}


  document.querySelectorAll('.js-modal').forEach(a => {
    a.addEventListener('click', openModal);
  })

  
  fetch("http://localhost:5678/api/works")
  .then(response => response.json())
  .then(works => {
    displayWorks(works); 

    function displayWorks(works) {
      const gallery = document.querySelector(".gallery");
      gallery.innerHTML = "";

      works.forEach(work => {
        const figure = document.createElement("figure");
        const image = document.createElement("img");
        image.src = work.imageUrl;
        image.alt = work.title;
        const figcaption = document.createElement("figcaption");
        figcaption.textContent = work.title;
        figure.appendChild(image);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);
      });
    }
});