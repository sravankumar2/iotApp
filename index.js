const mongoose =require('mongoose')
require('dotenv/config')
var express = require('express')
var app=express()
app.use(express.json()) //For JSON requests
app.use(express.urlencoded({extended: true}));
const server = require('http').createServer(app)

var io = require("socket.io")(server)


const ConnectionString=process.env.DB_CONNECTION
const Options={
    useUnifiedTopology:true,
    useNewUrlParser:true
}
mongoose.connect(ConnectionString,Options).then(
    ()=>{
        console.log('Connection Established')
    }
).catch((error)=> console.log(error)) 
const TableData = new mongoose.Schema({},{strict:false})
var Table=mongoose.model('details',TableData)

app.get("/", (req,res)=>{
    
    res.sendFile(__dirname + "/index.html")
})
app.get("/rangeData", (req,res)=>{
    
    res.sendFile(__dirname + "/history.html")
})
app.post("/rangeData", (req,res)=>{
    console.log((req.body));
    
    var first=req.body.start;
    var second=req.body.end;
    var rangeData = Table.find({"timeStamp":{$gte:first, $lt:second }})
//    console.log(rangeData)
//    res.send(rangeData)
   
})

io.on("connection", function(client){
    
    client.on("join", function(data){
        setInterval(async ()=>{
            const getData= await Table.find().sort({timeStamp:-1}).limit(10)
           
            client.broadcast.emit('message',getData)
        },10000)
    })
}) 

var port=process.env.PORT || 3000
server.listen(port,()=>{
    console.log(`server started at port: ${port}`)
})