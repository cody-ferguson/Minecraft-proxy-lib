function Hex(number) {if (number < 0) {number = 0xFFFFFFFF + number + 1} return number.toString(16).toUpperCase()}
const { Server } = require("http")
const net = require("net")
require('dotenv').config()
var connection


var serverCom = net.createConnection(process.env.ConnectionPort)
serverCom.end()
serverCom.on('data',(data) =>{
    connection.write(data)
})
const clientCom = net.createServer(socket => {
    serverCom.connect(process.env.ConnectionPort)
    console.log('Client connected')
    connection = socket
    socket.on("data", data => {
        process.stdout.write('Client Sent: ')
        for (num of data.values()) {
            process.stdout.write(`${Hex(num).padEnd(2, '0')} `)
        }
        process.stdout.write("\n")
        serverCom.write(data)
    })
    socket.on('end',() => {
        console.log('client disconnected')
        serverCom.end()
    })
})
clientCom.listen(process.env.port)