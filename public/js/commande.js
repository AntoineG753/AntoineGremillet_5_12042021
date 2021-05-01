if(localStorage.getItem("orderId")) {
    let commandeTrue = document.getElementById("contenaireCommandeTrue");
    commandeTrue.classList.remove("hidden");
    let pCommandeTrue = document.getElementById("pCommandeTrue");
    pCommandeTrue.classList.remove("hidden");
    let h1CommandeTrue = document.getElementById("h1CommandeTrue");
    h1CommandeTrue.classList.remove("hidden");
    let paragraphePrixTotal = document.createElement("p");
    paragraphePrixTotal.classList.add("h2");
    paragraphePrixTotal.classList.add("mb-4", "mt-4");
    paragraphePrixTotal.innerHTML = `Prix total de votre commande: ${localStorage.getItem("prixTotal")} €`;
    let paragraphe = document.createElement("p")
    paragraphe.classList.add("h2")
    paragraphe.innerHTML = `Identifiant de commande: ${localStorage.getItem("orderId")}`;
    commandeTrue.appendChild(paragraphePrixTotal);
    commandeTrue.appendChild(paragraphe);
    
} else {
    let commandeFalse = document.getElementById("contenaireCommandeFalse");
    commandeFalse.classList.remove("hidden")
    let pCommandeFalse = document.getElementById("pCommandeFalse")
    pCommandeFalse.classList.remove("hidden")
    let iconCommandeFalse = document.getElementById("iconCommandeFalse")
    iconCommandeFalse.classList.remove("hidden")
    iconCommandeFalse.classList.add("mb-5")
}
localStorage.clear();