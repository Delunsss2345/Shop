import { useProductStore } from "@/store/useProductStore";
import { Headphones, RotateCcw, Shield, Truck } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { getFeatureProducts, featureProducts } = useProductStore();

  useEffect(() => {
    getFeatureProducts();
  }, [getFeatureProducts]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const calculateDiscountPrice = (price, discount) => {
    return price * (1 - discount / 100);
  };

  const services = [
    {
      icon: <Truck className="w-8 h-8 text-blue-600" />,
      title: "Giao hàng nhanh",
      description: "Giao hàng trong 24h",
    },
    {
      icon: <Shield className="w-8 h-8 text-green-600" />,
      title: "Bảo hành chính hãng",
      description: "Bảo hành 12 tháng",
    },
    {
      icon: <RotateCcw className="w-8 h-8 text-orange-600" />,
      title: "Đổi trả dễ dàng",
      description: "Đổi trả trong 7 ngày",
    },
    {
      icon: <Headphones className="w-8 h-8 text-purple-600" />,
      title: "Hỗ trợ 24/7",
      description: "Tư vấn miễn phí",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Banner Section */}
      <div className="relative text-white">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Chào mừng đến với{" "}
              <span className="text-yellow-400">TechShop</span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl mb-8 max-w-3xl mx-auto">
              Khám phá những sản phẩm công nghệ mới nhất với chất lượng tốt nhất
              và giá cả hợp lý
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-3 rounded-lg text-lg transition-colors">
                Mua ngay
              </button>
              <Link
                to="/products"
                className="border-2 border-white hover:bg-white hover:text-gray-900 font-semibold px-8 py-3 rounded-lg text-lg transition-colors"
              >
                Xem sản phẩm
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-16 ">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-lg bg-gray-50 dark:bg-gray-900 hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-center mb-4">{service.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Products Section */}
      <div className="py-16">
        <div className="max-w-8xl mx-auto px-10 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Sản phẩm nổi bật
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Khám phá những sản phẩm công nghệ hot nhất với chất lượng cao và
              giá cả tốt nhất
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featureProducts?.map((product) => (
              <div
                key={product.id}
                className="border rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={product.image || "/defaultLaptop.jpg"}
                    alt={product.name}
                    className="w-full h-64 object-cover transition-transform duration-300"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                    {product.name}
                  </h3>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex flex-col">
                      <div className="flex items-center">
                        {product.discount > 0 && (
                          <span className="text-sm text-gray-500 line-through">
                            {formatPrice(product.price)}
                          </span>
                        )}
                        {product.discount > 0 && (
                          <div className="text-red-600 px-2 py-1 rounded-md text-sm font-semibold">
                            -{product.discount}%
                          </div>
                        )}
                      </div>
                      <span className="text-lg font-semibold">
                        {formatPrice(
                          calculateDiscountPrice(
                            product.price,
                            product.discount
                          )
                        )}
                      </span>
                    </div>
                  </div>

                  <Link
                    to={`product/${product.id}`}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    Xem chi tiết
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold px-8 py-3 rounded-lg transition-colors">
              Xem tất cả sản phẩm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
