function hex(number) {if (number < 0) {number = 0xFFFFFFFF + number + 1} return number.toString(16).toUpperCase().padEnd(2, '0')}
function print(...vals){process.stdout.write(...vals)}
const net = require("net")
var connection
class Proxy{
    #serverCom
    #serverHost
    #serverPort
    #localPort
    #clientCom
    
    constructor(serverHost = "localhost",serverPort = 25565,localPort = 25566){
        this.#serverHost = serverHost
        this.#serverPort = serverPort
        this.#localPort = localPort
    }
    start() {
        this.#serverCom = net.createConnection(process.env.ServerPort)
        this.#clientCom = net.createServer(socket => {
            serverCom.connect(process.env.ServerPort)
            connection = socket
            socket.on("data", data => {
                data.format = (str) => {
                    console.log(str)
                }
                var newdata = data.slice(3,data.length)
                if (hex(data[2]) == "11") {
                    print("pos ")
                }
            })
            socket.on('end',() => {
                serverCom.end()
            })
        })
    }
}

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
        var newdata = data.slice(3,data.length)
        for (num of newdata) {
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