const express = require("express")
const router = express.Router()
const UserController = require("../controllers/userController")
const authenticate = require("../middleware/authMiddleware")
const upload = require("../config/multer")

router.post("/register", UserController.registerUser)
router.get("/verifyEmail", UserController.verifyEmail)
router.post("/login", UserController.loginUser)
router.post("/logout", UserController.logoutUser)
router.post("/refresh", UserController.refreshAccessToken)
router.post("/forgotPassword", UserController.forgotPassword)
router.post("/resetPassword", UserController.resetPassword)
router.put("/updateProfile",authenticate, upload.single('profilePic'), UserController.updateProfile)





module.exports = router