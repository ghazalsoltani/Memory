function validatePseudo(pseudo) {
    const emailPattern = /[a-zA-Z\d]{3,}$/
    return emailPattern.test(pseudo)
}

export { validatePseudo }