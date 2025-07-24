const CartService = require("@/services/cart.service");
class CartController {
  async createCart(req, res) {
    const cart = await CartService.createCart(req.user.id);
    res.success(200, "Tạo giỏ hàng thành công", cart);
  }
  async getCart(req, res) {
    const cart = await CartService.findCartByUserId(req.user.id);
    res.success(200, "Lấy giỏ hàng thành công", cart);
  }

  async addItem(req, res) {
    const { productId, quantity } = req.body;
    const cart = await CartService.addItem(productId, quantity, req.user.id);
    res.success(200, "Thêm sản phẩm vào giỏ thành công", cart);
  }
  async updateItem(req, res) {
    const { id } = req.params;
    const { productId, quantity } = req.body;
    const cart = await CartService.updateItem(productId, quantity, id);
    res.success(200, "Thêm số lương sản phẩm thành công", cart);
  }
  async removeItem(req, res) {
    const { id } = req.params;
    const { productId } = req.body;
    const cart = await CartService.removeItem(productId, id);
    res.success(200, "Xoá sản phẩm khỏi giỏ thành công", cart);
  }
}

module.exports = new CartController();
