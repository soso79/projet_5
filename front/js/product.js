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
const panier = document.getElementById("panier");
panier.addEventListener("click", () => {
  const addKanap = {
    quantity: document.getElementById("quantity").value,
    couleur: document.getElementById("colors").value,
    id: KanapId 
  };
  console.log(addKanap);

  //  confirmation message
  document.getElementById("panier").textContent = "Produit ajouté !";

  // Retrieve existing items from local storage
  let addKanapLocalStorage = JSON.parse(localStorage.getItem("panier")) || [];

  // Add new item to array
  addKanapLocalStorage.push(addKanap);

  // Save updated array to local storage
  localStorage.setItem("panier", JSON.stringify(addKanapLocalStorage));
});



/*
const lStorage = JSON.parse(localStorage.getItem("addToCart"));
    addKanapLocalStorage = []
    console.log(lStorage)
    if (lStorage === null){
        alert("lsvide")
        addKanapLocalStorage.push(addToCart)
        window.localStorage.setItem("addToCart" , JSON.stringify(addKanapLocalStorage))
        
    //sinon on push les kanap 
    }else{
        alert("ls rempli")
        addKanapLocalStorage.push(addKanap)
        window.localStorage.setItem("addToCart", JSON.stringify(addKanapLocalStorage))
    
    }

*/











    /*
    //ici on definit le tableau dans le localstorage,si le panier n est pas nul on ecrit dans le localstorage en fesant un push
    addKanapLocalStorage = []
    if (localStorage.getItem("addToCart") !== null) {
        addKanapLocalStorage = JSON.parse(localStorage.getItem("addToCart"))
        addKanapLocalStorage.push(addToCart)
        localStorage.setItem("addTocart", JSON.stringify(addKanapLocalStorage))
        //sinon on push les kanap 
    } else {
        addKanapLocalStorage.push(addKanap)
        localStorage.setItem("addToCart", JSON.stringify(addKanapLocalStorage))

    }
    */






getKanap()
