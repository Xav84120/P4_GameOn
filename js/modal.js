function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

/*************************************************** CE QUE JE RAJOUTE *************************************************/

/* Pointer le formulaire */
const formulaire = document.forms.reserve;

/* Creation de la variable pour le message à afficher. */
let msg = "";
/* Creation de la variable pour la validation du prénom. Par défaut elle est à false */
let valid = false;

/* Creation de variables de validation spécifique aux inputs */
let validF = false;
let validL = false;
let validE = false;
let validB = false;
let validQ = false;
let validT = false;
let validC = true;


/* Creation de la fonction visuError pour l'affichage des messages d'erreurs */
function visuError(htmlElement, isValid) {
  htmlElement.setAttribute("data-error", msg);
  htmlElement.setAttribute("data-valid", isValid);
  htmlElement.setAttribute("data-error-visible", !isValid);
  return;
};

/************************************************ FERMETURE MODAL_OK *****************************************************/

const closeForm = document.getElementById("closeForm");

closeForm.addEventListener("click", () => {
  if (valid == false){
    modalbg.style.display = "none";
    return;
  }
    modalbg.style.display = "none";
    window.location.reload();
    return;
});

// closeForm.addEventListener("click", () => {
//   modalbg.style.display = "none";
//   window.location.reload();
// });

/**************************************************** PRENOM_OK ******************************************************/

// Pointer la <div> qui contient le champ prénom (HTML Collection)
const divFirst = formulaire.getElementsByClassName("formData")[0];

// Pointer le <input id="first"> qui est le champ prénom
const first = document.getElementById("first");

// Declaration variable pour modalValid()
let infoFirst="";

// Ecouter les evenements sur first
first.addEventListener("input", (e) => {
  validFirst(e.target.value);
  infoFirst = e.target.value; // Permet d'injecter le prénom dans modalValid()
});

// Déclaration de la fonction validFirst
function validFirst(firstValue) {
    if (firstValue.length < 2) {
      msg = "Veuillez entrer 2 caractères ou plus pour le champ du prénom";
      visuError(divFirst, false);
      validF = false;
      return;
    
  }
      visuError(divFirst, true);
      validF = true;
      return;
};

/********************************************************** NOM_OK  ****************************************************/

// Pointer la <div> qui contient le champ nom (HTML Collection)
const divLast = formulaire.getElementsByClassName("formData")[1];

// Pointer le <input id="last"> qui est le champ nom
const last = document.getElementById("last");

// Ecouter les evenements sur last
last.addEventListener("input", (e) => {
  validLast(e.target.value);
});

// Déclaration de la fonction validlast
function validLast(lastValue) {
  if (lastValue.length < 2) {
    msg = "Veuillez entrer 2 caractères ou plus pour le champ du nom";
    visuError(divLast, false);
    validL = false;
    return;
  }
    visuError(divLast, true);
    validL = true;
    return;
};

/************************************************ ADRESSE EMAIL VALIDE_OK  *********************************************************/

// Je dois récupérer le form-data qui correspond à l'email
const divEmail = formulaire.getElementsByClassName("formData")[2];

// Je récupère l'input de E-mail
const email = document.getElementById("email");
let infoEmail = "";
// Ecouter l'evt sur email
email.addEventListener("input", (e) => {
  validEmail(e.target.value);
  infoEmail = e.target.value;
});

// Déclaration de la fonction validEmail
function validEmail(emailValue) {
  const regexEmail = new RegExp(
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/gm
  );
  const testRegexpEmail = regexEmail.test(emailValue);

  if (testRegexpEmail == false) {
    msg = "Adresse e-mail invalide";
    visuError(divEmail, false);
    validE = false;
    return;
  }
    visuError(divEmail, true);
    validE = true;
    return;
}

/****************************************** DATE DE NAISSANCE SAISIE_OK  ******************************************************/

const divBirthdate = formulaire.getElementsByClassName("formData")[3];
const birthdate = document.getElementById("birthdate");

// Déclaration de la fonction validBirthdate
function validBirthdate(birthdateValue) {
  if (birthdateValue == "") {
    msg = "Vous devez renseigner une date de naissance valide";
    visuError(divBirthdate, false);
    validB = false;
    return;
  }
}

birthdate.addEventListener("input", () => {
  visuError(divBirthdate, true);
  validB = true;
  return;
});

/****************************************** NOMBRE DE CONCOURS ******************************************************/

const divQuantity = formulaire.getElementsByClassName("formData")[4];
const quantity = document.getElementById("quantity");

/* Permet de vérifier qu'un nombre a été saisi */
quantity.addEventListener('input', ()=>{
    visuError(divQuantity, true);
    validQ = true;
    return;
})

function nbrTournois(){ /* Utilisé seulement lors de la validation du formulaire */
  if (quantity.value == ""){
    msg = "Rentrez un nombre de tournois";
    visuError(divQuantity, false);
    validQ = false;
    return;
  }
    
};



/**************************************************** CHOIX DU TOURNOIS_OK  ****************************************************/

const divLocation = formulaire.getElementsByClassName("formData")[5];
const locations = document.getElementsByName("location"); // Renvoie une NodeList

// Je tranforme ma NodeList en Array_OK
const locationsArray = Array.from(locations);

let cc = false;

// Parcourir les checkboxs de locationsArray pour écouter l'evt "change"
for (let i = 0; i < locationsArray.length; ++i) {
    locationsArray[i].addEventListener("change", () => {
    divLocation.setAttribute("data-error-visible", "false");
    cc = true;
  });
}

// Déclaration fonction validTournois
function validTournois() {
  if (cc == true) {
    validT = true;
    return;
  }
  if (cc == false) {
    msg = "Vous devez cocher un tournois";
    visuError(divLocation, false);
    validT = false;
    return;
  }
}

/******************************************* CHECKBOX CONDITIONS GENERALES_OK ***********************************************/

const divCheckConditions = formulaire.getElementsByClassName("formData")[6];
const checkbox1 = document.getElementById("checkbox1");

checkbox1.addEventListener("change", () => {
  validCheckConditions();
});

// Déclaration de la fonction validCheckConditions
function validCheckConditions() {
  if (checkbox1.checked == false) {
    msg = "Vous devez acceptez les conditions générales";
    visuError(divCheckConditions, false);
    validC = false;
    return;
  }
  divCheckConditions.setAttribute("data-error-visible", "false");
  validC = true;
  return;
}

/********************************************** VALIDATION DU FORMULAIRE **************************************************/

const formDataArray = Array.from(formData); /* Va servir dans modalvalid() */
const btnValid = document.getElementById("btnValid");

// Ecoute evt sur btnValid
  btnValid.addEventListener("click", (event) => {
  validFirst(first.value); 
  validLast(last.value); 
  validEmail(email.value);   
  validBirthdate(birthdate.value);
  nbrTournois();
  validTournois();
  if (validF == true && validL == true && validE == true && validB == true && validQ == true && validT == true && validC == true) {
    valid == true;
    modalvalid();
    return;
  }
  event.preventDefault();
  return;
});



// Déclaration de la fonction modalValid
function modalvalid() {
  modalbg.style.display = "block";

  // Effacer les différentes entrées du formulaire.
  for (let i = 0; i < formDataArray.length; ++i) {
    formDataArray[i].remove();
  }

  const textLabel = document.querySelector(".text-label");
  textLabel.innerHTML = `Un mail de confirmation a été envoyé à l'adresse suivante : <span class="red">${infoEmail}</span>`;

  // creation d'un élément <p> ds modal-body
  let element1 = document.createElement("p");
  element1.innerHTML = `Merci <span class="red">${infoFirst}</span> d'avoir participé`;
  const modalBody = document.querySelector(".modal-body");
  modalBody.prepend(element1);

  // Supression du bouton "c'est parti"
  btnValid.remove();

  valid = true;
}


