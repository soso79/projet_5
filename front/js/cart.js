



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
    let updateInput = cartItem.querySelector(".itemQuantity")
    updateInput.addEventListener("change", () => {
      let newQuantity = parseInt(updateInput.value, 10);
      let totalPrice = newQuantity * data.price;

      product.quantity = newQuantity;
      product.totalPrice = totalPrice;

      // Update the quantity in the cartItems array in local storage
      const index = cartItems.findIndex(item => item.id === product.id && item.couleur === product.couleur);
      
      if (index !== -1) {
        cartItems[index].quantity = newQuantity;
        cartItems[index].totalPrice = totalPrice;
       
        
      }

      
      // Recalculate the total and update the DOM
      updateTotal();


      // Store the updated cartItems array in localStorage
  const cartItemsForStorage = cartItems.map(item => {
    return { id: item.id, couleur: item.couleur, quantity: item.quantity }
  });
  localStorage.setItem("panier", JSON.stringify(cartItemsForStorage));
      

    });

    // Add event listener to delete button
    const deleteButton = cartItem.querySelector(".deleteItem");
    deleteButton.addEventListener("click", () => {
      deleteCartItem(cartItem);
    });


    // Add cart item to the cart section
    const cartItemsSection = document.getElementById("cart__items");
    cartItemsSection.appendChild(cartItem);

    // Add the total price for this product to the running total
    product.price = parseInt(product.price); // convert the price to a number
    product.totalPrice = totalProduct;
  }
  // Calculate and update the total
  updateTotal();

}

function updateTotal() {
  // Calculer le total et mettre à jour 

  let totalPrice = 0;
  cartItems.forEach(function (item) {
    totalPrice += item.totalPrice;
    /* item.price = parseInt(item.price); // convertir le prix en nombre
     totalPrice += item.price * item.quantity;*/
  });

  // Afficher le total dans le DOM
  const totalElement = document.getElementById("total");
  totalElement.textContent = `Total : ${totalPrice.toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}`;

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

  // Update the cart items in local storage
  localStorage.setItem("panier", JSON.stringify(cartItems));

}



fetchPanier();
































































































