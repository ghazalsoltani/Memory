import { validateEmail } from "./Validator/validEmail.js";
import { validatePassword } from "./Validator/validPassword.js";
import { validatePseudo } from "./Validator/validPseudo.js";
import { saveUser, getUsers } from "./storage/localStorage.js";

const $contactForm = document.getElementById("contactForm");

const user = {};

const KEY_LOCALSTORAGE = "users";

let emailExistant;

$contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const errors = [];

  const $errorInputs = document.querySelectorAll("[id^=erreur-]");
  console.log($errorInputs);
  $errorInputs.forEach((error) => (error.innerHTML = ""));

  const $inputs = event.currentTarget.querySelectorAll("input");

  $inputs.forEach((input) => {
    // Switch id's field
    switch (input.id) {
      case "email":
        console.log("email");
        console.log("value : ", input.value);
        // Test
        if (!validateEmail(input.value)) {
          errors.push([input.id, "L'email n'est pas correct"]);
        } else {
          user.email = input.value;
        }
        break;

      case "motdepasse":
        console.log("motdepasse");
        console.log("value : ", input.value);
        // Test
        if (!validatePassword(input.value)) {
          errors.push([input.id, "Le mot de passe n'est pas correct"]);
        } else {
          user.password = input.value;
        }
        break;

      case "pseudo":
        console.log("pseudo");
        console.log("value : ", input.value);
        // Test
        if (!validatePseudo(input.value)) {
          errors.push([input.id, "Le pseudo n'est pas correct"]);
        } else {
          user.pseudo = input.value;
        }
        break;

      case "motdepasseconfirm":
        console.log("motdepasseconfirm");
        console.log("value : ", input.value);

        console.log(user.password);
        // Test
        if (user.password !== input.value) {
          errors.push([input.id, "Le mot de passe n'est pas identique"]);
        } else {
          console.log("a");
        }
        break;

      default:
        console.log("Failed");
        break;
    }
  });

  if (errors.length > 0) {
    document.getElementById("contactForm").classList.add("wiggle");
    setTimeout(() => {
      document.getElementById("contactForm").classList.remove("wiggle");
    }, 1000);
    // Si j'en ai je les affiche et je ne fais rien d'autre
    errors.map((error) => {
      // Le champ div qui va afficher une erreur
      const $errorField = document.getElementById(`erreur-${error[0]}`);
      $errorField.innerHTML = error[1];
    });
  } else {
    const users = getUsers("users");
    let blocRegister = 0;

    for (let i = 0; i < users.length; i++) {
      let pseudoExist = users[i].pseudo;
      let emailExist = users[i].email;
      console.log(emailExist);
      console.log(pseudoExist);
      if (
        emailExist == document.getElementById("email").value ||
        pseudoExist == document.getElementById("pseudo").value
      ) {
        console.log("a");
        alert("email ou pseudo déjà utilisé");

        // deja present donc pas sauvegarde pas refresh + rendre la condition de save false
        blocRegister = 1;
      } else {
        console.log("b");
        // rendre la condition de save vrai
      }
    }
    if (blocRegister !== 1) {
      // Sinon
      // J'enregistre mon user dans le Localstorage
      saveUser(KEY_LOCALSTORAGE, user);
      const $msgSuccess = document.getElementById("message-success");
      $msgSuccess.innerHTML = "User register successfully";

      setTimeout(() => {
        $msgSuccess.innerHTML = "";
      }, 2000);
      setTimeout(() => {
        document.location.href = "connexion.html";
      }, 2000);
    } else {
      // reset tab err
      errors = [];
    }
  }
});

const passwordPattern =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&!*])[A-Za-z\d@#$%^&!*]{6,}$/;
const passwordPattern2 =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&!*])[A-Za-z\d@#$%^&!*]{9,}$/;
const $password = document.getElementById("motdepasse");
console.log($password);
$password.addEventListener("keyup", () => {
  const mdp = document.getElementById("motdepasse").value;

  if (mdp.length <= 6) {
    document.getElementById("faible").classList.remove("hidden");
    document.getElementById("moyen").classList.add("hidden");
    document.getElementById("fort").classList.add("hidden");
  } else if (
    passwordPattern.test(mdp) == true &&
    passwordPattern2.test(mdp) == false
  ) {
    document.getElementById("faible").classList.remove("hidden");
    document.getElementById("moyen").classList.remove("hidden");
    document.getElementById("fort").classList.add("hidden");
  } else if (passwordPattern2.test(mdp) == true) {
    document.getElementById("faible").classList.remove("hidden");
    document.getElementById("moyen").classList.remove("hidden");
    document.getElementById("fort").classList.remove("hidden");
  }
});
