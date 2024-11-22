const { Router } = require("express");
const { protect } = require("../middleware/authMiddleware");
const {registerUser, authUser, allUsers} = require("../controllers/userClientController");
const router = Router();

//Nếu là get thì tìm user bằng keyword
router.route('/').post(registerUser).get(protect,allUsers);
router.post('/login', authUser);
module.exports = router;