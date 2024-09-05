const express=require('express')
const router=express.Router();
const lc=require("../controllers/leagueControll")
router.post("/insert",lc.insert)
router.put("/update/:id",lc.update)
router.put("/invite/:id",lc.invite)
router.delete("/delete/:id",lc.delete)
router.get("/show",lc.showall)
module.exports=router;