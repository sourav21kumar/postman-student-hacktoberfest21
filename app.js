const express = require('express')
const mongoose = require('mongoose')
const api_routes = require('./routes/api_routes')
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const dbURI = 'mongodb+srv://sourav:9937382009@cluster0.uutd9.mongodb.net/halloweenPostman'

mongoose.connect(dbURI,{ useNewUrlParser: true, useUnifiedTopology: true})
.then((result)=>{
    app.listen(3000,()=>{
        console.log("SUCCESSFULLY LISTENING AT PORT 3000")
    })
}).catch((err)=>{console.log(err)})


app.get('/',(req,res)=>{
    res.status(200).send({status:'SUCCESS'})
})

app.use(api_routes)

