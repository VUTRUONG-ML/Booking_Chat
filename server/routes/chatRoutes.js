const { Router } = require("express");
const { protect } = require("../middleware/authMiddleware");
const { accessChat, fetchChats, createGroupChat, renameGroupChat, addToGroup, removeFromGroup } = require("../controllers/chatController");
const router = Router();

// Tìm đoạn chat chung của 1 user hiện tại đang đăng nhập với userId truyền vào, nếu ko có tự tạo ra đoạn chat 
router.post('/',protect, accessChat);
// Tìm tất cả đoạn chat của user đang đăng nhập 
router.get('/', protect, fetchChats); 
router.post('/group', protect, createGroupChat);
router.put('/rename', protect, renameGroupChat);
router.put('/groupremove', protect, removeFromGroup);
router.put('/groupadd', protect, addToGroup);   

module.exports = router;