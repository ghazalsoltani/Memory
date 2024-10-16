import { getUsers } from "./storage/localStorage.js";

document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Récupérer les informations du formulaire
    const email = document.getElementById('userEmail').value
    const passwordInput = document.getElementById('userPassword').value

    // Vérifier si l'utilisateur existe dans le localstorage

    const users = getUsers('users')
    for (const user of users) {
        console.log(user.email);
        let emailExist = user.email
        let passwordExist = user.password
if (emailExist === email && passwordExist === passwordInput){
    
            sessionStorage.setItem('currentEmail', email)
            document.location.href="profil.html"
            
        } else {
           
        }
        
    }
});
