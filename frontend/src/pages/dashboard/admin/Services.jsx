import React, { useState, useEffect } from "react";
import { FaPlus, FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import ServiceCard from "../../../components/ServiceCard";
import ServiceForm from "../../../components/ServiceForm";
import ServiceDetailModal from "../../../components/ServiceDetailModal";
import {
  fetchAdminServices,
  deleteAdminService,
  clearAdminMessage,
} from "../../../redux/slice/admin/adminServicesSlice";
import {
  setEditingService,
  clearEditingService,
} from "../../../redux/slice/admin/adminServiceFormSlice";

const ManageServices = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  // Redux state
  const { services, loading, message } = useSelector(
    (state) => state.adminServices
  );
  const { message: formMessage } = useSelector(
    (state) => state.adminServiceForm
  );

  useEffect(() => {
    dispatch(fetchAdminServices());
  }, [dispatch]);

  // Clear messages after 5 seconds
  useEffect(() => {
    if (message || formMessage) {
      const timer = setTimeout(() => {
        dispatch(clearAdminMessage());
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message, formMessage, dispatch]);

  // Handle edit
  const handleEdit = (service) => {
    dispatch(
      setEditingService({
        ...service,
        features: service.features || [""],
        requirements: service.requirements || [""],
        tags: service.tags || [""],
      })
    );
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
    dispatch(deleteAdminService(id));
  };

  // Open modal for new service
  const openNewServiceModal = () => {
    dispatch(clearEditingService());
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    dispatch(clearEditingService());
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
        {(message || formMessage) && (
          <div
            className={`mb-4 p-4 rounded-lg ${
              (message || formMessage).includes("✅")
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {message || formMessage}
          </div>
        )}

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
        {loading ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">Loading services...</p>
          </div>
        ) : services.length > 0 ? (
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
      {isModalOpen && <ServiceForm onCancel={closeModal} />}

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
