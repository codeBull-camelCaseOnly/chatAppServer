class User {
    static _id = 0
    constructor(socket) {
        this.id = User._id++
        this.name = `user${this.id}`
        this.socket = socket
        this.text_color = '#' + (Math.random() * 0xFFFFFF << 0).toString(16);
    }
}

module.exports = User