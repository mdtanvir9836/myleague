const user=require("../schema/leagueSchema");
class League{
    static showall=async(req,res)=>{
        try{
           const data=await user.find();
           res.status(200).json({datashow:data});
        }
        catch(err)
        {
           res.status(404).json({error:err.message});
        }
    }
     static insert=async(req,res)=>{
      try {
        const {currentLeague}=req.body;
        const data=await user.create({
            league_title:currentLeague.title,league_description:currentLeague.description,owner:currentLeague.owner  })
         res.status(200).send({datashow:data})
      } catch (error) {
    res.status(404).send(error)
}
     }
     static update=async(req,res)=>{
        try {
            const id=req.params.id
        const {currentLeague}=req.body;
        const {league_title,league_description,owner}=req.body;
            console.log(id);
            const data=await user.findOneAndUpdate({_id:id},{
                league_title:currentLeague.title,league_description:currentLeague.description,owner:currentLeague.owner               })
              console.log(data);
           res.status(200).send({show:data})
        } catch (error) {
      res.status(404).send(error)
  }
       }

       static invite=async(req,res)=>{
        try {
            const id=req.params.id
        const {data}=req.body;
        console.log(data);
        const members=data;
            const dataVal=  await user.findOneAndUpdate(
                { _id:id},
                { $push: {members} }
              )
              console.log(dataVal);
           res.status(200).send({show:dataVal})
        } catch (error) {
      res.status(404).send(error)
  }
       }

       static delete=async(req,res)=>{
        try{
           const {id}=req.params;
      const data=await user.deleteOne({_id:id})
       res.status(200).json({data})
      }
      catch(err){
      console.log(err.message);
       res.status(400).send({err:err.message})
      }
      }
}
module.exports=League