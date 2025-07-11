const express = require('express');
const router = express.Router();
const { 
    getAllUser, 
    createUser, 
    getUserById, 
    updateUser, 
    deleteUser 
} = require('@/controllers/user.controller');

// GET /api/users - Lấy tất cả users
router.get("/", getAllUser);

// POST /api/users - Tạo user mới
router.post("/", createUser);

// GET /api/users/:id - Lấy user theo ID
router.get("/:id", getUserById);


// PUT /api/users/:id - Xóa user
router.put("/block/:id", deleteUser);

// PUT /api/users/:id - Cập nhật user
router.put("/:id", updateUser);


module.exports = router; 