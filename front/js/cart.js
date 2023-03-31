



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
    let totalProduct = product.quantity * data.price;
    console.log(totalProduct)

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


    // Calculer le total et mettre à jour le local storage

    let totalPrice = 0;
    cartItems.forEach(function (item) {
      item.price = parseInt(item.price); // convertir le prix en nombre
      totalPrice += item.price * item.quantity;
    });
    localStorage.setItem("panier", JSON.stringify(cartItems));

    // Afficher le total dans le DOM
    const total = document.getElementById("total");
    total.textContent = `Total : ${totalPrice.toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}`;
  }



}

fetchPanier();











































































































