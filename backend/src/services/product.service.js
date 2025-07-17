const db = require("@/db/models/index");
const CloudinaryService = require("@/services/cloudinary.service");

const ApiError = require("@/utils/error/ApiError");

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

  async getProductById(id) {
    const product = await db.Product.findByPk(id);

    if (!product) throw new ApiError(404, "Không tìm thấy sản phẩm");

    return product;
  }

  async getFeatureProduct() {
    const products = await db.Product.findAll({
      order: [["sold", "DESC"]],
      limit: 4,
    });

    return products;
  }

  async updateProduct(id, data) {
    const product = await db.Product.findByPk(id);

    if (!product) throw new ApiError(404, "Không tìm thấy sản phẩm");

    await product.update({ ...data });

    return product;
  }

  async deleteProduct(id) {
    const res = await db.Product.destroy({ where: { id } });
    if (!res) throw new ApiError(404, "Không tìm thấy sản phẩm để xoá");

    return res;
  }
}

module.exports = new ProductService();
