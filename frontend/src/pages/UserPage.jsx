import UserTable from "@/components/admin/users/UserTable";
import StatCard from "@/components/common/SlatCard";
import { useUserStore } from "@/store/useUserStore";
import { motion } from "framer-motion";
import { UserPlus, UserRoundCheck, UserRoundX, Users } from "lucide-react";
import { useEffect, useMemo } from "react";

const UserPage = () => {
  const { userAll, getAll } = useUserStore();

  useEffect(() => {
    getAll();
  }, [getAll]);

  const { total, active, blocked, today } = useMemo(() => {
    let active = 0;
    let blocked = 0;
    let today = 0;
    const todayStr = new Date().toDateString(); //dạng Thu Jul 17 2025

    for (const user of userAll) {
      if (user.isActive) {
        active++;
        const createdStr = new Date(user.createdAt).toDateString();
        if (createdStr === todayStr) {
          today++;
        }
      } else {
        blocked++;
      }
    }

    return {
      total: userAll.length,
      active,
      blocked,
      today,
    };
  }, [userAll]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <StatCard
          icon={<Users size={20} className="text-highlight" />}
          title="Total Users"
          stat={total}
        />
        <StatCard
          icon={<UserPlus size={20} className="text-green-600" />}
          title="New Users Today"
          stat={today}
        />
        <StatCard
          icon={<UserRoundCheck size={20} className="text-yellow-600" />}
          title="Active Users"
          stat={active}
        />
        <StatCard
          icon={<UserRoundX size={20} className="text-red-700" />}
          title="Churn Rate"
          stat={blocked}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <UserTable />
      </motion.div>
    </>
  );
};

export default UserPage;
