const { Router } = require("express");
const { auth } = require("../middleware/authMiddleware");
const {getChat} = require("../controllers/chatController");
const router = Router();
router.get("/",  getChat);


module.exports = router;