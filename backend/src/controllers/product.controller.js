const ProductService = require("@/services/product.service");
const { matchedData } = require("express-validator");

class ProductController {
  async getAll(req, res) {
    const products = await ProductService.findAll();
    res.success(200, "Lấy tất cả sản phẩm thành công", products);
  }

  async getAllProducts(req, res) {
    const data = matchedData(req, { locations: ["query"] }); //to Int hoặc động khi dùng vậy
    const page = data.page || 1;
    const limit = data.limit || 4;
    const products = await ProductService.getAllProducts(page, limit);
    res.success(200, "Phân chia sản phẩm thành công", products);
  }

  async createProduct(req, res) {
    const product = await ProductService.createProduct(req.body);
    res.success(201, "Tạo sản phẩm thành công", product);
  }

  async getProductById(req, res) {
    const { id } = req.params;
    const product = await ProductService.getProductById(id);
    res.success(200, "Lấy sản phẩm thành công", product);
  }

  async getFeatureProduct(req, res) {
    const product = await ProductService.getFeatureProduct();
    res.success(200, "Lấy sản phẩm nổi bật thành công", product);
  }

  async updateProduct(req, res) {
    const { id } = req.params;
    const product = await ProductService.updateProduct(id, req.body);
    res.success(200, "Cập nhập sản phẩm thành công", product);
  }

  async deleteProduct(req, res) {
    const { id } = req.params;
    await ProductService.deleteProduct(id);
    res.success(200, "Xoá sản phẩm thành công");
  }
}

module.exports = new ProductController();
