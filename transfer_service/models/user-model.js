
class User {
    email
    admin
    authToken
    created
    updated

    toJSON() {
        return {email: this.email}
    }
}

module.exports = User