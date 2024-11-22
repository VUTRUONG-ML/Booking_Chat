const { Router } = require("express");
const { protect } = require("../middleware/authMiddleware");
const {sendMessage, allMessage} = require("../controllers/messageController");
const router = Router();

router.route('/').post(protect,sendMessage);
router.route('/:chatId').get(protect,allMessage);

module.exports = router;