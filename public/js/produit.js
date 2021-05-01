
const apiUrl = "http://localhost:3000/api/teddies";

import {
    nmbpp,
    rechercheProduitStorage,
 } from "./utils.js";

let params = new URLSearchParams(window.location.search); // paramettre pour allez chercher dans l'url ( on lapelle params)
let articleId = params.get("id"); // avec params qui nous permet de chercher dans l'url on lui dit d'allez recuperer l'ID et tous ca on lapelle articleId

fetch(apiUrl + `/${articleId}`) // on fait un fetch normale mais on a mis les paramattre du fecth dans des varaibles
    .then(res => res.json()) // on lui dit de nous retourner un tableau en JSON
    .then(data => {
        let _id = data['_id'];
        produitView.innerHTML = `
        <div class="container shadow-lg">
            <div class="d-flex row">
                <div class="col-lg-5 col-0 px-0">
                <img class="coverImg" src="${data.imageUrl}" alt="">
                </div>
                <div class="bg-light p-4 col-lg-7 ">
                    <h1 class="h3 text-center">${data.name}</h1>
                    <p class="col-lg-11 mt-4">${data.description}</p>
                    <p>${data.price / 100} €</p>
                    <select class="form-select  mb-3 mt-4" id="selectColor"></select>
                    <div class="row mt-5 justify-content-between">
                        <div class="col-lg-3 col-md-3 mb-3 d-flex" id="choixQuantite">
                            <button class="btn btn-primary btn-purple" type="button" id="moins">-</button>
                            <input id="quantiteProduit" type="text" class="form-control text-center" aria-label="Quantité de produit" value="1"  minlength="1" maxlength="2">
                            <button class="btn btn-primary btn-purple" type="button" id="plus">+</button>
                        </div>
                        <div class="col-lg-4">
                            <button type="submit" class="btn btn-primary btn-purple p-2" id="${articleId}">Ajouter au panier</button>
                        </div>
                    </div>
                </div>
        </div>`

        //creation des option de produit
        for (let i = 0; i < data.colors.length; i++) { 
            let selectElement = document.getElementById("selectColor"); // on recupere notre selecteur en le nommant selectElement
            let optionElement = document.createElement("option"); // on nomme les option quil y aura dedans optionElement et on la créé evec createElement
            optionElement.setAttribute("value", `${data.colors[i]}`); // on lui rajoute les vlue de tout les element qui trouve 
            optionElement.textContent = `${data.colors[i]}`; // on lui rajoute la meme chose que au dessu mais en partie visible (text)
            selectElement.appendChild(optionElement); // on lui de mettre les option dans selectElement ( donc dans notre barre de selection)
        }
        // creation de la gestion du nombre de d'article
        let quantiteProduit = document.getElementById("quantiteProduit"); // on recupere notre element html et on le nome 

        let btnPlus = document.getElementById("plus");// on recupere notre bouton plus et on le nome btnPlus
        btnPlus.addEventListener('click' , function (){ // on ecoute le boutton avec addEventListener et on lui dit que des que quelqu'un click dessu, cela active la function
            if (quantiteProduit.value < 99){ // la on dit, si la quantité (value) et inferieur a 99 alors exectute le code suivant
                quantiteProduit.value++; // rajoute 1 
            }
        });

        let btnmoins = document.getElementById("moins"); 
        btnmoins.addEventListener('click', function() {
            if (quantiteProduit.value > 1) {
                quantiteProduit.value --;
            }
        });

        document.getElementById(_id).addEventListener('click', function () {

            
            let nombreTotalInput = parseInt(quantiteProduit.value); // on vien recupéré le nombre total qu'il y a dans le input en noubliant pas le PARSEINT et en le nommant
            //fonction pour le nombre d'article qui s'affiche dans le panier (on fait apelle a deux autre function)
            let nombreProduit = rechercheProduitStorage(_id); // on lui dit que nombre produit est egale au nombre de la function apeller (donc la valeur de chaque key)
            nombreProduit += nombreTotalInput; // on lui dit qu'il rajoute 1 a chaque click (grace a la function click apeller au dessu )
            localStorage.setItem(_id, nombreProduit);// on lui de re ajouter la key avec ca nouvelle valeur  (+1) 
            nmbpp(); // on apelle la function qui nous sert a afficher et aditioner la valeur a coté du mot panier de la bare de nav
        });
        nmbpp(); // ici je refait apelle la fonction qui sert d'affichage a coté de panier mais en dehor de la function (car cette function sactive au click, donc en refrsh la page tent que je click pas cela ne safiche pas)
    })
    .catch(
        function(error){ alert("Erreur : Veuillez réessayer plus tard \n" + error); // ici on vient rajouter une erreur si jamais la fonction ne fonctionne pas
    });