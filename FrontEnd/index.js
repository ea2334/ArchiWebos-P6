fetch("http://localhost:5678/api/works")
      .then(response => response.json())
      .then(data => {

        const gallery = document.querySelector(".gallery");
        data.forEach(work => {

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
      })


  
  




