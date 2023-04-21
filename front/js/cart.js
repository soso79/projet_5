



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
        let mapping = (cartItems.map(item => ({ id: item.id, couleur: item.couleur, quantity: item.quantity })))
        // Update the cart items in local storage
        localStorage.setItem("panier", JSON.stringify(mapping)
        );
      }

    });


    // Add event listener to delete button
    const deleteButton = cartItem.querySelector(".deleteItem");
    deleteButton.addEventListener("click", () => {
      deleteCartItem(cartItem);

      // Update the cart items in local storage
      let mapping = (cartItems.map(item => ({ id: item.id, couleur: item.couleur, quantity: item.quantity })))
      // Update the cart items in local storage
      localStorage.setItem("panier", JSON.stringify(mapping)
      );
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
document.querySelector("#order").addEventListener("click", function (event) {
  event.preventDefault();
  
// Vérifier que le panier contient au moins un produit
if (cartItems.length === 0) {
  alert("Votre panier est vide. Veuillez ajouter des produits avant de passer votre commande.");
  return;
}


  const inputForm = {
    firstName: document.querySelector("#firstName").value,
    lastName: document.querySelector("#lastName").value,
    address: document.querySelector("#address").value,
    city: document.querySelector("#city").value,
    email: document.querySelector("#email").value
  };


  const contact = {
    firstName: inputForm.firstName,
    lastName: inputForm.lastName,
    address: inputForm.address,
    city: inputForm.city,
    email: inputForm.email
  };

  const products = cartItems.map(item => item.id);

  // Afficher l'objet contact et le tableau de produits dans la console
  console.log('Objet contact :', contact);
  console.log('Tableau de produits :', products);

 // Vérifier chaque champ du formulaire
 if (!testFirstName()) {
  alert("Veuillez remplir correctement le champ 'Prénom'");
  return;
}
if (!testLastName()) {
  alert("Veuillez remplir correctement le champ 'Nom'");
  return;
}
if (!testAddress()) {
  alert("Veuillez remplir correctement le champ 'Adresse'");
  return;
}
if (!testCity()) {
  alert("Veuillez remplir correctement le champ 'Ville'");
  return;
}
if (!testEmail()) {
  alert("Veuillez remplir correctement le champ 'Email'");
  return;
}



  for (const property in inputForm) {
    if (inputForm[property] === "") {
      alert("Veuillez remplir tous les champs du formulaire avant de passer votre commande.");
      return;
    }
  }


  function testFirstName() {
    let firstNameTest = new RegExp(/^[A-Za-z][A-Za-z' -]*$/);
    console.log(firstNameTest.test(inputForm.firstName))
    if (firstNameTest.test(inputForm.firstName)) {
      document.getElementById("firstNameErrorMsg").textContent = "ok"
      return true

    } else {
      document.getElementById("firstNameErrorMsg").textContent = "veuillez remplir correctement le champs"
      return false

    }

  } 

  
  function testLastName() {
    let lastNameTest = new RegExp(/^[A-Z][a-z]*([- ][A-Z][a-z]*)?$/);
    console.log(lastNameTest.test(inputForm.lastName))
    if (lastNameTest.test(inputForm.lastName)) {
      document.getElementById("lastNameErrorMsg").textContent = "ok"
      return true

    } else {
      document.getElementById("lastNameErrorMsg").textContent = "veuillez remplir correctement le champs"
      return false

    }

  } 


  function testAddress() {
    let addressTest = new RegExp(/^[A-Za-z0-9][A-Za-z0-9' -]*$/);
    
    console.log(addressTest.test(inputForm.address))
    if (addressTest.test(inputForm.address)) {
      document.getElementById("addressErrorMsg").textContent = "ok"
      return true

    } else {
      document.getElementById("addressErrorMsg").textContent = "veuillez remplir correctement le champs"
      return false

    }

  } 

  function testCity() {
    let cityTest = new RegExp(/^[A-Za-z][A-Za-z' -]*$/);
    
    if (cityTest.test(inputForm.city)) {
      document.getElementById("cityErrorMsg").textContent = "ok"
      return true

    } else {
      document.getElementById("cityErrorMsg").textContent = "veuillez remplir correctement le champs"
      return false

    }

  } 

  function testEmail() {
    let emailTest = new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);
    console.log(emailTest.test(inputForm.email))
    if (emailTest.test(inputForm.email)) {
      document.getElementById("emailErrorMsg").textContent = "ok"
      return true

    } else {
      document.getElementById("emailErrorMsg").textContent = "veuillez remplir correctement le champs"
      return false

    }

  } 


 testFirstName();
 testLastName();
 testAddress();
 testCity();
 testEmail();

 
 

// Envoi de la commande à l'API
const requestOptions = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ contact: contact, products: products })
};

fetch('http://localhost:3000/api/products/order', requestOptions)
  .then(response => response.json())
  .then(data => {
    // Redirection vers la page Confirmation avec l'id de commande dans l'URL
    window.location.href = `confirmation.html?id=${data.orderId}`;
  })
  .catch(error => console.error(error));



});


fetchPanier();


/*



for (const property in inputForm) {
  if (inputForm[property] === "") {
    alert("Veuillez remplir tous les champs du formulaire avant de passer votre commande.");
    return;
  }
}

createOrder();
});

function createOrder() {
// récupérer les informations du formulaire
const firstName = document.getElementById('firstName').value;
const lastName = document.getElementById('lastName').value;
const address = document.getElementById('address').value;
const city = document.getElementById('city').value;
const email = document.getElementById('email').value;

// créer un objet contact
const contact = {
  firstName,
  lastName,
  address,
  city,
  email
};

// récupérer les informations de chaque produit dans le panier
const cartItems = document.querySelectorAll('.cart__item');
const products = [];

cartItems.forEach(item => {
  const id = item.dataset.id;
  const color = item.dataset.color;
  const quantity = item.querySelector('.itemQuantity').value;

  // ajouter chaque produit au tableau de produits
  products.push({
    _id: id,
    color,
    quantity
  });
});

// créer un objet qui contient le contact et le tableau de produits
const order = {
  contact,
  products
};

*/


























































































