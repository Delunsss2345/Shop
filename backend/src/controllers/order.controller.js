const OrderService = require("@/services/order.service");
class OrderController {
  async createOrder(req, res) {
    const { shipName, shipPhone, shipAddress } = req.body;
    const userId = req.user.id;
    const result = await OrderService.createOrder(
      shipName,
      shipPhone,
      shipAddress,
      userId
    );
    res.success(201, "Thanh toán thành công", result);
  }
}

module.exports = new OrderController();
