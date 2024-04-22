const express=require("express");
const app=express();
app.use(express.json())
require('./Mongo');
const  RoutingData=require('./Routs/SignupRout')
const cors=require('cors');
app.use(cors())
const path=require('path')


app.use(express.static(path.join(__dirname,'../BackEnd')));

const port=8000;
app.listen(port,()=>{
    console.log(`Listening Port ${port}`);
})

app.use('/',RoutingData)