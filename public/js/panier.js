const apiUrl = "http://localhost:3000/api/teddies";
import {
    nmbpp,
    rechercheProduitStorage,
 } from "./utils.js";



    if (0 >= localStorage.length) {
        
        let panierPlein = document.getElementById("panierPlein");
        panierPlein.classList.add("visually-hidden")
        let panierVide = document.getElementById("panierVide");
        panierVide.classList.remove("hidden")
    } else {
        let I = localStorage.length;
    let prixTotalPanier = 0;

    for (let i = 0; i < I; i++) {

        let e = localStorage.key(i);
        console.log(e)
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
        tdBtn.classList.add("btn", "btn-danger");
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
                panierPlein.classList.add("hidden")
                let panierVide = document.getElementById("panierVide");
                panierVide.classList.remove("hidden")
            }
        });


        })

    }
    }
