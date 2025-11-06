import React, { useState, useEffect } from "react";
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
import api from "../../../config/axios";
import trigisLogo from "../../../assets/images/trigis.jpg";

const ManageAdmins = () => {
  const [admins, setAdmins] = useState([]);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
  });
  const [editForm, setEditForm] = useState(null); // For editing admins
  const [strength, setStrength] = useState({ score: 0, level: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);

  // ✅ Password strength checker
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

  // ✅ Fetch all admins
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await api.get("/admin/all", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAdmins(res.data.admins);
      } catch (error) {
        console.error("Error fetching admins:", error);
        toast.error("Failed to load admins ❌");
      }
    };
    fetchAdmins();
  }, []);

  // ✅ Handle input changes
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === "password") setStrength(checkPasswordStrength(value));
  };

  // ✅ Create new admin
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.fullName || !form.email || !form.phone || !form.password) {
      toast.error("All fields are required ❌");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await api.post("/admin/create", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Admin created successfully 🎉");
      setAdmins((prev) => [...prev, res.data.admin]);
      setForm({ fullName: "", email: "", phone: "", password: "" });
      setStrength({ score: 0, level: "" });
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to create admin ❌");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete admin
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this admin?")) return;
    try {
      const token = localStorage.getItem("token");
      await api.delete(`/admin/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAdmins((prev) => prev.filter((a) => a._id !== id));
      toast.success("Admin deleted successfully ✅");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete admin ❌");
    }
  };

  // ✅ Start Editing
  const handleEdit = (admin) => {
    setEditForm({
      _id: admin._id,
      fullName: admin.fullName,
      email: admin.email,
      phone: admin.phone,
      password: "",
    });
  };

  // ✅ Handle edit form changes
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Save admin updates
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      setEditLoading(true);
      const token = localStorage.getItem("token");
      await api.put(`/admin/update/${editForm._id}`, editForm, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAdmins((prev) =>
        prev.map((a) =>
          a._id === editForm._id
            ? {
                ...a,
                fullName: editForm.fullName,
                email: editForm.email,
                phone: editForm.phone,
              }
            : a
        )
      );
      toast.success("Admin updated successfully ✅");
      setEditForm(null);
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to update admin ❌");
    } finally {
      setEditLoading(false);
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
                value={form.fullName}
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
                value={form.email}
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
                value={form.phone}
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
                  value={form.password}
                  onChange={handleOnChange}
                  placeholder="Enter password"
                  className="w-full p-3 pr-10 border-2 border-gray-200 rounded-xl bg-gray-50 outline-none focus:border-purple-500 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-gray-500 hover:text-purple-600 transition"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full md:w-auto bg-gradient-to-r from-purple-600 to-purple-800 text-white font-semibold py-3 px-6 rounded-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <FaUserPlus />
            {loading ? "Creating..." : "Create Admin"}
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
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(admin._id)}
                        className="text-red-500 hover:text-red-700 transition"
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

        {/* ✅ Edit Admin Modal */}
        {editForm && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl relative">
              <button
                onClick={() => setEditForm(null)}
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
                  className="w-full p-3 border rounded-lg"
                />
                <input
                  type="email"
                  name="email"
                  value={editForm.email}
                  onChange={handleEditChange}
                  placeholder="Email"
                  className="w-full p-3 border rounded-lg"
                />
                <input
                  type="text"
                  name="phone"
                  value={editForm.phone}
                  onChange={handleEditChange}
                  placeholder="Phone"
                  className="w-full p-3 border rounded-lg"
                />
                <input
                  type="password"
                  name="password"
                  value={editForm.password}
                  onChange={handleEditChange}
                  placeholder="New Password (optional)"
                  className="w-full p-3 border rounded-lg"
                />

                <button
                  type="submit"
                  disabled={editLoading}
                  className="w-full bg-purple-700 text-white font-semibold py-3 rounded-lg hover:bg-purple-800 transition flex items-center justify-center gap-2"
                >
                  <FaSave />
                  {editLoading ? "Saving..." : "Save Changes"}
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
