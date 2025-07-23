import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const CartPage = () => {
  const [cartItems, setCarItems] = useState(
    JSON.parse(localStorage.getItem("items")) || []
  );

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }
    const newCartItems = cartItems.map((item) =>
      item.id === id ? { ...item, itemQuantity: newQuantity } : item
    );
    localStorage.setItem("items", JSON.stringify(newCartItems));
    setCarItems(newCartItems);
  };

  const removeItem = (id) => {
    let newCartItems = cartItems.filter((item) => item.id !== id);
    localStorage.setItem("items", JSON.stringify(newCartItems));
    setCarItems(newCartItems);
  };

  const getTotalPrice = (item) => {
    const total =
      item.itemQuantity * parseFloat(item.price.replaceAll(".", ""));
    return total;
  };

  const getTotalItems = () => {
    return cartItems.reduce(
      (total, item) =>
        total + item.itemQuantity * parseFloat(item.price.replaceAll(".", "")),
      0
    );
  };

  const handlePay = (e) => {
    e.preventDefault();
    const carts = cartItems.map((cart) => ({
      ...cart,
      price: parseFloat(cart.price.replaceAll(".", "")),
    }));
    console.log(carts);
  };

  return (
    <div className="flex flex-col py-12  items-center justify-center">
      <h2 className="text-center text-4xl">Giỏ hàng</h2>

      <div className="w-full sm:max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {cartItems.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Giỏ hàng của bạn đang trống
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 border border-gray-100/100 text-white px-6 py-3  transition-colors"
            >
              Tiếp tục mua sắm
            </Link>
          </div>
        ) : (
          <div className="font-light items-center justify-center lg:grid lg:grid-cols-12 lg:gap-8 ">
            {/* Cart Items */}
            <div className="lg:col-span-8 p-4">
              <div className="shadow-sm">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-gray-600 dark:text-gray-300">
                      <th className="p-2 sm:p-4 font-medium">Sản phẩm</th>
                      <th className="hidden sm:table-cell p-2 sm:p-4 font-medium">
                        Số lượng
                      </th>
                      <th className="hidden sm:table-cell p-2 sm:p-4 font-medium text-right">
                        Tổng cộng
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item, idx) => (
                      <tr
                        key={item.id}
                        className="text-sm text-gray-800 dark:text-gray-200"
                      >
                        {/* Product */}
                        <td className="p-3 sm:p-4 flex items-center gap-4">
                          <figure className="w-16 h-16 border border-gray-100/10">
                            <img
                              src={item?.image || "defaultLaptop.jpg"}
                              alt={item.name}
                              className="w-16 h-16 object-cover"
                            />
                          </figure>
                          <div className="flex flex-col sm:inline-block gap-2">
                            <span className="font-medium">{item.name}</span>
                            <div className="flex items-center gap-4 sm:hidden">
                              <div className="flex items-center border border-gray-100/10 ">
                                <button
                                  onClick={() =>
                                    updateQuantity(
                                      item.id,
                                      item.itemQuantity - 1
                                    )
                                  }
                                  className="p-2 cursor-pointer"
                                >
                                  <Minus className="w-4 h-4" />
                                </button>
                                <p className="px-4 py-2">{item.itemQuantity}</p>
                                <button
                                  onClick={() =>
                                    updateQuantity(
                                      item.id,
                                      item.itemQuantity + 1
                                    )
                                  }
                                  className="p-2 cursor-pointer"
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                              </div>

                              <button
                                onClick={() => removeItem(item.id)}
                                className="dark:text-white text-black"
                                title="Xóa sản phẩm"
                              >
                                <svg
                                  aria-hidden="true"
                                  focusable="false"
                                  width="16"
                                  part="icon"
                                  viewBox="0 0 16 17"
                                >
                                  <path
                                    stroke="currentColor"
                                    fill="none"
                                    d="M2 4.5h12M3.5 4.5h9v10h-9v-10ZM6.5 7v5M9.5 7v5M5.5 4.5a2.5 2.5 0 1 1 5 0"
                                  ></path>
                                </svg>
                              </button>
                            </div>
                          </div>
                        </td>

                        {/* Quantity Controls */}
                        <td className="p-3 sm:p-4 hidden sm:table-cell">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center border border-gray-100/10 ">
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.itemQuantity - 1)
                                }
                                className="p-2 cursor-pointer"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <p className="px-4 py-2">{item.itemQuantity}</p>
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.itemQuantity + 1)
                                }
                                className="p-2 cursor-pointer"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>

                            <button
                              onClick={() => removeItem(item.id)}
                              className="dark:text-white text-black"
                              title="Xóa sản phẩm"
                            >
                              <svg
                                aria-hidden="true"
                                focusable="false"
                                width="16"
                                part="icon"
                                viewBox="0 0 16 17"
                              >
                                <path
                                  stroke="currentColor"
                                  fill="none"
                                  d="M2 4.5h12M3.5 4.5h9v10h-9v-10ZM6.5 7v5M9.5 7v5M5.5 4.5a2.5 2.5 0 1 1 5 0"
                                ></path>
                              </svg>
                            </button>
                          </div>
                        </td>

                        {/* Subtotal */}
                        <td className=" p-2 sm:p-4 font-semibold text-right">
                          {formatPrice(getTotalPrice(item))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-4 mt-6 lg:mt-0">
              <div className="border border-gray-100/20 shadow-sm lg:sticky lg:top-4">
                <div className="p-4 sm:p-6">
                  <div className="space-y-3 dark:text-gray-400">
                    <div className="flex justify-between text-sm sm:text-base">
                      <span>Tổng tiền hàng</span>
                      <span>{formatPrice(getTotalItems())}</span>
                    </div>

                    <div className="flex justify-between text-sm sm:text-bas">
                      <span>Tổng thanh toán</span>
                      <span>{formatPrice(getTotalItems())}</span>
                    </div>
                    <p className="text-sm">
                      Thuế và phí vận chuyển được tính khi thanh toán
                    </p>
                    <hr className="border-gray-200 dark:border-gray-700" />
                    <div className="flex justify-between text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                      <span>Tổng</span>
                      <span>{formatPrice(getTotalItems())}</span>
                    </div>
                  </div>

                  <button
                    onClick={handlePay}
                    className="cursor-pointer relative overflow-hidden w-full text-white py-2.5 sm:py-3 px-4 border dark:border-gray-100/10 mt-4 sm:mt-6 font-medium text-sm sm:text-base
                    transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
                  >
                    Thanh toán
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
