/*
//ici je commence par déclarer ma variable pour récupérer l id du canapé sélectionné
const url = new URL(location.href);
const productsId = url.searchParams.get("id");

fetch(`http://localhost:3000/api/products/${productsId}`)
  .then(response => response.json())
  .then(selectProduct => {
    console.log(selectProduct);
     //pour l instant on recupére bien les infos dans le log
    

    });
    
    
    */



const browse = new URL(document.location).searchParams
const KanapId = browse.get("id")

const url = `http://localhost:3000/api/products/${KanapId}`

const getKanap = () => {
    fetch(url)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            const title = (document.getElementById("title").textContent = data.name)
            const price = (document.getElementById("price").textContent = data.price)
            const description = (document.getElementById("description").textContent = data.description)
            //ici on crée l image
            const img = document.querySelector(".item__img");
            const createImage = document.createElement('img');
            createImage.src = data.imageUrl;
            createImage.alt = data.altTxt;
            img.appendChild(createImage);

            //ici on crée la boucle pour les couleurs 
            for (let couleur of data.colors) {
                const paint = document.getElementById("colors");
                const elementCouleur = document.createElement("option");
                paint.appendChild(elementCouleur);
                elementCouleur.textContent = couleur;

            }
        })

}

//ici on crée notre panier 
const addToCart = document.getElementById("addToCart")
addToCart.addEventListener("click", () =>{
    
    const addKanap ={
        quantity: document.getElementById("quantity").value,
        couleur: document.getElementById("colors").value,
        id: KanapId
        
    }
console.log(addKanap)
// avoir , pour l instant ça ne revient pas a zéro
document.getElementById('addToCart').textContent = 'Produit ajouté !';
})






getKanap()
