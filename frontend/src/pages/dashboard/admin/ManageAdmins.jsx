import React, { useEffect } from "react";
import {
  FaUserShield,
  FaUserPlus,
  FaTrashAlt,
  FaEye,
  FaEyeSlash,
  FaEdit,
  FaSave,
  FaTimes,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import trigisLogo from "../../../assets/images/trigis.jpg";
import {
  fetchAdmins,
  createAdmin,
  updateAdmin,
  deleteAdmin,
  clearMessage,
} from "../../../redux/slice/admin/adminManagementSlice";
import {
  setCreateFormField,
  setPasswordStrength,
  toggleShowPassword,
  resetCreateForm,
  setEditForm,
  setEditFormField,
  clearEditForm,
} from "../../../redux/slice/admin/adminFormSlice";

const ManageAdmins = () => {
  const dispatch = useDispatch();

  // Redux state
  const { admins, createLoading, updateLoading, message, error } = useSelector(
    (state) => state.adminManagement
  );
  const { createForm, editForm, passwordStrength, showPassword } = useSelector(
    (state) => state.adminForm
  );

  // Fetch admins on mount
  useEffect(() => {
    dispatch(fetchAdmins());
  }, [dispatch]);

  // Show toast messages
  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(clearMessage());
    }
    if (error) {
      toast.error(error);
      dispatch(clearMessage());
    }
  }, [message, error, dispatch]);

  // Password strength checker
  const checkPasswordStrength = (password) => {
    let score = 0;
    if (!password) return { score, level: "" };
    if (password.length >= 6) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    let level = "Weak";
    if (score === 2) level = "Medium";
    else if (score >= 3) level = "Strong";
    return { score, level };
  };

  // Handle create form input changes
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    dispatch(setCreateFormField({ field: name, value }));
    if (name === "password") {
      dispatch(setPasswordStrength(checkPasswordStrength(value)));
    }
  };

  // Create new admin
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !createForm.fullName ||
      !createForm.email ||
      !createForm.phone ||
      !createForm.password
    ) {
      toast.error("All fields are required ❌");
      return;
    }

    try {
      await dispatch(createAdmin(createForm)).unwrap();
      dispatch(resetCreateForm());
    } catch (error) {
      // Error is handled by Redux and useEffect
    }
  };

  // Delete admin
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this admin?")) return;
    dispatch(deleteAdmin(id));
  };

  // Start editing
  const handleEdit = (admin) => {
    dispatch(
      setEditForm({
        _id: admin._id,
        fullName: admin.fullName,
        email: admin.email,
        phone: admin.phone,
        password: "",
      })
    );
  };

  // Handle edit form changes
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    dispatch(setEditFormField({ field: name, value }));
  };

  // Save admin updates
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await dispatch(
        updateAdmin({ id: editForm._id, formData: editForm })
      ).unwrap();
      dispatch(clearEditForm());
    } catch (error) {
      // Error is handled by Redux and useEffect
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-yellow-50 relative overflow-hidden p-6">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-16 left-16 w-64 h-64 bg-purple-600 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-yellow-400 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-purple-100">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-gradient-to-r from-purple-600 to-yellow-400 p-1">
            <img
              src={trigisLogo}
              alt="TRIGIS Consult"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 font-playfair">
            Admin <span className="text-purple-700">Management</span>
          </h1>
          <p className="text-gray-600 font-inter">
            Create, view, edit, and manage all administrators
          </p>
        </div>

        {/* Create Admin Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white/60 backdrop-blur-md rounded-xl p-6 shadow-md mb-8 space-y-4"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1 font-inter">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={createForm.fullName}
                onChange={handleOnChange}
                placeholder="Enter full name"
                className="w-full p-3 border-2 border-gray-200 rounded-xl bg-gray-50 outline-none focus:border-purple-500 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1 font-inter">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={createForm.email}
                onChange={handleOnChange}
                placeholder="Enter email"
                className="w-full p-3 border-2 border-gray-200 rounded-xl bg-gray-50 outline-none focus:border-purple-500 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1 font-inter">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                value={createForm.phone}
                onChange={handleOnChange}
                placeholder="Enter phone number"
                className="w-full p-3 border-2 border-gray-200 rounded-xl bg-gray-50 outline-none focus:border-purple-500 transition"
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-1 font-inter">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={createForm.password}
                  onChange={handleOnChange}
                  placeholder="Enter password"
                  className="w-full p-3 pr-10 border-2 border-gray-200 rounded-xl bg-gray-50 outline-none focus:border-purple-500 transition"
                />
                <button
                  type="button"
                  onClick={() => dispatch(toggleShowPassword())}
                  className="absolute right-3 top-3.5 text-gray-500 hover:text-purple-600 transition"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {passwordStrength.level && (
                <div className="mt-1">
                  <span
                    className={`text-xs font-semibold ${
                      passwordStrength.level === "Weak"
                        ? "text-red-500"
                        : passwordStrength.level === "Medium"
                        ? "text-yellow-500"
                        : "text-green-500"
                    }`}
                  >
                    Password: {passwordStrength.level}
                  </span>
                </div>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={createLoading}
            className="mt-4 w-full md:w-auto bg-gradient-to-r from-purple-600 to-purple-800 text-white font-semibold py-3 px-6 rounded-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaUserPlus />
            {createLoading ? "Creating..." : "Create Admin"}
          </button>
        </form>

        {/* Admin List */}
        <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
          <FaUserShield className="text-purple-600" /> Existing Admins
        </h2>

        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
          <table className="min-w-full bg-white">
            <thead className="bg-purple-100 text-gray-700 font-semibold">
              <tr>
                <th className="p-3 text-left">Full Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Role</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {admins.length > 0 ? (
                admins.map((admin) => (
                  <tr key={admin._id} className="border-t hover:bg-purple-50">
                    <td className="p-3">{admin.fullName}</td>
                    <td className="p-3">{admin.email}</td>
                    <td className="p-3">{admin.phone}</td>
                    <td className="p-3 capitalize">{admin.role}</td>
                    <td className="p-3 text-center space-x-3">
                      <button
                        onClick={() => handleEdit(admin)}
                        className="text-blue-500 hover:text-blue-700 transition"
                        title="Edit Admin"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(admin._id)}
                        className="text-red-500 hover:text-red-700 transition"
                        title="Delete Admin"
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center text-gray-500 p-4 italic"
                  >
                    No admins found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Edit Admin Modal */}
        {editForm && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl relative">
              <button
                onClick={() => dispatch(clearEditForm())}
                className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
              >
                <FaTimes />
              </button>
              <h3 className="text-xl font-semibold mb-4 text-purple-700">
                Edit Admin
              </h3>
              <form onSubmit={handleUpdate} className="space-y-4">
                <input
                  type="text"
                  name="fullName"
                  value={editForm.fullName}
                  onChange={handleEditChange}
                  placeholder="Full Name"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <input
                  type="email"
                  name="email"
                  value={editForm.email}
                  onChange={handleEditChange}
                  placeholder="Email"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <input
                  type="text"
                  name="phone"
                  value={editForm.phone}
                  onChange={handleEditChange}
                  placeholder="Phone"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <input
                  type="password"
                  name="password"
                  value={editForm.password}
                  onChange={handleEditChange}
                  placeholder="New Password (optional)"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />

                <button
                  type="submit"
                  disabled={updateLoading}
                  className="w-full bg-purple-700 text-white font-semibold py-3 rounded-lg hover:bg-purple-800 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FaSave />
                  {updateLoading ? "Saving..." : "Save Changes"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ManageAdmins;
