import React from 'react';
import { FaUserShield } from 'react-icons/fa';

const AdminUserForm = ({ formData, setFormData, onSubmit, onCancel }) => {
  const { roleName, description } = formData;

  const isEditMode = Boolean(formData.id);

  // const handleCheckboxChange = (e) => {
  //   const { name, checked } = e.target;
  //   setFormData(prev => ({
  //     ...prev,
  //     permissions: { ...prev.permissions, [name]: checked }
  //   }));
  // };

  return (
    <div className="bg-white p-6 mb-6 rounded-lg items-center shadow w-full max-w-xl">
      <div className="flex justify-center mb-4">
        <FaUserShield size={40} className="text-accent" />
      </div>

      <h2 className="text-xl font-bold mb-4 text-center text-gray-700">
        {isEditMode ? "Edit" : "Add"} Role Form
      </h2>

      <form onSubmit={onSubmit} className="space-y-5">
        <div>
          <label className="block text-gray-700 font-semibold mb-1">Role Name</label>
          <input
            type="text"
            value={roleName}
            onChange={(e) => setFormData(prev => ({ ...prev, roleName: e.target.value }))}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-accent focus:border-accent"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:border-accent focus:ring-accent"
          />
        </div>

        {/* <div>
          <h3 className="text-md font-semibold text-gray-700 mb-2">Permissions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {Object.keys(permissions).map((perm) => (
              <label key={perm} className="flex items-center gap-2 text-gray-600">
                <input
                  type="checkbox"
                  name={perm}
                  checked={permissions[perm]}
                  onChange={handleCheckboxChange}
                  className="accent-accent"
                />
                <span>{perm.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase())}</span>
              </label>
            ))}
          </div>
        </div> */}

        <div className="flex justify-between gap-2">
          <button
            type="submit"
            className="flex-1 bg-accent text-white py-2 rounded hover:bg-secondary font-semibold"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-300 text-gray-800 py-2 rounded hover:bg-gray-400 font-semibold"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminUserForm;
