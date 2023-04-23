const urlSearchParams = new URLSearchParams(window.location.search);
const orderId = urlSearchParams.get('id');
const orderIdElement = document.getElementById("orderId");
orderIdElement.textContent = orderId;

// Sélectionner l'élément HTML pour afficher le message de remerciement
const thankYouMessageElement = document.getElementById("thankYouMessage");

// Définir le contenu du message de remerciement
thankYouMessageElement.innerHTML = `
  <h2>Merci pour votre commande !</h2>
  
`;
  
//Nettoyage du local storage :

localStorage.clear();