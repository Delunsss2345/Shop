const UserService = require("@/services/user.service");

const getAllUser = async (req, res) => {
    const users = await UserService.findAllUsers();
    res.success(200, "Get user thành công", users);
};

const createUser = async (req, res) => {
    const user = await UserService.createUser(req.body);

    res.success(201, "Tạo user thành công", user);
};

const getUserById = async (req, res) => {
    const user = await UserService.findUserById(req.params.id);
    res.success(200, "Lấy user thành công", user);
};

const updateUser = async (req, res) => {
    const user = await UserService.updateUser(req.params.id, req.body);
    res.success(200, "Cập nhật user thành công", user);
};

const deleteUser = async (req, res) => {
    const result = await UserService.deleteUser(req.params.id);
    res.success(200, "Vô hiệu hoá user thành công", result);
};

module.exports = { 
    getAllUser,
    createUser,
    getUserById,
    updateUser,
    deleteUser
}; 