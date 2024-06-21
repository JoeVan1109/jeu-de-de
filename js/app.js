// créer div avec class dice et mettre dans la div parent qui a l'id player
let player = document.getElementById("player");

let newDiv = document.createElement("div");
newDiv.classList.add("dice"); 

// créer div avec la classe "board" et l'ID "dealer"
let divAdverse = document.createElement("div");
divAdverse.classList.add("board");
divAdverse.id = "dealer";


// placer divAdverse après l'élément avec l'ID "player"
player.insertAdjacentElement('afterend', divAdverse);

// insêrer nouvelle div
player.append(newDiv);



// récupérer les réponses du formulaire

let button = document.getElementById("button");

let numberInput = document.getElementById("number");


// fonction pour tirer un nbr aléatoire entre 1 et 6 pour le player

// le nbr obtenu modifiera l'arrière plan du dé qui fait 100 px de large

async function rollDiceForPlayer(newDiv) {
    return new Promise((resolve, reject) => { // objet pour exe la génération du chiffre en arrière plan avec 2 états possibles
        let randomNumber = Math.floor(Math.random() * 6) + 1;
        console.log("Nombre aléatoire généré pour player :", randomNumber);

        let position = (randomNumber - 1) * -100;
        newDiv.style.backgroundPosition = `${position}px 0`;

        resolve();
    });
}

// Fonction pour générer un nombre aléatoire entre 1 et 6 pour le dealer
async function rollDiceForDealer(newDiv) {
    return new Promise((resolve, reject) => {
        let randomNumber = Math.floor(Math.random() * 6) + 1;
        console.log("Nombre aléatoire généré pour dealer :", randomNumber);

        let position = (randomNumber - 1) * -100;
        newDiv.style.backgroundPosition = `${position}px 0`;

        resolve();
    });
}
// boucle pour demander à l'utilisateur cb de dé il souhaite

// boucle for pour générer le nombre de dé demandé par l'utilisateur
// Fonction pour créer un nombre variable de dés en fonction de la valeur saisie

// Fonction asynchrone pour créer un nombre de dés pour le joueur (player)
async function createDiceForPlayer(number) {
    player.innerHTML = "";

    // POUR variable index = 0 et tant que index < number, alors boucle + i++
    for (let i = 0; i < number; i++) {
        let newDiv = document.createElement("div");
        newDiv.classList.add("dice");
        player.appendChild(newDiv);

        await rollDiceForPlayer(newDiv);
    }
}

// Fonction asynchrone pour créer un nombre de dés pour le dealer
async function createDiceForDealer(number) {
    let dealer = document.getElementById("dealer");
    dealer.innerHTML = "";

    for (let i = 0; i < number; i++) {
        let newDiv = document.createElement("div");
        newDiv.classList.add("dice");
        dealer.appendChild(newDiv);

        await rollDiceForDealer(newDiv);
    }
}



// Ecoute d'événement au clic sur le bouton "Valider"
button.addEventListener("click", async function (event) {
    event.preventDefault();

    let number = parseInt(numberInput.value);

    if (number >= 1 && number <= 4) {
        
         // Affiche leblockde player
        player.style.display = "block";

        // Créer les dés pour le joueur
        await createDiceForPlayer(number); //await lance la création des dés une fois que la valeur de l'input est traduite en number

        // Affiche le block de dealer
        dealer.style.display = "block";

        // Créer les dés pour le dealer en utilisant la même valeur saisie
        await createDiceForDealer(number);

        
    } else {
        alert("Veuillez saisir un nombre entre 1 et 4");
    }
});




