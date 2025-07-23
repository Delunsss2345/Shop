import { Facebook, Instagram, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      {/* Newsletter Section */}
      <div className="border-y border-gray-100/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center">
            <div className="w-16 h-16 flex items-center justify-center">
              <svg
                aria-hidden="true"
                focusable="false"
                width="24"
                viewBox="0 0 24 24"
              >
                <path
                  vectorEffect="non-scaling-stroke"
                  d="M1 3H23V21H1V3Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                ></path>
                <path
                  vectorEffect="non-scaling-stroke"
                  d="M1 6L12 12L23 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                ></path>
              </svg>
            </div>
          </div>
          <h2 className="text-lg underline uppercase mb-2">Lắng nghe ý kiến</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Mỗi góp ý của bạn đều giúp tụi mình tốt hơn mỗi ngày, vì mục tiêu
            luôn là <span className="font-semibold">100%</span> khiến bạn hài
            lòng.
          </p>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* About Us */}
            <div className="lg:col-span-1">
              <h3 className="text-lg font-semibold mb-4 text-white">
                ABOUT US
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                "Ra đời năm 2014, sứ mệnh của TechShop là giúp bạn tìm được
                chiếc laptop, từ tín kế nối và làm hướng tron vẻn những khoảnh
                khắc cũng bạn bè."
              </p>
            </div>

            {/* Links */}
            <div className="lg:col-span-1">
              <h3 className="text-lg font-semibold mb-4 text-white">LIÊN HỆ</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/about"
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    Giới thiệu
                  </Link>
                </li>
                <li>
                  <Link
                    to="/business"
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    Hợp tác kinh doanh
                  </Link>
                </li>
                <li>
                  <Link
                    to="/careers"
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    Tuyển dụng
                  </Link>
                </li>
                <li>
                  <Link
                    to="/blog"
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            {/* Customer Support */}
            <div className="lg:col-span-1">
              <h3 className="text-lg font-semibold mb-4 text-white">
                HỖ TRỢ KHÁCH HÀNG
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/size-guide"
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    Hướng dẫn chọn size & bảo quản
                  </Link>
                </li>
                <li>
                  <Link
                    to="/faq"
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    Câu hỏi thường gặp
                  </Link>
                </li>
              </ul>
            </div>

            {/* Customer Policies */}
            <div className="lg:col-span-1">
              <h3 className="text-lg font-semibold mb-4 text-white">
                CHÍNH SÁCH KHÁCH HÀNG
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/privacy"
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    Thông tin bản quyền website
                  </Link>
                </li>
                <li>
                  <Link
                    to="/security"
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    Chính sách bảo mật & quyền riêng tư
                  </Link>
                </li>
                <li>
                  <Link
                    to="/membership"
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    Chính sách khách hàng thân thiết
                  </Link>
                </li>
                <li>
                  <Link
                    to="/warranty"
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    Chính sách đổi, trả và bảo hành
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company Info */}
            <div className="lg:col-span-1">
              <h3 className="text-lg font-semibold mb-4 text-white">
                CÔNG TY CỔ PHẦN TECHSHOP
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-300 text-sm">Địa chỉ: Hồ chí minh</p>
                </div>
                <div className="text-gray-300 text-sm mt-4">
                  <p>
                    Mã số doanh nghiệp: 0814893279. Giấy chứng nhận đăng ký
                    doanh nghiệp do Sở kế hoạch và Đầu tư TP Hồ Chí Minh cấp lần
                    đầu ngày 18/08/2015.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="text-center">
              <p className="text-gray-400 text-sm">
                © 2025 - Copyright by TechShop
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="tel:+84123456789"
                className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
