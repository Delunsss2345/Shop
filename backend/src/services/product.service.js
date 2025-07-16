const db = require("@/db/models/index");
const CloudinaryService = require("@/services/cloudinary.service");
class ProductService {
  async getAllProducts() {
    const products = await db.Product.findAll({
      order: [["created_at", "DESC"]],
    });

    return products;
  }

  async createProduct(data) {
    let imageProduct;
    if (data?.image) {
      imageProduct = await CloudinaryService.uploadCloudinary(
        data.image,
        "product"
      );
    }

    const newProduct = await db.Product.create({
      ...data,
      ...(imageProduct && { image: imageProduct }),
    });

    return newProduct;
  }

  async getProductById(id) {}

  async updateProduct(id, data) {}

  async deleteProduct(id) {}

  async blockProduct(id) {}
}

module.exports = new ProductService();
