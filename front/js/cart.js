


    const panierData = localStorage.getItem('panier');
    const panier = JSON.parse(panierData);
    const panierElement = document.getElementById('panier');
    panier.forEach((article)=>{
        const articleElement = document.createElement('li');
        articleElement.textContent = `${article.description} - ${article.price}€ - ${article.img}`;
        panierElement.appendChild(articleElement);

    });




