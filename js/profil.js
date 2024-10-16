
document.addEventListener('DOMContentLoaded', () =>{

    const info = localStorage.getItem('users')
    const infoParse = JSON.parse(info)
console.log(infoParse);
    const email = sessionStorage.getItem('currentEmail')
    for (let i = 0; i < infoParse.length; i++) {
        let emailExist = infoParse[i].email
        if (email == emailExist ) {
        document.getElementById('pseudoProfil').value = infoParse[i].pseudo
        }
        
    }

    document.getElementById('emailProfil').value = email
    


})