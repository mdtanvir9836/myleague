const mongoose=require("../database/connect")
const league=mongoose.Schema({
    league_title:{
      type:String,
      required:true
    },
    league_description:{
        type:String,
        required:true,
      },
      members:[
    String
      ],
      owner:{
        type:String
      }
})
const leagueModel=mongoose.model("league",league)
module.exports=leagueModel