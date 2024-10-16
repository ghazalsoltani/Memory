function validatePassword(password) {
    const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&!*])[A-Za-z\d@#$%^&!*]{6,}$/
    return passwordPattern.test(password)
}

export { validatePassword }
