const mongoose=require("mongoose");
(async()=>{
    await mongoose.connect("mongodb://127.0.0.1:27017/league");
})()
.then(()=>{
    console.log("Database connection is done");
})
.catch((err)=>{
    console.log(err);
})
module.exports=mongoose;
