const ProductService = require("@/services/product.service");

class ProductController {
  async getAllProducts(req, res) {
    const products = await ProductService.getAllProducts();
    res.success(200, "Lấy sản phẩm thành công", products);
  }

  async createProduct(req, res) {
    const product = await ProductService.createProduct(req.body);
    res.success(201, "Tạo sản phẩm thành công", product);
  }

  async getProductById(req, res) {}

  async updateProduct(req, res) {}

  async deleteProduct(req, res) {}

  async blockProduct(req, res) {}
}

module.exports = new ProductController();
