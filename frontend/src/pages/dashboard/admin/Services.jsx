// import React, { useState } from "react";
// import {
//   FaPlus,
//   FaEdit,
//   FaTrash,
//   FaEye,
//   FaSearch,
//   FaFilter,
//   FaStar,
//   FaDollarSign,
//   FaTimesCircle,
// } from "react-icons/fa";
// import {
//   colorClasses,
//   iconMap,
//   servicesData,
// } from "../../../constants/services";

// const ManageServices = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterStatus, setFilterStatus] = useState("all");
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [services, setServices] = useState(servicesData);

//   const filteredServices = services.filter((service) => {
//     const matchesSearch =
//       service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       service.description.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesFilter =
//       filterStatus === "all" || service.status === filterStatus;
//     return matchesSearch && matchesFilter;
//   });

//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete this service?")) {
//       setServices(services.filter((service) => service.id !== id));
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "active":
//         return "bg-green-100 text-green-800";
//       case "inactive":
//         return "bg-gray-100 text-gray-800";
//       case "archived":
//         return "bg-red-100 text-red-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   return (
//     <div>
//       <div className="flex items-center justify-between mb-6">
//         <div>
//           <h1 className="text-2xl font-bold mb-2">Manage Services</h1>
//           <p className="text-gray-600">
//             Add, edit, and manage all writing and academic services
//           </p>
//         </div>
//         <button
//           onClick={() => setShowAddModal(true)}
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
//         >
//           <FaPlus />
//           Add New Service
//         </button>
//       </div>

//       {/* Stats Overview */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
//         <div className="bg-white p-4 rounded-lg shadow-sm">
//           <p className="text-gray-500 text-sm">Total Services</p>
//           <p className="text-2xl font-bold text-gray-900">{services.length}</p>
//         </div>
//         <div className="bg-white p-4 rounded-lg shadow-sm">
//           <p className="text-gray-500 text-sm">Active</p>
//           <p className="text-2xl font-bold text-green-600">
//             {services.filter((s) => s.status === "active").length}
//           </p>
//         </div>
//         <div className="bg-white p-4 rounded-lg shadow-sm">
//           <p className="text-gray-500 text-sm">Featured</p>
//           <p className="text-2xl font-bold text-blue-600">
//             {services.filter((s) => s.isFeatured).length}
//           </p>
//         </div>
//         <div className="bg-white p-4 rounded-lg shadow-sm">
//           <p className="text-gray-500 text-sm">Total Orders</p>
//           <p className="text-2xl font-bold text-purple-600">
//             {services.reduce((sum, s) => sum + s.totalOrders, 0)}
//           </p>
//         </div>
//       </div>

//       {/* Search & Filter */}
//       <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
//         <div className="flex flex-col md:flex-row gap-4">
//           <div className="flex-1 relative">
//             <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//             <input
//               type="text"
//               placeholder="Search services..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <div className="flex items-center gap-2">
//             <FaFilter className="text-gray-400" />
//             <select
//               value={filterStatus}
//               onChange={(e) => setFilterStatus(e.target.value)}
//               className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="all">All Status</option>
//               <option value="active">Active</option>
//               <option value="inactive">Inactive</option>
//               <option value="archived">Archived</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* Service Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredServices.map((service) => {
//           const IconComponent = iconMap[service.icon];
//           return (
//             <div
//               key={service.id}
//               className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition"
//             >
//               <div
//                 className={`h-32 ${
//                   colorClasses[service.defaultCardColor]
//                 } flex items-center justify-center`}
//               >
//                 <IconComponent className="w-16 h-16 text-white" />
//               </div>

//               <div className="p-4">
//                 <div className="flex items-start justify-between mb-2">
//                   <h3 className="font-bold text-gray-900">{service.title}</h3>
//                   <span
//                     className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
//                       service.status
//                     )}`}
//                   >
//                     {service.status}
//                   </span>
//                 </div>

//                 <p className="text-sm text-gray-600 mb-3">
//                   {service.description}
//                 </p>

//                 <ul className="text-xs text-gray-500 mb-3 list-disc pl-4">
//                   {service.services.map((s, i) => (
//                     <li key={i}>{s}</li>
//                   ))}
//                 </ul>

//                 <div className="flex items-center justify-between text-sm mb-3">
//                   <div className="flex items-center gap-1">
//                     <FaStar className="text-yellow-500 w-4 h-4" />
//                     <span>{service.rating}</span>
//                   </div>
//                   <span className="text-gray-500">
//                     {service.totalOrders} orders
//                   </span>
//                 </div>

//                 <div className="flex items-center justify-between mb-3">
//                   <div className="flex items-center gap-1 text-green-600 font-bold">
//                     <FaDollarSign />
//                     <span>{service.price}</span>
//                   </div>
//                   <span className="text-xs text-gray-500">
//                     {service.pricingType}
//                   </span>
//                 </div>

//                 <div className="text-xs text-gray-500 mb-3">
//                   Delivery: {service.deliveryTime}
//                 </div>

//                 {service.isFeatured && (
//                   <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 text-xs px-2 py-1 rounded mb-3 flex items-center gap-1">
//                     <FaStar className="w-3 h-3" />
//                     Featured Service
//                   </div>
//                 )}

//                 <div className="flex gap-2">
//                   <button className="flex-1 p-2 text-blue-600 hover:bg-blue-50 rounded flex items-center justify-center gap-1 text-sm">
//                     <FaEye /> View
//                   </button>
//                   <button className="flex-1 p-2 text-green-600 hover:bg-green-50 rounded flex items-center justify-center gap-1 text-sm">
//                     <FaEdit /> Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(service.id)}
//                     className="flex-1 p-2 text-red-600 hover:bg-red-50 rounded flex items-center justify-center gap-1 text-sm"
//                   >
//                     <FaTrash /> Delete
//                   </button>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {filteredServices.length === 0 && (
//         <div className="text-center py-12 bg-white rounded-lg">
//           <p className="text-gray-500">
//             No services found matching your criteria.
//           </p>
//         </div>
//       )}
//       {showAddModal && (
//         <div className="fixed inset-0 backdrop-blur-md bg-white/30 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-lg">
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="text-xl font-bold text-gray-900">
//                 Add New Service
//               </h2>
//               <button
//                 onClick={() => setShowAddModal(false)}
//                 className="text-gray-500 hover:text-gray-700"
//               >
//                 <FaTimesCircle className="w-6 h-6" />
//               </button>
//             </div>

//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Service Title
//                 </label>
//                 <input
//                   type="text"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Description
//                 </label>
//                 <textarea
//                   rows="3"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 ></textarea>
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Category
//                   </label>
//                   <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
//                     <option>Academic</option>
//                     <option>Professional</option>
//                     <option>Business</option>
//                     <option>Research</option>
//                     <option>Support</option>
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Default Card Color
//                   </label>
//                   <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
//                     <option value="purple">Purple</option>
//                     <option value="blue">Blue</option>
//                     <option value="green">Green</option>
//                     <option value="red">Red</option>
//                     <option value="yellow">Yellow</option>
//                     <option value="indigo">Indigo</option>
//                     <option value="teal">Teal</option>
//                     <option value="pink">Pink</option>
//                   </select>
//                 </div>
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Price ($)
//                   </label>
//                   <input
//                     type="number"
//                     className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Pricing Type
//                   </label>
//                   <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
//                     <option value="fixed">Fixed</option>
//                     <option value="hourly">Hourly</option>
//                     <option value="project-based">Project Based</option>
//                     <option value="monthly">Monthly</option>
//                   </select>
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Delivery Time
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="e.g. 2-3 weeks"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>

//               <div className="flex gap-3 justify-end pt-4">
//                 <button
//                   type="button"
//                   onClick={() => setShowAddModal(false)}
//                   className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="button"
//                   className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
//                 >
//                   Create Service
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ManageServices;

// import React from "react";

// const ManageServices = () => {
//   return (
//     <div>
//       <h1>ManageServices</h1>
//     </div>
//   );
// };

// export default ManageServices;

//=======THIS IS TE ACTUAL ONE===//
import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";
import ServiceCard from "../../../components/ServiceCard";
import ServiceForm from "../../../components/ServiceForm";
import ServiceDetailModal from "../../../components/ServiceDetailModal";
import { INITIAL_FORM_STATE, serviceAPI } from "../../../config/serviceConfig";

const ManageServices = () => {
  const [services, setServices] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);

  useEffect(() => {
    fetchServices();
  }, []);

  // Fetch all services
  const fetchServices = async () => {
    try {
      const data = await serviceAPI.getAllServices();
      if (data.success) {
        setServices(data.data);
        setMessage("");
      } else {
        setMessage(data.message || "Failed to load services");
      }
    } catch (error) {
      console.error("Error fetching services:", error);
      setMessage("Failed to load services");
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle array field changes
  const handleArrayChange = (field, index, value) => {
    const arr = [...formData[field]];
    arr[index] = value;
    setFormData({ ...formData, [field]: arr });
  };

  // Add new array field
  const addArrayField = (field) => {
    setFormData({
      ...formData,
      [field]: [...formData[field], ""],
    });
  };

  // Remove array field
  const removeArrayField = (field, index) => {
    setFormData({
      ...formData,
      [field]: formData[field].filter((_, i) => i !== index),
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let response;
      if (editingId) {
        response = await serviceAPI.updateService(editingId, formData);
      } else {
        response = await serviceAPI.createService(formData);
      }

      if (response.success) {
        setMessage(
          editingId
            ? "Service updated successfully ✅"
            : "Service created successfully ✅"
        );
        fetchServices();
        resetForm();
      } else {
        setMessage(response.message || "Error saving service");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Failed to save service");
    } finally {
      setLoading(false);
    }
  };

  // Handle edit
  const handleEdit = (service) => {
    setFormData({
      title: service.title,
      description: service.description,
      shortDescription: service.shortDescription || "",
      category: service.category,
      price: service.price,
      pricingType: service.pricingType,
      defaultCardColor: service.defaultCardColor,
      deliveryTime: service.deliveryTime || "",
      duration: service.duration || "",
      features: service.features || [""],
      requirements: service.requirements || [""],
      tags: service.tags || [""],
      isFeatured: service.isFeatured,
      status: service.status,
    });
    setEditingId(service._id);
    setIsModalOpen(true);
  };

  // Handle view details
  const handleViewDetails = (service) => {
    setSelectedService(service);
    setIsDetailModalOpen(true);
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?"))
      return;

    try {
      const response = await serviceAPI.deleteService(id);
      if (response.success) {
        setMessage("Service deleted successfully ✅");
        fetchServices();
      } else {
        setMessage(response.message || "Failed to delete service");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Failed to delete service");
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData(INITIAL_FORM_STATE);
    setEditingId(null);
    setIsModalOpen(false);
  };

  // Open modal for new service
  const openNewServiceModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-yellow-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Service Management
            </h1>
            <p className="text-gray-600">Create and manage your services</p>
          </div>
          <button
            onClick={openNewServiceModal}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-purple-700 transition"
          >
            <FaPlus /> Add Service
          </button>
        </div>

        {/* Message Alert */}
        {message && (
          <div
            className={`mb-4 p-4 rounded-lg ${
              message.includes("✅")
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {message}
          </div>
        )}

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-gray-500 text-sm">Total Services</p>
            <p className="text-2xl font-bold text-gray-900">
              {services.length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-gray-500 text-sm">Active</p>
            <p className="text-2xl font-bold text-green-600">
              {services.filter((s) => s.status === "active").length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-gray-500 text-sm">Featured</p>
            <p className="text-2xl font-bold text-blue-600">
              {services.filter((s) => s.isFeatured).length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-gray-500 text-sm">Total Orders</p>
            <p className="text-2xl font-bold text-purple-600">
              {services.reduce((sum, s) => sum + (s.totalOrders || 0), 0)}
            </p>
          </div>
        </div>

        {/* Services Grid */}
        {services.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div key={service._id} className="relative">
                <ServiceCard
                  service={service}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  isAdmin={true}
                />
                {/* View Details Button Overlay */}
                <button
                  onClick={() => handleViewDetails(service)}
                  className="absolute top-4 left-4 bg-white/90 hover:bg-white text-blue-600 p-2 rounded-full shadow-md transition"
                  title="View Details"
                >
                  <FaEye />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg p-12 text-center">
            <p className="text-gray-500 text-lg">
              No services yet. Create your first service!
            </p>
          </div>
        )}
      </div>

      {/* Service Form Modal */}
      {isModalOpen && (
        <ServiceForm
          formData={formData}
          onChange={handleInputChange}
          onArrayChange={handleArrayChange}
          onAddArrayField={addArrayField}
          onRemoveArrayField={removeArrayField}
          onSubmit={handleSubmit}
          onCancel={resetForm}
          isLoading={loading}
          isEditing={editingId !== null}
        />
      )}

      {/* Service Detail Modal */}
      {isDetailModalOpen && selectedService && (
        <ServiceDetailModal
          service={selectedService}
          onClose={() => setIsDetailModalOpen(false)}
        />
      )}
    </section>
  );
};

export default ManageServices;
