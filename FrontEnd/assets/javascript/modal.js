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