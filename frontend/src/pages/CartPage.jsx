import { ArrowLeft, Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "iPhone 15 Pro Max 256GB",
      price: 29990000,
      quantity: 1,
      image: "/api/placeholder/80/80",
      color: "Natural Titanium",
      storage: "256GB",
    },
    {
      id: 2,
      name: "Samsung Galaxy S24 Ultra",
      price: 26990000,
      quantity: 2,
      image: "/api/placeholder/80/80",
      color: "Titanium Black",
      storage: "512GB",
    },
    {
      id: 3,
      name: "MacBook Pro M3 14 inch",
      price: 52990000,
      quantity: 1,
      image: "/api/placeholder/80/80",
      color: "Space Gray",
      storage: "512GB SSD",
    },
  ]);

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
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="min-h-screen">
      {/* Cart Banner */}
      <div className=" text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-opacity-20 rounded-full flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4">
              Shopping Cart
            </h1>
            <p className="text-sm sm:text-lg text-blue-100">
              {cartItems.length > 0
                ? `You have ${getTotalItems()} item${
                    getTotalItems() > 1 ? "s" : ""
                  } in your cart`
                : "Your cart is empty"}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {cartItems.length === 0 ? (
          /* Empty Cart State */
          <div className="text-center py-16">
            <div className="w-32 h-32 bg-gray-200 dark:bg-gray-950 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart className="w-16 h-16 text-gray-400" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                    Cart Items ({getTotalItems()})
                  </h2>
                </div>

                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {cartItems.map((item) => (
                    <div key={item.id} className="p-4 sm:p-6">
                      <div className="flex flex-col md:flex-row md:items-center gap-4">
                        {/* Product Image */}
                        <div className="flex-shrink-0 sm:mx-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover"
                          />
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 sm:text-left">
                          <h3 className="text-base sm:text-md font-medium text-gray-900 dark:text-white">
                            {item.name}
                          </h3>
                        </div>

                        {/* Price and Controls - Mobile Layout */}
                        <div className="flex flex-col md:flex-row md:items-center gap-3 sm:gap-4">
                          {/* Price */}
                          <div className="sm:text-left">
                            <span className="text-base sm:text-lg font-semibold text-green-600">
                              {formatPrice(item.price)}
                            </span>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center sm:justify-start gap-3">
                            <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                className="p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                              >
                                <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                              </button>
                              <span className="px-3 py-1.5 sm:px-4 sm:py-2 min-w-[2.5rem] text-sm sm:text-base text-gray-900 dark:text-white">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                className="p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                              >
                                <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                              </button>
                            </div>

                            {/* Remove Button */}
                            <button
                              onClick={() => removeItem(item.id)}
                              className="p-1.5 sm:p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg transition-colors"
                              title="Remove item"
                            >
                              <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                            </button>
                          </div>

                          {/* Subtotal - Mobile */}
                          <div className="text-right min-w-[100px]">
                            <div className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                              {formatPrice(item.price * item.quantity)}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              Subtotal
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Continue Shopping */}
              <div className="mt-4 sm:mt-6">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium text-sm sm:text-base"
                >
                  <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                  Continue Shopping
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-4 mt-6 lg:mt-0">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm lg:sticky lg:top-4">
                <div className="p-4 sm:p-6">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Order Summary
                  </h2>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm sm:text-base text-gray-600 dark:text-gray-400">
                      <span>Subtotal ({getTotalItems()} items)</span>
                      <span>{formatPrice(getTotalPrice())}</span>
                    </div>
                    <div className="flex justify-between text-sm sm:text-base text-gray-600 dark:text-gray-400">
                      <span>Shipping</span>
                      <span>Free</span>
                    </div>
                    <div className="flex justify-between text-sm sm:text-base text-gray-600 dark:text-gray-400">
                      <span>Tax</span>
                      <span>{formatPrice(getTotalPrice() * 0.1)}</span>
                    </div>
                    <hr className="border-gray-200 dark:border-gray-700" />
                    <div className="flex justify-between text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                      <span>Total</span>
                      <span>
                        {formatPrice(getTotalPrice() + getTotalPrice() * 0.1)}
                      </span>
                    </div>
                  </div>

                  <button className="w-full bg-blue-600 text-white py-2.5 sm:py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors mt-4 sm:mt-6 font-medium text-sm sm:text-base">
                    Proceed to Checkout
                  </button>

                  <div className="mt-3 sm:mt-4 text-center">
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                      Secure checkout with SSL encryption
                    </p>
                  </div>
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
