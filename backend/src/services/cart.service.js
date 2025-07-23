const db = require("@/db/models/index");

const ApiError = require("@/utils/error/ApiError");

class CartService {
  async updateTotal(cartId) {
    const cartItems = await db.CartDetails.findAll({
      where: { cartId },
    });

    const total = cartItems.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );

    await db.Cart.update({ total }, { where: { id: cartId } });

    return total;
  }
  async addItem(cartId, productId, quantity, userId) {
    const cart = await db.Cart.findOne({
      where: { userId },
    });

    if (!cart) throw new ApiError(404, "Không có cart hoặc người dùng này");

    let cartItem = await db.CartDetails.findOne({
      where: {
        cartId,
        productId,
      },
    });
    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      const product = await db.Product.findByPk(productId);

      if (!product) throw new ApiError(404, "Không có sản phẩm này");

      cartItem = await db.CartDetails.create({
        cartId,
        productId,
        quantity,
        price: product.price,
      });
    }

    const total = await this.updateTotal(cartId);
    return total;
  }
  async updateItem(productId, quantity, cartId) {
    await db.CartDetails.update({ quantity }, { where: { cartId, productId } });

    const total = await this.updateTotal(cartId);
    return total;
  }
  async removeItem(cartId, productId) {
    await db.CartDetails.destroy({ where: { cartId, productId } });

    const total = await this.updateTotal(cartId);
    return total;
  }
}

module.exports = new CartService();
