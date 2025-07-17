import ProductTable from "@/components/admin/products/ProductTable";
import StatCard from "@/components/common/SlatCard";
import { motion } from "framer-motion";
import { HandCoins, Package, TrendingUp, TriangleAlert } from "lucide-react";

const ProductPage = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <StatCard
          icon={<Package size={20} className="text-green-400" />}
          title="Total Products"
          stat={"1234"}
        />
        <StatCard
          icon={<TrendingUp size={20} className="text-purple-400" />}
          title="Top Selling"
          stat={"89"}
        />
        <StatCard
          icon={<TriangleAlert size={20} className="text-yellow-600" />}
          title="Total Sales"
          stat={"23"}
        />
        <StatCard
          icon={<HandCoins size={20} className="text-blue-400" />}
          title="Total Revenue"
          stat={"1,233,345 VND"}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-6"
      >
        <ProductTable />
      </motion.div>
    </>
  );
};

export default ProductPage;
