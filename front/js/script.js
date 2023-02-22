 // Sélection de l'emplacement dans lequel on va afficher nos produits, sur la page d'accueil. Ici dans la section avec l'id "items".
const sectionItems = document.querySelector('#items');
// On récupère toutes les données de l'api et on ajoute la constante listOfKanap
fetch("http://localhost:3000/api/products")
  .then(response => response.json())
  .then(data => {
	
	for ( products of data){
		const createLink = document.createElement('a');
		 createLink.href = "./product.html?id=" + products._id;
		 sectionItems.appendChild(createLink);




		const createArticle = document.createElement('article');
		createLink.appendChild(createArticle);
		

		const createName = document.createElement('h3');
		createName.innerText = products.name;
		 createArticle.appendChild(createName);

		 const createImage = document.createElement('img');
		createImage.src = products.imageUrl;
		createImage.alt = products.altTxt;
		 createArticle.appendChild(createImage);

		 const createDescription = document.createElement('p');
		createDescription.innerText = products.description;
		 createArticle.appendChild(createDescription);

		 

		
		
		

	}

  })
    

