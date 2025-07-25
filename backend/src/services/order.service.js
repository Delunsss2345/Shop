const db = require("@/db/models/index");
const UserService = require("@/services/user.service");
const ApiError = require("@/utils/error/ApiError");

class OrderService {
  async createOrder(shipName, shipPhone, shipAddress, userId) {
    const t = await db.sequelize.transaction();
    try {
      const user = await UserService.findUserById(userId);

      const order = await db.Order.create(
        {
          userId,
          shipName,
          shipPhone,
          shipAddress,
        },
        { transaction: t }
      );
      console.log(db.Order);

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
        transaction: t,
      });

      const cartDetails = cart.cartDetails;
      let total = 0;
      for (const detail of cartDetails) {
        const price = detail.products.price;
        const discount = detail.products.discount;
        const quantity = detail.quantity;

        await db.OrderDetail.create(
          {
            orderId: order.id,
            productId: detail.productId,
            quantity,
            price,
            discount,
          },
          { transaction: t }
        );

        total += (price - (discount / 100) * price) * quantity;
      }

      order.total = total;
      await order.save({ transaction: t });
      await cart.destroy({ transaction: t });

      await t.commit();
      return order;
    } catch (err) {
      await t.rollback();
      console.error(err);
      throw new ApiError(500, "Có lỗi tạo thanh toán");
    }
  }
}

module.exports = new OrderService();
