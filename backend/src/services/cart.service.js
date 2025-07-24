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
        include: {
          model: db.Product,
          as: "products",
        },
      },
    });

    if (!cart) {
      cart = await this.create(userId);
    }

    return cart;
  }

  async createCart(userId) {
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

    await cart.save();
    const newCart = await db.Cart.findOne({
      where: { id: cartId },
      include: {
        model: db.CartDetail,
        as: "cartDetails",
        include: {
          model: db.Product,
          as: "products",
        },
      },
    });

    return newCart;
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
      const priceDiscount =
        product.price - (product.price * product.discount) / 100;
      cartItem = await db.CartDetail.create({
        cartId,
        productId,
        quantity,
        price: priceDiscount,
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
