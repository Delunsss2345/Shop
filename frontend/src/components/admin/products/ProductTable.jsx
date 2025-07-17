import { AlertTriangle, Eye, Trash2 } from "lucide-react";
import { useState } from "react";
import ProductModal from "./ProductModal";

const ProductTable = () => {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isViewMode, setIsViewMode] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [productList, setProductList] = useState([
    {
      id: 1,
      name: "iPhone 15 Pro Max 256GB",
      price: 29990000,
      factory: "Apple",
      image: "/api/placeholder/60/60",
      stock: 25,
      category: "Smartphone",
    },
    {
      id: 2,
      name: "Samsung Galaxy S24 Ultra",
      price: 26990000,
      factory: "Samsung",
      image: "/api/placeholder/60/60",
      stock: 18,
      category: "Smartphone",
    },
    {
      id: 3,
      name: "MacBook Pro M3 14 inch",
      price: 52990000,
      factory: "Apple",
      image: "/api/placeholder/60/60",
      stock: 12,
      category: "Laptop",
    },
    {
      id: 4,
      name: "Dell XPS 13 Plus",
      price: 35990000,
      factory: "Dell",
      image: "/api/placeholder/60/60",
      stock: 8,
      category: "Laptop",
    },
    {
      id: 5,
      name: "AirPods Pro 2nd Gen",
      price: 6990000,
      factory: "Apple",
      image: "/api/placeholder/60/60",
      stock: 45,
      category: "Audio",
    },
    {
      id: 6,
      name: "iPad Air M2 11 inch",
      price: 16990000,
      factory: "Apple",
      image: "/api/placeholder/60/60",
      stock: 22,
      category: "Tablet",
    },
    {
      id: 7,
      name: "Sony WH-1000XM5",
      price: 8990000,
      factory: "Sony",
      image: "/api/placeholder/60/60",
      stock: 15,
      category: "Audio",
    },
    {
      id: 8,
      name: "Apple Watch Series 9",
      price: 10990000,
      factory: "Apple",
      image: "/api/placeholder/60/60",
      stock: 30,
      category: "Wearable",
    },
  ]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const filteredProducts = productList.filter(
    (product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.factory.toLowerCase().includes(search.toLowerCase())
  );

  const handleView = (product) => {
    setSelectedProduct(product);
    setIsViewMode(true);
    setShowModal(true);
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setIsViewMode(false);
    setShowModal(true);
  };

  const handleDelete = (product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (productToDelete) {
      setProductList((prev) => prev.filter((p) => p.id !== productToDelete.id));
      console.log("Deleted product:", productToDelete);
    }
    setShowDeleteModal(false);
    setProductToDelete(null);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setProductToDelete(null);
  };

  const handleAdd = () => {
    const newProduct = {
      id: Math.max(...productList.map((p) => p.id)) + 1,
      name: "",
      price: 0,
      factory: "",
      image: "/api/placeholder/60/60",
      stock: 0,
      category: "Smartphone",
    };
    setSelectedProduct(newProduct);
    setIsViewMode(false);
    setShowModal(true);
  };

  const handleSaveProduct = (productData) => {
    if (
      selectedProduct &&
      selectedProduct.id &&
      productList.find((p) => p.id === selectedProduct.id)
    ) {
      // Edit existing product
      setProductList((prev) =>
        prev.map((p) =>
          p.id === selectedProduct.id
            ? { ...productData, id: selectedProduct.id }
            : p
        )
      );
    } else {
      // Add new product
      const newProduct = {
        ...productData,
        id: Math.max(...productList.map((p) => p.id)) + 1,
        image: "/api/placeholder/60/60",
      };
      setProductList((prev) => [...prev, newProduct]);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  return (
    <div className="rounded-xl p-6 border border-gray-700 w-full">
      <div className="flex flex-wrap gap-y-2 sm:gap-y-0 justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Products List</h2>
        <div className="flex gap-2">
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            <span>Add Product</span>
          </button>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:border-indigo-500 w-64"
          />
        </div>
      </div>

      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600 scrollbar-track-gray-200 dark:scrollbar-track-gray-800">
        <table className="w-full text-left min-w-[800px]">
          <thead>
            <tr className="text-sm border-b border-gray-700">
              <th className="py-3 px-2 font-semibold min-w-[60px]">ID</th>
              <th className="py-3 px-2 font-semibold min-w-[250px]">PRODUCT</th>
              <th className="py-3 px-2 font-semibold min-w-[120px]">PRICE</th>
              <th className="py-3 px-2 font-semibold min-w-[100px]">FACTORY</th>
              <th className="py-3 px-2 font-semibold min-w-[100px]">STOCK</th>
              <th className="py-3 px-2 font-semibold min-w-[120px]">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-gray-400">
                  No products found
                </td>
              </tr>
            ) : (
              filteredProducts.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-gray-800 hover:bg-gray-200 hover:dark:bg-slate-900 transition-colors"
                >
                  <td className="py-4 px-2 text-gray-300">
                    #{product.id.toString().padStart(3, "0")}
                  </td>

                  <td className="py-4 px-2">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="font-medium text-gray-900 dark:text-white truncate">
                          {product.name}
                        </div>
                        <div className="text-sm text-gray-500 truncate">
                          {product.category}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-2">
                    <span className="font-semibold text-green-600 whitespace-nowrap">
                      {formatPrice(product.price)}
                    </span>
                  </td>

                  <td className="py-4 px-2">
                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium whitespace-nowrap">
                      {product.factory}
                    </span>
                  </td>

                  <td className="py-4 px-2">
                    <span
                      className={`px-2 py-1 rounded-full text-sm font-medium whitespace-nowrap ${
                        product.stock > 20
                          ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200"
                          : product.stock > 10
                          ? "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200"
                          : "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200"
                      }`}
                    >
                      {product.stock} units
                    </span>
                  </td>

                  <td className="py-4 px-2">
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleView(product)}
                        className="p-2 rounded-lg hover:bg-blue-600 hover:text-white transition-colors text-blue-400 flex-shrink-0"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(product)}
                        className="p-2 rounded-lg hover:bg-red-600 hover:text-white transition-colors text-red-400 flex-shrink-0"
                        title="Delete Product"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <div className="text-sm text-gray-500">
          Showing {filteredProducts.length} of {productList.length} products
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1 border border-gray-600 rounded hover:bg-gray-700 transition-colors text-sm">
            Previous
          </button>
          <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm">
            1
          </button>
          <button className="px-3 py-1 border border-gray-600 rounded hover:bg-gray-700 transition-colors text-sm">
            2
          </button>
          <button className="px-3 py-1 border border-gray-600 rounded hover:bg-gray-700 transition-colors text-sm">
            Next
          </button>
        </div>
      </div>

      {/* Product Modal */}
      <ProductModal
        isOpen={showModal}
        onClose={handleCloseModal}
        product={selectedProduct}
        isViewMode={isViewMode}
        onSave={handleSaveProduct}
      />

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div
          onClick={() => setShowDeleteModal(false)}
          className="fixed inset-0 bg-black/25 flex items-center justify-center z-50"
        >
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="p-4">
              <div className="flex gap-4">
                {/* Warning Icon */}
                <div className="flex items-center justify-center size-12 bg-red-100 dark:bg-red-900 rounded-full">
                  <AlertTriangle className="size-6 text-red-600 dark:text-red-400" />
                </div>

                <div className="flex-1">
                  {/* Title */}
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Delete product
                  </h3>

                  {/* Message */}
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    You will lose all data of this product by deleting it. This
                    action cannot be undone.
                  </p>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 justify-end">
                <button
                  onClick={cancelDelete}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete Product
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductTable;
