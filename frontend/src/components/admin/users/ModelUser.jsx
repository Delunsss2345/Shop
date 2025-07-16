import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useUserStore } from "@/store/useUserStore";

const ModelUser = ({ open, onClose, isCreate, user, onCreate }) => {
    const { updateUser, deleteUser, isLoading } = useUserStore();
    const [firstName, setFirstName] = useState(user?.firstName || "");
    const [lastName, setLastName] = useState(user?.lastName || "");
    const [email, setEmail] = useState(user?.email || "");
    const [phone, setPhone] = useState(user?.phone || "");
    const [role, setRole] = useState(user?.role.code || "user");
    const [avatar, setAvatar] = useState(user?.avatar || "https://ui-avatars.com/api/?name=User");
    const [imagePreview, setImagePreview] = useState(null);
    useEffect(() => {

        if (user) {
            setFirstName(user.firstName || "");
            setLastName(user.lastName || "");
            setEmail(user.email || "");
            setPhone(user.phone || "");
            setAvatar(user.avatar || "https://ui-avatars.com/api/?name=User");
            setRole(user.role?.code || "user");
        }
        else {
            setFirstName("");
            setLastName("");
            setEmail("");
            setAvatar("https://ui-avatars.com/api/?name=User");
            setPhone("");
            setRole("user");
            setImagePreview(null);
        }
    }, [user, open]);
    if (!open) return null;

    const handleUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = function (e) {
            setImagePreview(e.target.result);
        };

        reader.readAsDataURL(file); //Chạy bất đồng bộ đặt ở sau cho chắc chạy kịp
    }


    const handleCreate = async (e) => {
        e.preventDefault();
        const roleId = role === "admin" ? 1 : 2;

        await onCreate({ firstName, lastName, email, phone, roleId, avatar: imagePreview || avatar });

    }

    const handleEdit = async (e) => {
        e.preventDefault();
        const roleId = role === "admin" ? 1 : 2;

        const res = await updateUser(Number(user.id), { firstName, lastName, email, phone, roleId, avatar: imagePreview || avatar });
        if (res) {
            onClose();
        }
    }

    const onDelete = (e) => {
        e.preventDefault();
        deleteUser(Number(user.id));
        onClose();
    }
    return (
        <>
            <div className="fixed inset-0 flex items-center justify-center bg-black/50" onClick={onClose}>
                <div
                    className="absolute rounded-2xl z-100 shadow-xl w-full max-w-lg p-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Close button */}
                    <button
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                        onClick={onClose}
                    >
                        <span className="text-2xl">&times;</span>
                    </button>

                    {/* Avatar and info */}
                    <div className="flex items-center gap-4 mb-6">
                        <img
                            src={imagePreview || user?.avatar || "https://ui-avatars.com/api/?name=User"}
                            alt="Profile"
                            className="object-cover w-20 h-20 rounded-full border-4 border-white dark:border-gray-800 shadow"
                        />
                        <div>
                            <div className="font-semibold text-lg text-gray-900 dark:text-white">
                                {firstName !== "" && lastName !== "" ? `${firstName} ${lastName}` : "New User"}
                            </div>
                            <div className="text-gray-500 dark:text-gray-400 text-sm">{email}</div>
                            <div className="text-xs text-blue-600 dark:text-blue-400 mt-1 capitalize">
                                {role || 'User'}
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <form onSubmit={isCreate ? handleCreate : handleEdit} className="space-y-6">
                        <div className="space-y-4">
                            {/* Name */}
                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                                    Name
                                </label>
                                <div className="flex gap-2">
                                    <input
                                        className="flex-1 border rounded-lg px-3 py-2 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                                        value={firstName}
                                        onChange={e => setFirstName(e.target.value)}
                                        placeholder="First name"
                                    />
                                    <input
                                        className="flex-1 border rounded-lg px-3 py-2 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                                        value={lastName}
                                        onChange={e => setLastName(e.target.value)}
                                        placeholder="Last name"
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                                    Email address
                                </label>
                                <input
                                    className="w-full border rounded-lg px-3 py-2 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="Email"
                                    type="email"
                                />
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                                    Phone number
                                </label>
                                <input
                                    className="w-full border rounded-lg px-3 py-2 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                                    value={phone}
                                    onChange={e => setPhone(e.target.value)}
                                    placeholder="+1 (555) 000-0000"
                                    type="tel"
                                />
                            </div>

                            {/* Role */}
                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                                    Role
                                </label>
                                <select
                                    className="w-full border rounded-lg px-3 py-2 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                                    value={role}
                                    onChange={e => setRole(e.target.value)}
                                >
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>

                            {/* Profile photo */}
                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                                    Profile photo
                                </label>
                                <div className="flex items-center gap-4">
                                    <input onChange={handleUpload} className="hidden" type="file" id="avatar-upload" />
                                    <img
                                        src={imagePreview || avatar}
                                        alt="Profile"
                                        className="w-14 h-14 rounded-full border-4 border-white dark:border-gray-800 shadow object-cover"
                                    />
                                    <label
                                        htmlFor="avatar-upload"
                                        className="px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300"
                                    >
                                        Click to replace
                                    </label>
                                </div>
                            </div>
                        </div>
                        {/* Actions */}
                        <div className="flex items-center justify-between mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
                            {!isCreate && (
                                <button
                                    type="button"
                                    className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30"
                                    onClick={onDelete}
                                >
                                    <Trash2 size={16} />
                                    Delete user
                                </button>
                            )}
                            <div className="flex gap-3 ml-auto">
                                <button
                                    type="button"
                                    className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                                    onClick={onClose}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
                                >
                                    {isCreate ? "Create User" : isLoading ? "Updating..." : "Update User"}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default ModelUser;
