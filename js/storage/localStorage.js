
function saveUser(key, user) {
    // Get old users
    let users = getUsers(key)
    // add new One
    // users = Object.values(users)
    // console.log(users);
    users.push(user)
    // Save in LS
    localStorage.setItem(key, JSON.stringify(users))

}
let convertUsers;

function getUsers(key) {
    // Get users or array if empty
    const datasFromLocalstorage = localStorage.getItem(key)
    
    convertUsers = JSON.parse(datasFromLocalstorage) || []


    return convertUsers
    // return JSON.parse(localStorage.getItem(key)) || []
}

export { saveUser, getUsers}