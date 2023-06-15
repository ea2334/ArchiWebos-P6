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

    fetch("http://localhost:5678/api/categories") 
      .then(response => response.json())
      .then(categories => {
        const filtersContainer = document.getElementById("filtres");

        const allFilterButton = document.createElement("button");
        allFilterButton.textContent = "Tous";
        allFilterButton.classList.add("filtres-button");
        allFilterButton.addEventListener("click", function() {
          displayWorks(works);
          updateActiveFilterButton(this);
        });
        filtersContainer.appendChild(allFilterButton);

        categories.forEach(category => {
          const filterButton = document.createElement("button");
          filterButton.textContent = category.name;
          filterButton.dataset.categoryId = category.id;
          filterButton.classList.add("filtres-button");
          filterButton.addEventListener("click", function() {
            const categoryId = this.dataset.categoryId;
            const filteredWorks = works.filter(work => work.categoryId === parseInt(categoryId));
            displayWorks(filteredWorks);
            updateActiveFilterButton(this);
          });
          filtersContainer.appendChild(filterButton);
        });
      });
  });

let modal = null;

const openModal = function (e) {
  e.preventDefault();
  modal = document.querySelector(e.target.getAttribute('href'));
  modal.style.display = null;
  modal.removeAttribute('aria-hidden');
}

  document.querySelectorAll('.js-modal').forEach(a => {
    a.addEventListener('click', openModal);
  })

  
  
