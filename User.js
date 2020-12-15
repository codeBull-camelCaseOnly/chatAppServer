class User {
    static _id = 0
    constructor(socket) {
        this.id = User._id++
        this.name = `user${this.id}`
        this.socket = socket
    }
}

module.exports = User