
const route=require("./router/leagueRouter")
const express=require("express")
const cors = require('cors');



const app=express()

const port=4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(route);
 
app.listen(port,()=>{
    console.log("Server is listening");
})