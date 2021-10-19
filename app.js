const express = require('express')
const mongoose = require('mongoose')
const api_routes = require('./routes/api_routes')
const dotenv = require('dotenv').config()
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
const dbURI = process.env.DB_URI

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

