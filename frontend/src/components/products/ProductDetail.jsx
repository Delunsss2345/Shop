import { useCartStore } from "@/store/useCartStore";
import { useProductStore } from "@/store/useProductStore";
import {
  Headphones,
  Heart,
  Minus,
  Percent,
  Plus,
  Settings,
  Shield,
  ShoppingCart,
  Truck,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const [quantity, setQuantity] = useState(1);
  const [isWishlist, setIsWishlist] = useState(false);
  const { addItem } = useCartStore();
  const { getProductById, selectedProduct } = useProductStore();
  const { id } = useParams();

  useEffect(() => {
    getProductById(id);
  }, [getProductById, id]);

  if (!selectedProduct)
    return <div className="p-10 text-center">Đang tải sản phẩm...</div>;

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const discountPrice = (price, discount) => {
    const discountPrice = price * (discount / 100);
    return formatPrice(price - discountPrice);
  };

  const handleQuantityChange = (type) => {
    if (type === "increase") {
      setQuantity(quantity + 1);
    } else if (type === "decrease") {
      setQuantity(quantity - 1);
    }
  };

  const handleShopping = async (e) => {
    e.preventDefault();
    const { id } = selectedProduct;
    await addItem(id, quantity);
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Images (Sticky) */}
          <div className="lg:sticky lg:top-8 lg:h-fit">
            {/* Main Image */}
            <div className="relative mb-4">
              <img
                src={selectedProduct?.image || "/defaultLaptop.jpg"}
                alt={selectedProduct?.name}
                className="w-full h-96 sm:h-[500px] object-cover rounded-lg shadow-lg"
              />
              {selectedProduct.discount > 0 && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  -{selectedProduct.discount}%
                </div>
              )}
              <button
                onClick={() => setIsWishlist(!isWishlist)}
                className="absolute top-4 right-4 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-shadow"
              >
                <Heart
                  className={`w-6 h-6 ${
                    isWishlist
                      ? "text-red-500 fill-current"
                      : "text-gray-600 dark:text-gray-400"
                  }`}
                />
              </button>
            </div>

            {/* Chính sách sản phẩm */}
            <div className=" rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Chính sách sản phẩm
                </h3>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Tìm hiểu thêm
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* Row 1: 2 items */}
                <div className="flex items-start gap-2 p-3 rounded-lg">
                  <Shield className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white text-sm">
                      Hàng chính hãng - Bảo hành 12 tháng
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2 p-3 rounded-lg">
                  <Truck className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white text-sm">
                      Giao hàng miễn phí toàn quốc
                    </div>
                  </div>
                </div>

                {/* Row 2: 2 items */}
                <div className="flex items-start gap-2 p-3 rounded-lg">
                  <Settings className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white text-sm">
                      Hỗ trợ cài đặt miễn phí
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2 p-3 rounded-lg">
                  <Headphones className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white text-sm">
                      Kỹ thuật viên hỗ trợ trực tuyến
                    </div>
                  </div>
                </div>

                {/* Row 3: 1 item spanning full width */}
                <div className="col-span-2 flex items-start gap-2 p-3 rounded-lg">
                  <Percent className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white text-sm">
                      Chiết khấu dành riêng cho doanh nghiệp
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - selectedProduct Info (Scrollable) */}
          <div className="space-y-6">
            {/* selectedProduct Header */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">
                {selectedProduct.name}
              </h1>

              {/* Price */}
              <div className="flex flex-col items-start gap-3">
                <span className="text-3xl dark:text-white font-bold">
                  {discountPrice(
                    selectedProduct.price,
                    selectedProduct.discount
                  )}
                </span>
                <span className="text-lg line-through text-gray-500">
                  {formatPrice(selectedProduct.price)}
                </span>
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-3">Số lượng</h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                    <button
                      onClick={() => handleQuantityChange("decrease")}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 py-2 font-semibold">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange("increase")}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleShopping}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Thêm vào giỏ hàng
                </button>
              </div>
            </div>

            {/* selectedProduct Description */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Mô tả sản phẩm
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {selectedProduct.detailDesc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
