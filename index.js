function Hex(number) {if (number < 0) {number = 0xFFFFFFFF + number + 1} return number.toString(16).toUpperCase().padEnd(2, '0')}
const net = require("net")
require('dotenv').config()
var connection


var serverCom = net.createConnection(process.env.ServerPort)
serverCom.end()
serverCom.on('data',(data) =>{
    connection.write(data)
})
const clientCom = net.createServer(socket => {
    serverCom.connect(process.env.ServerPort)
    console.log('Client connected')
    connection = socket
    socket.on("data", data => {
        process.stdout.write('Client Sent: ')
        for (num of data.values()) {
            process.stdout.write(`${Hex(num)} `)
        }
        process.stdout.write("\n")
        serverCom.write(data)
    })
    socket.on('end',() => {
        console.log('client disconnected')
        serverCom.end()
    })
})
clientCom.listen(process.env.ProxyPort,() =>{
    console.log(`Proxy running on port ${process.env.ProxyPort}`)
})