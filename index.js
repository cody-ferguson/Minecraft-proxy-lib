function hex(number) {if (number < 0) {number = 0xFFFFFFFF + number + 1} return number.toString(16).toUpperCase().padEnd(2, '0')}
function print(...vals){process.stdout.write(...vals)}
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
        data.format = (str) => {
            console.log(str)
        }
        if (hex(data[2]) == "11") {
            print("pos ")
        }
        var newdata = data.slice(2,data.length)
        for (num of data) {
            print(`${hex(num)} `)
        }
        print("\n")
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