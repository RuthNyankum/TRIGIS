import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import {
  FaStar,
  FaMoneyBillWave,
  FaClock,
  FaCheckCircle,
  FaArrowLeft,
  FaShoppingCart,
  FaUser,
  FaCalendar,
} from "react-icons/fa";
import api from "../../config/axios";
import { COLOR_MAP } from "../../config/serviceConfig";
import { formatCurrency } from "../../utils/formatCurrency";

const ServiceDetail = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (serviceId) {
      fetchServiceDetail();
    }
  }, [serviceId]);

  const fetchServiceDetail = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`/services/${serviceId}`);
      if (data.success) {
        setService(data.data);
        setError("");
      } else {
        setError(data.message || "Failed to load service");
      }
    } catch (error) {
      console.error("Error fetching service:", error);
      setError("Failed to load service details. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading service details...</p>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
          >
            <FaArrowLeft /> Back
          </button>
          <div className="bg-white rounded-lg p-8 text-center">
            <p className="text-red-500 text-lg">
              {error || "Service not found"}
            </p>
            <button
              onClick={() => navigate("/services")}
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Back to Services
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6 font-semibold"
        >
          <FaArrowLeft /> Back
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header with Color Background */}
          <div
            className={`h-48 ${
              COLOR_MAP[service.defaultCardColor] || "bg-blue-500"
            } flex items-center justify-center relative`}
          >
            <div className="w-24 h-24 text-white opacity-90 flex items-center justify-center">
              <FaCheckCircle size={60} />
            </div>

            {/* Featured Badge */}
            {service.isFeatured && (
              <div className="absolute top-6 right-6 bg-yellow-400 text-gray-900 px-4 py-2 rounded-full font-bold flex items-center gap-2 shadow-md">
                <FaStar className="w-4 h-4" />
                Featured
              </div>
            )}
          </div>

          <div className="p-8">
            {/* Title & Category */}
            <div className="mb-6">
              <span className="text-xs font-semibold text-blue-600 uppercase">
                {service.category}
              </span>
              <h1 className="text-4xl font-bold text-gray-900 mt-2">
                {service.title}
              </h1>
            </div>

            {/* Provider Info */}
            {service.provider && (
              <div className="bg-blue-50 p-4 rounded-lg mb-6 flex items-center gap-3">
                <FaUser className="text-blue-600 text-lg" />
                <div>
                  <p className="text-sm text-gray-600">Service Provider</p>
                  <p className="font-semibold text-gray-900">
                    {service.provider.name || service.providerName}
                  </p>
                </div>
              </div>
            )}

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                About This Service
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </div>

            {/* Key Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Price */}
              <div className="border-l-4 border-green-600 pl-4">
                <div className="flex items-center gap-2 mb-1">
                  {/* Optional: You can keep or replace this icon */}
                  <FaMoneyBillWave className="text-green-600 text-lg" />
                  <span className="text-sm text-gray-600">Price</span>
                </div>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(service.price)}
                  <span className="text-sm text-gray-600 font-normal ml-2">
                    / {service.pricingType}
                  </span>
                </p>
              </div>

              {/* Delivery Time */}
              {service.deliveryTime && (
                <div className="border-l-4 border-purple-600 pl-4">
                  <div className="flex items-center gap-2 mb-1">
                    <FaClock className="text-purple-600 text-lg" />
                    <span className="text-sm text-gray-600">Delivery Time</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    {service.deliveryTime}
                  </p>
                </div>
              )}

              {/* Duration */}
              {service.duration && (
                <div className="border-l-4 border-orange-600 pl-4">
                  <div className="flex items-center gap-2 mb-1">
                    <FaCalendar className="text-orange-600 text-lg" />
                    <span className="text-sm text-gray-600">Duration</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    {service.duration}
                  </p>
                </div>
              )}

              {/* Rating */}
              {service.rating && (
                <div className="border-l-4 border-yellow-600 pl-4">
                  <div className="flex items-center gap-2 mb-1">
                    <FaStar className="text-yellow-600 text-lg" />
                    <span className="text-sm text-gray-600">Rating</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">
                    {service.rating}
                    <span className="text-sm text-gray-600 font-normal ml-1">
                      / 5.0
                    </span>
                  </p>
                </div>
              )}
            </div>

            {/* Features */}
            {service.features && service.features.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Features
                </h2>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-3 text-gray-600"
                    >
                      <FaCheckCircle className="text-green-600" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Requirements */}
            {service.requirements && service.requirements.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Requirements
                </h2>
                <ul className="space-y-2">
                  {service.requirements.map((req, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-3 text-gray-600"
                    >
                      <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tags */}
            {service.tags && service.tags.length > 0 && (
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Order Button */}
            <button className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2 font-bold text-lg">
              <FaShoppingCart /> Order Now
            </button>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="mt-12 bg-blue-600 text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">Have Questions?</h2>
          <p className="mb-6">
            Contact us for more information about this service
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition">
            Get in Touch
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
