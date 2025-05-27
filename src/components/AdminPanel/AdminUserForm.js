import React, { useState } from 'react';
import { FaUserShield } from 'react-icons/fa'; 

const AdminUserForm = () => {
  const [roleName, setRoleName] = useState('');
  const [description, setDescription] = useState('');
  const [permissions, setPermissions] = useState({
    create_user: false,
    edit_user: false,
    delete_user: false,
    create_role: false,
    edit_role: false,
    delete_role: false,
    manage_menus: false,
  });

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setPermissions(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      roleName,
      description,
      permissions
    };
    console.log('Form Submitted:', formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
       
        <div className="flex justify-center mb-6">
          <FaUserShield size={50} className="text-blue-600" />  
        </div>

        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700"> Admin User</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
         
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Role Name:</label>
            <input
              type="text"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          
          <div>
            <label className="block text-gray-700 font-semibold mb-1">Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

         
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Permissions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.keys(permissions).map((perm) => (
                <label key={perm} className="flex items-center space-x-2 text-gray-600">
                  <input
                    type="checkbox"
                    name={perm}
                    checked={permissions[perm]}
                    onChange={handleCheckboxChange}
                    className="w-4 h-4"
                  />
                  <span>{perm.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase())}</span>
                </label>
              ))}
            </div>
          </div>

        
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 font-semibold"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminUserForm;