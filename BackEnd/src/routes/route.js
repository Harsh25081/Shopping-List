const express = require("express")
const { CreateList, GetList, UpdateList } = require("../controllers/productController")
const router = express.Router()

router.get("/test-me",(req,res)=>{
    res.send("Hi there this is the test api   ????")
})

router.post("/createlist",CreateList)
router.post("/getlist",GetList)
router.post("/updatelist",UpdateList)

module.exports = router