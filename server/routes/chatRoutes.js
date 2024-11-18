const { Router } = require("express");
const { auth } = require("../middleware/authMiddleware");
const { accessChat, fetchChats, createGroupChat, renameGroupChat, addToGroup, removeFromGroup } = require("../controllers/chatController");
const router = Router();

// Tìm đoạn chat chung của 1 user hiện tại đang đăng nhập với userId truyền vào, nếu ko có tự tạo ra đoạn chat 
router.post('/',auth, accessChat);
// Tìm tất cả đoạn chat của user đang đăng nhập 
router.get('/', auth, fetchChats); 
router.post('/group', auth, createGroupChat);
router.put('/rename', auth, renameGroupChat);
router.put('/groupremove', auth, removeFromGroup);
router.put('/groupadd', auth, addToGroup);   

module.exports = router;