import { useProductStore } from "@/store/useProductStore";
import { Save, Upload, X } from "lucide-react";
import { useEffect, useState } from "react";

const ProductModal = ({
  isOpen,
  isCreate,
  onEdit,
  onClose,
  product,
  isViewMode = true,
  onSave,
}) => {
  const { loading } = useProductStore();
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    factory: "",
    categoryId: "1",
    quantity: "",
    detailDesc: "",
    image: "",
  });
  const [isEditing, setIsEditing] = useState(!isViewMode);

  useEffect(() => {
    if (product) {
      setFormData({
        id: product.id,
        name: product.name || "",
        price: product.price || "",
        factory: product.factory || "",
        categoryId: product.category.categoryId || "1",
        quantity: product.quantity || "",
        detailDesc:
          product.detailDesc ||
          "High-quality product with excellent features and performance.",
        image: product.image || "/defaultLaptop.jpg",
      });
    }
    setIsEditing(!isViewMode);
  }, [product, isViewMode]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };
  const handleImageProduct = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const readFile = new FileReader();
    readFile.onload = () => {
      const result = readFile.result;
      setImagePreview(result);
    };
    readFile.readAsDataURL(file);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    if (onSave) {
      const dataToSave = {
        ...formData,
        image: imagePreview || formData.image,
      };
      await onSave(dataToSave);
    }

    // Logic save product
    onClose();
  };

  const handleUpdate = async () => {
    const dataToSave = {
      ...formData,
      image: imagePreview || formData.image,
    };
    await onEdit(dataToSave);
    onClose();
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    if (product) {
      setFormData({
        id: product.id,
        name: product.name || "",
        price: product.price || "",
        factory: product.factory || "",
        categoryId: product.category.categoryId || "",
        quantity: product.quantity || "",
        detailDesc:
          product.detailDesc ||
          "High-quality product with excellent features and performance.",
        image: product.image || "/defaultLaptop.jpg",
      });
    }
    setIsEditing(!isViewMode);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/45 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {isCreate
              ? "Create Product"
              : isEditing
              ? "Edit Product"
              : "Product Details"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Product Image */}
          <div className="text-center">
            <div className="relative inline-block">
              <input
                className="hidden"
                onChange={handleImageProduct}
                id="imageUpdate"
                type="file"
              />
              <img
                src={
                  imagePreview ||
                  formData.image ||
                  product?.image ||
                  "/defaultLaptop.jpg"
                }
                alt={formData.name}
                className="w-32 h-32 object-cover rounded-lg border border-gray-300 dark:border-gray-600"
              />
              {isEditing && (
                <label
                  htmlFor="imageUpdate"
                  className="absolute bottom-2 right-2 p-1 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                >
                  <Upload size={16} />
                </label>
              )}
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Product Name */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Product Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              ) : (
                <p className="px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white">
                  {formData.name}
                </p>
              )}
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Price
              </label>
              {isEditing ? (
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              ) : (
                <p className="px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg text-green-600 font-semibold">
                  {formatPrice(formData.price)}
                </p>
              )}
            </div>

            {/* Factory */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Factory
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="factory"
                  value={formData.factory}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              ) : (
                <p className="px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium">
                    {formData.factory}
                  </span>
                </p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              {isCreate || isEditing ? (
                <select
                  name="category"
                  value={formData.categoryId}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="1">Gaming</option>
                  <option value="2">Văn phòng</option>
                </select>
              ) : (
                <p className="px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white">
                  {product && product.category.categoryName}
                </p>
              )}
            </div>

            {/* quantity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Quantity
              </label>
              {isEditing ? (
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              ) : (
                <p className="px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <span
                    className={`px-2 py-1 rounded-full text-sm font-medium ${
                      formData.quantity > 20
                        ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                        : formData.quantity > 10
                        ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200"
                        : "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
                    }`}
                  >
                    {formData.quantity} units
                  </span>
                </p>
              )}
            </div>

            {/* detailDesc */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description
              </label>
              {isEditing ? (
                <textarea
                  name="detailDesc"
                  value={formData.detailDesc}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              ) : (
                <p className="px-3 py-2 bg-gray-50 dark:bg-gray-700 rounded-lg text-gray-900 dark:text-white">
                  {formData.detailDesc}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-700">
          {isCreate ? (
            <>
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Save size={16} />
                {loading ? "Loading..." : "Create"}
              </button>
            </>
          ) : (
            <>
              <button
                onClick={isEditing ? handleCancel : onClose}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                {isEditing ? "Cancel" : "Close"}
              </button>
              <button
                onClick={!isEditing ? handleEdit : handleUpdate}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                {!isEditing ? "Edit" : loading ? "Update..." : "Save Changes"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
