const express = require('express')
const { testUser, getAllUsers } = require('../controllers/userController')
const { signup, login } = require("../controllers/userController");
const router = express.Router()

router.get("/test",testUser)
router.get("/",getAllUsers)
router.post("/signup", signup);
router.post("/login", login);
module.exports=router