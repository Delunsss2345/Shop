import { motion } from "framer-motion";

const StatCard = ({ icon, title, stat }) => {
  return (
    <motion.div
      whileHover={{
        scale: 1.01,
        y: -1,
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
      }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="px-6 py-6 space-y-4 border dark:border-white/20 rounded-2xl cursor-pointer"
    >
      <div className="flex items-center gap-3">
        <div>{icon}</div>
        <h2 className="text-sm sm:text-base lg:text-lg font-medium ">
          {title}
        </h2>
      </div>
      <p className="text-2xl sm:text-2xl font-semibold ">{stat}</p>
    </motion.div>
  );
};
export default StatCard;
