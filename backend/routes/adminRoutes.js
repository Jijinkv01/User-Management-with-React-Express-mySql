const express = require("express")
const router = express.Router()
const AdminController = require("../controllers/adminController")


router.post("/login", AdminController.login)
router.post("/logout", AdminController.logout)
router.get("/getUsers", AdminController.getUsers)







module.exports = router