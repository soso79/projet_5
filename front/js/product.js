const apiUrl = 'http://localhost:3000/api/products';
const reponse = await fetch(apiUrl);
const sofa = await reponse.json();
const article = sofa[0];
const imageElement = document.createElement("img");
imageElement.src = article.image;
const nomElement = document.createElement("h3");
nomElement.innerText = article.nom;
const prixElement = document.createElement("p");
prixElement.innerText = `Prix: ${article.prix} €`;
const categorieElement = document.createElement("p");
categorieElement.innerText = article.categorie;

const sectionItems = document.querySelector(".items");
sectionItems.appendChild(imageElement);
sectionItems.appendChild(nomElement);
sectionItems.appendChild(prixElement);
sectionItems.appendChild(categorieElement);

