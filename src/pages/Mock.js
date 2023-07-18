const roles = {
    admin: 0,
    utente: 1,
    farmacista: 2,
    totem: 3,
    unregistered: 4
}


function LoginUser(username, password){
    switch(username){
        case "admin":
            return roles.admin;
        case "utente":
            return roles.utente;
        case "farmacista":
            return roles.farmacista;
        case "totem":
            return roles.totem;
        default:
            return roles.unregistered;
    }
}

export {LoginUser, roles} ;