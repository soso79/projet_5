



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



















/*
// Get the cart items container element
const cartItemsContainer = document.getElementById('cart-items');

// Get the items from local storage and parse the JSON string
const cartItems = JSON.parse(localStorage.getItem('panier'));

// Loop through the items array and create HTML elements for each item
cartItems.forEach(item => {
  // Create a div element to hold the item details
  const itemDiv = document.createElement('div');
  itemDiv.classList.add('cart-items');

  // Create an image element for the item
  const itemImg = document.createElement('img');
  itemImg.src = item.image;
  itemImg.alt = item.name;
  itemDiv.appendChild(itemImg);

  // Create a p element for the item name
  const itemName = document.createElement('p');
  itemName.textContent = item.name;
  itemDiv.appendChild(itemName);

  // Create a p element for the item price
  const itemPrice = document.createElement('p');
  itemPrice.textContent = `$${item.price}`;
  itemDiv.appendChild(itemPrice);

  // Append the item div to the cart items container
  cartItemsContainer.appendChild(itemDiv);
});

   */ 




