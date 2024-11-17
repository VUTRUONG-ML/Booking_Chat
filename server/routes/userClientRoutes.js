const { Router } = require("express");
const {registerUser, authUser} = require("../controllers/userClientController");
const router = Router();

router.route('/').post(registerUser);
router.post('/login', authUser);
module.exports = router;