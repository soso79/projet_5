



// Retrieve cart items from local storage
const cartItems = JSON.parse(localStorage.getItem("panier"));

function fetchPanier() {
  cartItems.map(product => {
    return fetch(`http://localhost:3000/api/products/${product.id}`)
      .then((response) => response.json())
      .then((data) => ShowPanier(data, product))
  });
}


// Check if cart items exist in local storage


function ShowPanier(data, product) {
  if (cartItems && cartItems.length > 0) {
    // Loop through each cart item and display it on the page

    // Create a new cart item element
    const cartItem = document.createElement("article");
    cartItem.classList.add("cart__item");
    cartItem.setAttribute("data-id", product.id);
    cartItem.setAttribute("data-color", product.couleur);

    // Add cart item HTML content
    cartItem.innerHTML = `
      <div class="cart__item__img">
        <img src="${data.imageUrl}" alt="${data.name}">
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__description">
          <h2>${data.name}</h2>
          <p>${product.couleur}</p>
          <p>${data.price} €</p>
        </div>
        <div class="cart__item__content__settings">
          <div class="cart__item__content__settings__quantity">
            <p>Qté : </p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
          </div>
          <div class="cart__item__content__settings__delete">
            <p class="deleteItem">Supprimer</p>
          </div>
        </div>
      </div>
    `;

    // Add cart item to the cart section
    const cartItemsSection = document.getElementById("cart__items");
    cartItemsSection.appendChild(cartItem);
  };


}

fetchPanier();





































































































/*

const cartTotal = document.querySelector('.cart-total');

// Retrieve cart items from local storage
const cartItems = JSON.parse(localStorage.getItem("panier"));
cartItems.map(product => {
return fetch(`http://localhost:3000/api/products/${product.id}`)
.then(function (response) {
    return response.json()

})
.then((data) => console.log(data))


});
// Check if cart items exist in local storage

if (cartItems && cartItems.length > 0) {
  // Loop through each cart item and display it on the page
  cartItems.map((product) => {
    // Create a new cart item element
    const cartItem = document.createElement("article");
    cartItem.classList.add("cart__item");
    cartItem.setAttribute("data-id", product.id);
    cartItem.setAttribute("data-color", product.couleur);
    
    
    

    // Add cart item HTML content
    cartItem.innerHTML = `
      <div class="cart__item__img">
        <img src="${product.imageUrl}" alt="${product.name}">
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__description">
          <h2>${product.name}</h2>
          <p>${product.couleur}</p>
          <p>${product.price} €</p>
        </div>
        <div class="cart__item__content__settings">
          <div class="cart__item__content__settings__quantity">
            <p>Qté : </p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
          </div>
          <div class="cart__item__content__settings__delete">
            <p class="deleteItem">Supprimer</p>
          </div>
        </div>
      </div>
    `;

    // Add cart item to the cart section
    const cartItemsSection = document.getElementById("cart__items");
    cartItemsSection.appendChild(cartItem);
  });
};

*/










































































































/*
let productRegisterInLocalStorage = JSON.parse(localStorage.getItem("produit"));


// Retrieve the cart items from local storage
const cartItems = JSON.parse(localStorage.getItem("cartItems"));

// Get the cart items container
const cartItemsContainer = document.getElementById("cart__items");

// Initialize the total price and quantity
let totalPrice = 0;
let totalQuantity = 0;

// Loop through the cart items and create an article element for each item
cartItems.forEach((item) => {
  const article = document.createElement("article");
  article.classList.add("cart__item");
  article.dataset.id = item.id;
  article.dataset.color = item.color;

  const imgContainer = document.createElement("div");
  imgContainer.classList.add("cart__item__img");

  const img = document.createElement("img");
  img.src = item.imgSrc;
  img.alt = item.name;

  imgContainer.appendChild(img);
  article.appendChild(imgContainer);

  const contentContainer = document.createElement("div");
  contentContainer.classList.add("cart__item__content");

  const descriptionContainer = document.createElement("div");
  descriptionContainer.classList.add("cart__item__content__description");

  const name = document.createElement("h2");
  name.textContent = item.name;

  const color = document.createElement("p");
  color.textContent = item.color;

  const price = document.createElement("p");
  price.textContent = item.price + " €";

  descriptionContainer.appendChild(name);
  descriptionContainer.appendChild(color);
  descriptionContainer.appendChild(price);

  contentContainer.appendChild(descriptionContainer);

  const settingsContainer = document.createElement("div");
  settingsContainer.classList.add("cart__item__content__settings");

  const quantityContainer = document.createElement("div");
  quantityContainer.classList.add("cart__item__content__settings__quantity");

  const quantityLabel = document.createElement("p");
  quantityLabel.textContent = "Qté : ";

  const quantityInput = document.createElement("input");
  quantityInput.type = "number";
  quantityInput.classList.add("itemQuantity");
  quantityInput.name = "itemQuantity";
  quantityInput.min = 1;
  quantityInput.max = 100;
  quantityInput.value = item.quantity;

  quantityContainer.appendChild(quantityLabel);
  quantityContainer.appendChild(quantityInput);

  const deleteContainer = document.createElement("div");
  deleteContainer.classList.add("cart__item__content__settings__delete");

  const deleteBtn = document.createElement("p");
  deleteBtn.classList.add("deleteItem");
  deleteBtn.textContent = "Supprimer";

  deleteContainer.appendChild(deleteBtn);

  settingsContainer.appendChild(quantityContainer);
  settingsContainer.appendChild(deleteContainer);

  contentContainer.appendChild(settingsContainer);

  article.appendChild(contentContainer);

  cartItemsContainer.appendChild(article);

  // Update the total price and quantity
  totalPrice += item.price * item.quantity;
  totalQuantity += item.quantity;
});

// Update the total price and quantity display
const totalQuantityContainer = document.getElementById("totalQuantity");
const totalPriceContainer = document.getElementById("totalPrice");
totalQuantityContainer.textContent = totalQuantity;
totalPriceContainer.textContent = totalPrice.toFixed(2) + " €";
*/


















/* A ESSAYER
const panier = document.getElementById("panier");
panier.addEventListener("click", () => {
  const couleur = document.getElementById("colors").value;
  const quantity = document.getElementById("quantity").value;
  
  const addKanap = {
    quantity: quantity,
    couleur: couleur,
    id: KanapId 
  };
  
  console.log(addKanap);

  // Retrieve existing items from local storage
  let addKanapLocalStorage = JSON.parse(localStorage.getItem("panier")) || [];

  // Find the item with the same ID, color, and quantity values in the array
  const existingItem = addKanapLocalStorage.find(item => item.id === KanapId && item.couleur === couleur && item.quantity === quantity);

  if (existingItem) {
    // Item already exists in cart, increment the quantity
    existingItem.quantity = parseInt(existingItem.quantity) + parseInt(quantity);
  } else {
    // Item doesn't exist in cart, add new item to array
    addKanapLocalStorage.push(addKanap);
  }

  // Save updated array to local storage
  localStorage.setItem("panier", JSON.stringify(addKanapLocalStorage));

  // Show confirmation message
  document.getElementById("panier").textContent = "Produit ajouté !";
});
*/



