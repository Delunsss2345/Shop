import { useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import ModelUser from "@/components/admin/users/ModelUser";
import { useUserStore } from "@/store/useUserStore";
import { useEffect } from "react";
import { useMemo } from "react";


const UserTable = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isCreate, setIsCreate] = useState(false);
    const [search, setSearch] = useState("");
    const { getAllUsers, createUser } = useUserStore();
    const users = useUserStore(state => state.users);

    useEffect(() => {
        getAllUsers();
    }, [getAllUsers]);

    const filteredUsers = useMemo(() => {
        users.sort((a, b) => {
            a.isActive = a.isActive ? 1 : 0;
            b.isActive = b.isActive ? 1 : 0;
            return b.isActive - a.isActive;
        });
        return users.filter(user => {
            const name = `${user.firstName} ${user.lastName}`.toLowerCase();
            return name.includes(search.toLowerCase());
        });
    }, [users, search]);



    const handleEdit = (user) => {
        setSelectedUser(user);
        setShowModal(true);
        setIsCreate(false);
    }


    const handleCreate = async (data) => {
        const res = await createUser(data);
        if (res) {
            setShowModal(false);
        }
    }


    const handleClose = (e) => {
        e?.preventDefault();
        e?.stopPropagation();
        setShowModal(false);
        setSelectedUser(null);
    }
    return (
        <>
            <div className="rounded-xl p-6 border border-gray-700 w-full">
                <div className="flex flex-wrap gap-y-2 sm:gap-y-0 justify-between items-center mb-4">
                    <h2 className="text-lg font-medium ">Users List</h2>
                    <div className="flex gap-2">
                        <button
                            onClick={() => {
                                setShowModal(true);
                                setIsCreate(true);
                                setSelectedUser(null);
                            }}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg border hover:bg-slate-200 hover:dark:bg-slate-900 transition-colors text-sm"
                        >
                            <span>Add User</span>
                        </button>
                        <input
                            type="text"
                            placeholder="Search users..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="bg-transparent border border-gray-600 rounded-lg px-4 py-2  focus:outline-none focus:border-indigo-500 w-64"
                        />
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-200 sm:min-w-full text-left">
                        <thead>
                            <tr className="text-sm">
                                <th className="py-2 font-semibold">NAME</th>
                                <th className="py-2 font-semibold">EMAIL</th>
                                <th className="py-2 font-semibold">ROLE</th>
                                <th className="py-2 font-semibold">STATUS</th>
                                <th className="py-2 font-semibold">ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.length === 0 ? <tr>
                                <td colSpan={5} className="py-3 text-center">No users found</td>
                            </tr> : (
                                filteredUsers.map((p) => (
                                    <tr key={p.id} className="border-t border-gray-800 hover:bg-gray-200 hover:dark:bg-slate-900 transition-colors">
                                        <td className="py-3 pl-2 flex items-center gap-3">
                                            <img src={p.avatar || "https://ui-avatars.com/api/?name=User"} alt={p.name} className="w-8 h-8 rounded-full object-cover" />
                                            <span className=" font-medium">{p.firstName + " " + p.lastName}</span>
                                        </td>
                                        <td className="py-3 font-semibold italic">{p.email}</td>
                                        <td>
                                            <span className={`text-[12px] text-white font-semibold bg-blue-800 px-2 py-1 rounded-xl capitalize`}>
                                                {p.role.code}
                                            </span>
                                        </td>
                                        <td>
                                            <span className={`${!p.isActive ? "bg-red-800" : ""} text-[12px] text-white font-semibold bg-green-800 px-2 py-1 rounded-xl`}>
                                                {p.isActive ? "Active" : "Inactive"}
                                            </span>
                                        </td>
                                        <td className="py-3 flex gap-3">
                                            <button onClick={() => handleEdit(p)} className="p-1 rounded hover:bg-indigo-600 transition-colors">
                                                <Edit size={18} className="text-indigo-400" />
                                            </button>
                                        </td>
                                    </tr>
                                )))}
                        </tbody>
                    </table>
                </div>
            </div>
            <ModelUser
                open={showModal}
                onClose={handleClose}
                onCreate={handleCreate}
                isCreate={isCreate}
                user={selectedUser}
            />
        </>
    );
};

export default UserTable;