



// Retrieve cart items from local storage
let cartItems = JSON.parse(localStorage.getItem("panier")) || [];


function fetchPanier() {
  cartItems.map(product => {
    return fetch(`http://localhost:3000/api/products/${product.id}`)
      .then((response) => response.json())
      .then((data) => ShowPanier(data, product))

  });
}


function ShowPanier(data, product) {

  if (cartItems && cartItems.length > 0) {
    /*
    let totalProduct = product.quantity * data.price;
    console.log(totalProduct)*/

    // Loop through each cart item and display it on the page

    // Create a new cart item element
    const cartItem = document.createElement("article");
    cartItem.classList.add("cart__item");
    cartItem.setAttribute("data-id", product.id);
    cartItem.setAttribute("data-color", product.couleur);

    // Calculate the total price for this product
    const totalProduct = product.quantity * data.price;


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
    //ici on update la quantité et le total en conséquence
    let quantityInput = cartItem.querySelector(".itemQuantity")
    quantityInput.addEventListener("change", () => {
      let newQuantity = parseInt(quantityInput.value);
      let totalPrice = newQuantity * data.price;

      // Check if the total quantity of products in the cart is between 1 and 100
      let totalQuantity = 0;
      cartItems.forEach((item) => {
        totalQuantity += item.quantity;
      });
      totalQuantity -= product.quantity;
      totalQuantity += newQuantity;
      if (totalQuantity < 1 || totalQuantity > 100) {
        quantityInput.value = product.quantity;
        alert("La quantité totale des produits dans le panier doit être comprise entre 1 et 100.");
        return;
      }

      // Update the quantity in the cartItems array in local storage
      const index = cartItems.findIndex(item => item.id === product.id && item.couleur === product.couleur);

      if (index !== -1) {
        cartItems[index].quantity = newQuantity;
        cartItems[index].totalPrice = totalPrice;

        // Update the quantity in the DOM
        updateCartItemQuantity(cartItem, newQuantity);

        // Recalculate the total and update the DOM
        updateTotal();

        // Update the cart items in local storage
        localStorage.setItem("panier", JSON.stringify(cartItems.map(item => ({ id: item.id, couleur: item.couleur, quantity: item.quantity }))));
      }

    });


    // Add event listener to delete button
    const deleteButton = cartItem.querySelector(".deleteItem");
    deleteButton.addEventListener("click", () => {
      deleteCartItem(cartItem);

      // Update the cart items in local storage
      localStorage.setItem("panier", JSON.stringify(cartItems.map(item => ({ id: item.id, couleur: item.couleur, quantity: item.quantity }))));
    });

    // Add cart item to the cart section
    const cartItemsSection = document.getElementById("cart__items");
    cartItemsSection.appendChild(cartItem);

    // Add the total price for this product to the running total
    product.price = parseInt(product.price); // convert the price to a number
    product.totalPrice = totalProduct;
    // Calculate and update the total
    updateTotal();
  }

}

function deleteCartItem(cartItem) {
  // Get the ID and color of the item to delete
  const id = cartItem.getAttribute("data-id");
  const color = cartItem.getAttribute("data-color");

  // Remove the item from the cartItems array
  cartItems = cartItems.filter(item => item.id !== id || item.couleur !== color);

  // Remove the item from the DOM
  cartItem.remove();
  // Recalculate the total and update local storage and DOM
  updateTotal();

}

function updateCartItemQuantity(cartItem, quantity) {
  const quantityInput = cartItem.querySelector(".itemQuantity");
  quantityInput.value = quantity;
}

function updateTotal() {
  let totalPrice = 0;

  // Calculate the total price for all cart items
  cartItems.forEach(item => {
    totalPrice += item.totalPrice;
  });

  // Display the total price in the DOM
  const totalElement = document.getElementById("total");
  totalElement.textContent = `Total : ${totalPrice.toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}`;
}


fetchPanier();
































































































