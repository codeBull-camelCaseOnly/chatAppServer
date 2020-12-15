var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var cors = require('cors')

const User = require('./User')

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

users = []

io.on('connection', (socket) => {
    users[socket.id] = new User(socket)
    socket.emit('connected', { name: users[socket.id].name })
    console.log('user connected')
    // console.log(users)
    socket.on('message', (data) => {
        io.emit('message', { message: data })
    })

    socket.on('changename', (data) => {
        console.log(data.name + 'came here')
        res = -1
        for (key in users) {
            if (users[key].name === data.name)
                res = 0
        }
        if (res == -1)
            users[socket.id].name = data.name
        else
            socket.emit('invalid_name', { orig_name: users[socket.id].name })
    })
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});

// app.use(cors())
// app.options('*', cors());
// app.listen(app.get('port'), function () {
//     console.log('we are listening on: ',
//         app.get('port'))
// });