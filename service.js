const mongoose =require('mongoose')
require('dotenv/config')
var express=require('express')
// var bodyParser=require('body-parser')
var app=express()
// app.use(express.static("./index.html"))
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
const DataSchema=new mongoose.Schema({},{strict:false})
var DbData=mongoose.model('details',DataSchema)

setInterval(saveData,10000)
async function saveData(){
    dbData = new DbData({
        temperature:Math.floor(Math.random()*100-1),
        batteryLevel:Math.floor(Math.random()*100-1),
        timeStamp:new Date().toLocaleString(),
    })
    const data= await dbData.save();
    console.log(data)
}



// var People=mongoose.model('details',PeopleSchema)
// app.get('/',async (req,res)=>{
//     var data=await People.find()
//     if(!data || !data.length) return res.send("nodata")
   
//     res.send(data)
// })

    
// app.post('/details',async (req,res)=>{
//     let current = new Date();
// let cDate = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();
// let cTime = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
// let dateTime = cDate + ' ' + cTime;
// var mObj={
//     temperature:Math.floor(Math.random()*100-1),
//     batteryLevel:Math.floor(Math.random()*100-1),
//     timeStamp:dateTime,
// }
//  var postData=await People.insertMany(mObj)

// res.send(postData)  

// })

//     var port=3000
//     app.listen(port,()=>{
//         console.log(`server started at port: ${port}`)
//     })