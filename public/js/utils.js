

//  function pour rechercher les produits dans le localStorage
let rechercheProduitStorage = function (storageProduitId) {
                    
    if (localStorage.getItem(storageProduitId)) {  
        return parseInt(localStorage.getItem(storageProduitId));
        
    } else {
        return 0;
    }
}

let nmbpp = function () {
    let nombreProduitPanier = document.getElementById("nombreProduitPanier");
    if (localStorage.length < 1) {
        nombreProduitPanier.textContent = "";
    } else {

        let valeurPanier = 0;
        
        for (let i = 0; i < localStorage.length; i++){
            
                valeurPanier += parseInt(localStorage.getItem(localStorage.key(i)));
        }
        if (valeurPanier !== 0) {
            nombreProduitPanier.textContent = valeurPanier;
            
        }
        
    }
}

export {
    nmbpp,
    rechercheProduitStorage,
} ;