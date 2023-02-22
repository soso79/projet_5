fetch(`http://localhost:3000/api/products/${productId}`)
  .then(response => response.json())
  .then(selectProduct => {
    console.log(selectProduct);
    //on crée les constantes 
    const img = document.createElement("img");

    const price = document.createElement("price");

    const color = document.createElement("color");

    const description = document.createElement("description");

    

    })