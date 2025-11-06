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
    <section className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-yellow-50 px-4 py-6">
      <div className="w-full">
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
            className="bg-purple-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-purple-700 transition cursor-pointer"
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
        {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
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
        </div> */}
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
            <p className="text-gray-500 text-sm">Total Services</p>
            <p className="text-2xl font-bold text-gray-900">
              {services.length}
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
            <p className="text-gray-500 text-sm">Active</p>
            <p className="text-2xl font-bold text-green-600">
              {services.filter((s) => s.status === "active").length}
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
            <p className="text-gray-500 text-sm">Featured</p>
            <p className="text-2xl font-bold text-blue-600">
              {services.filter((s) => s.isFeatured).length}
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
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
                  className="absolute top-4 left-4 bg-white/90 hover:bg-white text-blue-600 p-2 rounded-full shadow-md transition cursor-pointer"
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
