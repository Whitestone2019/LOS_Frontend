import React, { useState } from "react";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

import DashboardSidebar from "./DashboardSidebar";
import DashboardHead from "./DashboardHead";
import UserMenuForm from "./UserMenuForm";

const UserMenuData = () => {

  const [userData, setUserData] = useState([
    { id: 1, name: "Arjun Mehta", role: "admin", email: "arjun.mehta@example.com", isActive: true },
    { id: 2, name: "Neha Kapoor", role: "editor", email: "neha.k@example.com", isActive: false },
    { id: 3, name: "Rahul Verma", role: "user", email: "rahul.v@example.com", isActive: true },
    { id: 4, name: "Simran Sinha", role: "moderator", email: "simran.sinha@example.com", isActive: false },
    { id: 5, name: "Yash Patel", role: "user", email: "yash.patel@example.com", isActive: true },
  ]);

  const [editingUser, setEditingUser] = useState(null);

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleDelete = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUserData(userData.filter(user => user.id !== userId));
    }
  };

  const handleAddUser = () => {
    setEditingUser({});
  };

  const handleFormSubmit = (formUser) => {
    if (formUser.id) {
     
      setUserData(userData.map(user => (user.id === formUser.id ? formUser : user)));
    } else {
      // Add mode
      const newUser = { ...formUser, id: Date.now() };
      setUserData([...userData, newUser]);
    }
    setEditingUser(null);
  };

  return (
    <div className="lg:flex md:block font-inter">
      <div className="h-screen hidden lg:block fixed z-20">
        <DashboardSidebar />
      </div>
      <main className="flex-1 lg:ml-72">
        <DashboardHead />

        <div className="p-6">
          {editingUser ? (
            <UserMenuForm
              initialData={editingUser}
              onSubmit={handleFormSubmit}
               onCancel={() => setEditingUser(null)}
            />
          ) : (
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">User Summary</h2>
                <button
                  onClick={handleAddUser}
                  className="flex items-center gap-2 bg-accent text-white px-4 py-2 rounded hover:bg-secondary transition"
                >
                  <FaPlus /> Add User
                </button>
              </div>

              <div className="overflow-auto max-h-[450px] scrollbar-thin">
                <table className="min-w-full text-sm text-left">
                  <thead className="sticky top-0 bg-gray-100 border-b">
                    <tr>
                      <th className="py-2 px-4">Name</th>
                      <th className="py-2 px-4">Role</th>
                      <th className="py-2 px-4">Email</th>
                      <th className="py-2 px-4">Active</th>
                      <th className="py-2 px-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userData.map((user) => (
                      <tr key={user.id} className="border-b hover:bg-gray-50">
                        <td className="py-2 px-4">{user.name}</td>
                        <td className="py-2 px-4 capitalize">{user.role}</td>
                        <td className="py-2 px-4" title={user.email}>{user.email}</td>
                        <td className="py-2 px-4">
                          <span
                            className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                              user.isActive
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }`}
                            title={user.isActive ? "User is active" : "User is inactive"}
                          >
                            {user.isActive ? "Active" : "Inactive"}

                          </span>
                        </td>
                        <td className="py-2 px-4 text-center space-x-4">
                          <button
                            onClick={() => handleEdit(user)}
                            className="text-accent hover:text-secondary"
                            title="Edit User"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(user.id)}
                            className="text-red-600 hover:text-red-800"
                            title="Delete User"
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default UserMenuData;
