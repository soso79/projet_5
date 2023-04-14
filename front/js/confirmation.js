const urlSearchParams = new URLSearchParams(window.location.search);
const orderId = urlSearchParams.get('id');
const orderIdElement = document.getElementById("orderId");
orderIdElement.textContent = orderId;


  
//Nettoyage du local storage :

localStorage.clear();