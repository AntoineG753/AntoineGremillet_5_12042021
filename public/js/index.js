
fetch('http://localhost:3000/api/teddies')
    .then(res => res.json())
    .then(data => {
        console.log(data[0]['name']); //data est egale a ce que contient le tableau + on demande le nom dans l'item 0
        let I = data.length;  // I est egale au nombre d'item que contien le tableau 
        console.log(I) // dans la console on peut voir le nombre d'item dans le tableau
        
        for ( let i = 0; i < I; i++) { // temp que i (0) est inferieur a I (nombre du tableau) alors la boucle continue (i++)
            console.log(data[i]) // on affiche ce que contient chaque item du tableau
            // la on deconpose le tableau et on demande a affiché chaque composant des itemes 1 par 1 grace a la boucle for
            console.log(data[i]['colors'])
            console.log(data[i]['_id']); 
            console.log(data[i]['name']);
            console.log(data[i]['description']);
            console.log(data[i]['price']);
            console.log(data[i]['imageUrl']);

            // creation d'une div avec la class col  (toujour dans la boucle for, pour que les ellements ce remplisse avec chaque items)
            let col =  document.createElement('div'); // on ajoute une div et on lapelle col
            col.classList.add("col"); // on ajoute la class col a la la div nomé col

            // creation d'une div avec plusieur class
            let card = document.createElement('div');
            card.classList.add("card" , "shadow-sm");// on lui rajoute des class boostrap
            card.css = 'border-radius: 1.2vw 1.2vw 0 0';// on ahoute a la div un border radius en css

            // creation de la balise img
            let img = document.createElement('img'); // on ajoute une balise img que l'on apelle img
            img.src = data[i]['imageUrl'];
            img.css = 'border-radius: 1.2vw 1.2vw 0 0';
            img.css = 'width:100%';
            img.css = 'height:100%';

            // creation de la div qui sera sous l'image est qui comportera les text de la carte
            let cardBody = document.createElement('div');
            cardBody.classList.add("card-body")

            //creation du titre qui comporte le nom de la carte
            let cardHeader = document.createElement("h3");
            cardHeader.innerText = data[i]['name']; // on ajoute du text avec innerText a notre h3 que l'on a nomé cardHeader

            // creation de la balise p qui va contenir la description + ajout de la class card-text
            let cardText = document.createElement('p');
            cardText.innerText = data[i]['description'];
            cardText.classList.add("card-text");
             
            //creation de la div qui va contenir le prix
            let divPrice = document.createElement("div");
            divPrice.classList.add("align-text")

            //creation de la balise p qui contiendra le prix
            let price = document.createElement("p");
            price.innerText = data[i]['price']/100 + '€'; // ici le prix et d'ivisé par 100 car a la base il n'est pas en euros


            //creation de la div qui va englober les bouttons
            let btnPrice = document.createElement('div');
            btnPrice.classList.add("d-flex", "justify-content-between", "align-items-center");

            //creation du premier boutton Voir produits
            let btnView = document.createElement('button');
            btnView.classList.add("btn", "btn-sm", "btn-outline-secondary");
            btnView.innerText = "Voir le produit";

            //creation du deuxieme boutton Acheter
            let btnBuy = document.createElement('button');
            btnBuy.classList.add("btn", "btn-sm", "btn-outline-secondary");
            btnBuy.innerText = "Acheter";

            // maintenant on va lié notre creation de card javascript au html, pour on va commencé par faire l'architecture de la carte 




            btnPrice.appendChild(btnView);
            btnPrice.appendChild(btnBuy);

            cardBody.appendChild(cardHeader);
            cardBody.appendChild(cardText);
            cardBody.appendChild(divPrice);
            cardBody.appendChild(btnPrice);

            col.appendChild(card);
            card.appendChild(img);
            card.appendChild(cardBody);

            let container = document.getElementById("row"); // on prend l'element html ou on veut que tout le code atterisse, puis on le nome pour le recuperer en dessou
            container.appendChild(col); // ici on prend l'endroit nomé et on lui ajoute a premiere div déclaré (la div principale)



        }
        
    })
    .catch(
        function(error){ alert("Erreur : " + error); // ici on vient rajouter une erreur si jamais la fonction ne fonctionne pas
    });
    