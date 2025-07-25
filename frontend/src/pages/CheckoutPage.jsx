import { useState } from "react";

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Clog SUKE nhua đúc nam nữ trắng",
      code: "M4W6 | 36-37",
      price: 529000,
      salePrice: 522061,
      discount: 50000,
      quantity: 1,
      image: "/api/placeholder/80/80",
      freeGift: "Vớ cổ cao 2 sọc logo SH màu trắng (100% off)",
    },
    {
      id: 2,
      name: "Clog Suke nữ nhựa đúc gắn charm xanh trời",
      code: "M4W6 | 36-37",
      price: 489000,
      salePrice: 482586,
      discount: 50000,
      quantity: 1,
      image: "/api/placeholder/80/80",
      freeGift: "Vớ cổ cao logo SH màu trắng phối đỏ (100% off)",
    },
    {
      id: 3,
      name: "Giày ballet sneaker nữ Dreamie trắng",
      code: "M4W6 | 36-37",
      price: 549000,
      salePrice: 541799,
      quantity: 1,
      image: "/api/placeholder/80/80",
    },
  ]);

  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    address: "",
    phone: "",
    city: "Việt Nam",
  });

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.salePrice * item.quantity,
    0
  );
  const totalSavings = 50000;
  const total = subtotal;

  const formatPrice = (price) => {
    return price.toLocaleString("vi-VN") + " ₫";
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      {/* Row 1: Product List & Summary */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-6">Danh sách sản phẩm</h2>
        <div className="grid grid-cols-1 gap-5 auto-rows-[7rem] max-h-[calc(3*8rem)] overflow-y-auto">
          {cartItems.map((item, index) => (
            <div
              key={item.id}
              className="flex items-start space-x-4 p-4 border rounded-lg shadow-sm"
            >
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-md bg-gray-100"
                />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center text-xs">
                  {item.quantity}
                </div>
              </div>

              <div className="flex-1 space-y-2">
                <h3 className="font-medium text-base">{item.name}</h3>

                <span className="inline-flex font-semibold items-center bg-teal-50 text-teal-700 text-xs px-1.5 py-0.5 rounded-full border border-teal-200">
                  Số lượng: {item.quantity}
                </span>
              </div>

              <div className="text-right">
                {item.price > item.salePrice && (
                  <p className="text-sm text-gray-400 line-through">
                    {formatPrice(item.price)}
                  </p>
                )}
                <p className="font-semibold text-lg">
                  {formatPrice(item.salePrice)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2: Shipping Info & Payment */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Shipping Info */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Thông tin người nhận</h2>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="Họ và tên"
              value={shippingInfo.name}
              onChange={(e) =>
                setShippingInfo({ ...shippingInfo, name: e.target.value })
              }
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-base"
            />

            <input
              type="text"
              placeholder="Địa chỉ nhận hàng"
              value={shippingInfo.address}
              onChange={(e) =>
                setShippingInfo({ ...shippingInfo, address: e.target.value })
              }
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-base"
            />

            <input
              type="tel"
              placeholder="Số điện thoại"
              value={shippingInfo.phone}
              onChange={(e) =>
                setShippingInfo({ ...shippingInfo, phone: e.target.value })
              }
              className="w-full p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-base"
            />
          </div>
        </div>

        {/* Right Column - Payment Summary */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Thanh toán</h2>

          {/* Payment Summary */}
          <div className="space-y-4 p-6  rounded-lg">
            <div className="flex justify-between text-base">
              <span>Tạm tính:</span>
              <span>{formatPrice(subtotal)}</span>
            </div>

            <div className="flex justify-between text-base">
              <span>Phí vận chuyển:</span>
              <span className="text-gray-500">Miễn phí</span>
            </div>

            <hr className="border-gray-300" />

            <div className="flex justify-between font-bold text-xl">
              <span>Tổng cộng:</span>
              <span className="text-teal-600">{formatPrice(total)}</span>
            </div>
          </div>

          {/* Payment Button */}
          <button className="w-full bg-teal-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-teal-700 transition-colors">
            Xác nhận thanh toán
          </button>

          <p className="text-sm text-gray-500 text-center">
            Bằng việc đặt hàng, bạn đồng ý với{" "}
            <span className="text-teal-600">Điều khoản sử dụng</span> của chúng
            tôi
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
