const db = require("@/db/models/index");

const UserService = require("@/services/user.service");
const ProductService = require("@/services/product.service");
const ApiError = require("@/utils/error/ApiError");

class CartService {
  async findCartByUserId(userId) {
    const user = await UserService.findUserById(userId);
    const cart = await db.Cart.findOne({
      where: { userId: user.id },
      include: {
        model: db.CartDetail,
        as: "cartDetails",
      },
    });

    if (!cart) throw new ApiError(404, "Người dùng không có giỏ hàng");

    return cart;
  }

  async createCart(userId) {
    const user = await UserService.findUserById(userId);
    const cart = await db.Cart.create({
      userId: user.id,
    });

    return cart;
  }
  async updateTotal(cartId) {
    const cartItems = await db.CartDetail.findAll({
      where: { cartId },
    });

    const total = cartItems.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );

    const cart = await db.Cart.findByPk(cartId);
    cart.total = total;

    return await cart.save();
  }

  async addItem(productId, quantity, userId) {
    const cart = await this.findCartByUserId(userId);
    const cartId = cart.id;

    let cartItem = await db.CartDetail.findOne({
      where: {
        cartId,
        productId,
      },
    });

    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      const product = await ProductService.getProductById(productId);

      cartItem = await db.CartDetail.create({
        cartId,
        productId,
        quantity,
        price: product.price,
      });
    }

    return await this.updateTotal(cartId);
  }
  async updateItem(productId, quantity, cartId) {
    await db.CartDetail.update({ quantity }, { where: { cartId, productId } });

    return await this.updateTotal(cartId);
  }
  async removeItem(cartId, productId) {
    await db.CartDetail.destroy({ where: { cartId, productId } });

    return await this.updateTotal(cartId);
  }
}

module.exports = new CartService();
