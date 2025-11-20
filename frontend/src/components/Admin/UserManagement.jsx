import { useState } from "react"

const UserManagement = () => {

    const initialUsers = [
        {
            _id: 1,
            name: "Neji Kumar",
            email: "neji.kumar@example.com",
            role: "admin",
        },
        {
            _id: 2,
            name: "Garry Romanov",
            email: "garry.r@example.com",
            role: "customer",
        },
        {
            _id: 3,
            name: "Jini Song",
            email: "song_jini@example.kr.com",
            role: "admin",
        },
    ];

    const [users, setUsers] = useState(initialUsers);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "customer", // Default role is a customer
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value, });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        //Should send data to the DB
        const newUser = { ...formData, _id: Math.max(...users.map(user => user._id), 0) + 1 }
        setUsers([...users, newUser])
        // reset the form after submission to the DB
        setFormData({
            name: "",
            email: "",
            password: "",
            role: "customer",
        });
    };

    const handleRoleChange = (userId, newRole) => {// Should do a patch method to update data on DB
        console.log({ id: userId, role: newRole });
        const updatedUsers = users.map((user) => {
            if (user._id === userId) return { ...user, role: newRole };
            return user;
        });
        setUsers(updatedUsers);
    };

    const handleDeleteUser = (userId) => {
        //Should delete data from Db
        const userToDelete = users.findIndex(user => user._id === userId);
        console.log(users[userToDelete]);
        if (window.confirm("Are you sure you want to delete the user ?")) {
            //Should send a request to DB to delete the user with the userId
            const updatedUsers = users.filter((user) => user._id !== userId);
            setUsers(updatedUsers);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-6 pt-2 pb-6">
            <h2 className="text-3xl font-bold mb-8">User Management</h2>
            {/* Add New User Form */}

            <div className="p-6 rounded-lg mb-6">
                <h3 className="text-lg font-bold mb-4">Add New User</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Name</label>
                        <input type="text" name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input type="email" name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="john.smith@example.com"
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Password</label>
                        <input type="password" name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Role</label>
                        <select name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        >
                            <option value="customer">Customer</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <button type="submit"
                        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                    >
                        Add User
                    </button>
                </form>
            </div>

            {/* User List */}

            <div className="overflow-x-auto shadow-md sm:rounded-lg">
                <h3 className="text-lg font-bold mb-8">Users List</h3>
                <table className="min-w-full text-center text-gray-500">
                    <thead className="bg-gray-100 text-xs uppercase text-gray-700">
                        <tr>
                            <th className="px-4 py-3">Name</th>
                            <th className="px-4 py-3">Email</th>
                            <th className="px-4 py-3">Role</th>
                            <th className="px-4 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}
                                className="border-b hover:bg-gray-50"
                            >
                                <td className="p-4 font-medium text-gray-900 text-center whitespace-nowrap">
                                    {user.name}
                                </td>
                                <td className="p-4 text-center">
                                    {user.email}
                                </td>
                                <td className="p-4 text-center">
                                    <select name="role"
                                        value={user.role}
                                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                        className="p-2 border rounded"
                                    >
                                        <option value="customer">Customer</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </td>
                                <td className="p-4 text-center">
                                    <button onClick={() => handleDeleteUser(user._id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserManagement
