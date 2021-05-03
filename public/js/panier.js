const apiUrl = "http://localhost:3000/api/teddies";

    if (0 >= localStorage.length) {
        let panierVide = document.getElementById("panierVide");
        panierVide.classList.remove("hidden")
        let panierVideBis = document.getElementById("panierVideBis");
        panierVideBis.classList.remove("hidden")
        let iconPanierVide = document.getElementById("iconPanierVide");
        iconPanierVide.classList.remove("hidden")
    } else {
        let I = localStorage.length;
        let prixTotalPanier = 0;
        let panierPlein = document.getElementById("panierPlein");
        panierPlein.classList.remove("visually-hidden")
        for (let i = 0; i < I; i++) {

            let e = localStorage.key(i);
            fetch(apiUrl + `/${e}` )
            .then(res => res.json())
            .then(data => {
            
            let e = localStorage.key(i);
            let QuantiteProduit = parseInt(localStorage.getItem(e));
            prixTotalPanier = prixTotalPanier += data.price * QuantiteProduit / 100;
            
            let ligneTableau = document.createElement("tr");

            let tdProduit = document.createElement("td");
            tdProduit.innerHTML = data.name;
            let tdPrixUnite = document.createElement("td");
            tdPrixUnite.innerHTML = data.price / 100;
            let tdQuantité = document.createElement("td");
            tdQuantité.innerHTML = QuantiteProduit;
            let tdPrixTotal = document.createElement("td");
            tdPrixTotal.innerHTML = data.price * QuantiteProduit / 100;
            let tdSuprimmer = document.createElement("td");
            let tdBtn = document.createElement("button");
            tdBtn.classList.add("btn", "btn-danger", "fts");
            tdBtn.setAttribute("id", e)
            let tdIcon = document.createElement("i");
            tdIcon.classList.add("fas", "fa-trash-alt");
            
            


            tdBtn.appendChild(tdIcon);

            tdSuprimmer.appendChild(tdBtn);

            ligneTableau.appendChild(tdProduit);
            ligneTableau.appendChild(tdPrixUnite);
            ligneTableau.appendChild(tdQuantité);
            ligneTableau.appendChild(tdPrixTotal);
            ligneTableau.appendChild(tdSuprimmer);
            
            let tableau = document.getElementById("tablePanier");
            tableau.appendChild(ligneTableau);
            
            
            let totalPrixPanier = document.getElementById("totalPrixPanier");
            totalPrixPanier.innerHTML = prixTotalPanier;

            let btnId = document.getElementById(e);
            btnId.addEventListener('click',  function () {
                localStorage.removeItem(e)
                tableau.removeChild(ligneTableau);
                prixTotalPanier = prixTotalPanier - data.price * QuantiteProduit / 100;
                totalPrixPanier.innerHTML = prixTotalPanier;
                if (0 >= localStorage.length) {
            
                    let panierPlein = document.getElementById("panierPlein");
                    panierPlein.classList.add("hidden");
                    panierVide.classList.remove("hidden");
                    panierVideBis.classList.remove("hidden");
                    iconPanierVide.classList.remove("hidden");
                }
            });
        })
        .catch(
            function(error){ alert("Erreur : Veuillez réessayer plus tard \n" + error); // ici on vient rajouter une erreur si jamais la fonction ne fonctionne pas
        });
    }};
    // Creation de la requete post en utilisant fetch
    // initialisation 
    let contact = {};
    let products = [];
    // recuperation du formulaire + ecoute au submit
    let formulaireClient = document.getElementById("formClient");
    formulaireClient.addEventListener('submit', function (e) {
        e.preventDefault();
        contact = {
            firstName: formulaireClient.elements.prenom.value,
            lastName: formulaireClient.elements.nom.value,
            address: formulaireClient.elements.adresse.value,
            city: formulaireClient.elements.ville.value,
            email: formulaireClient.elements.email.value,
        };
        // on ajoute dans le tableau products, chaque id de produits trouver dans le localStorage
        for (let i = 0; i < localStorage.length; i++) {
            products.push(localStorage.key(i));
        }
        // envoi au server avec fetch en passant par la methode post
        fetch(apiUrl + "/order", {
            method: 'POST', 
            headers: {"content-type": 'application/json'}, 
            body: JSON.stringify({contact, products
            })
        })
        .then(res => res.json())
        .then(data => {
            
            let prixTotal = totalPrixPanier.innerHTML;
            localStorage.clear();
            localStorage.setItem("orderId", `${data.orderId}`);
            localStorage.setItem("prixTotal", `${prixTotal}`)
            window.location.assign("./commande.html");
           
        })
    });
    