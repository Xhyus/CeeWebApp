const isLogged = () => {
    if (localStorage.getItem('token') === null) {
        router.push('/')
    }
    console.log("Usuario loggeado")
}

module.exports = {
    isLogged
}