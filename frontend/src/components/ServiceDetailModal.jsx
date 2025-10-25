// import React from "react";
// import {
//   FaTimes,
//   FaStar,
//   FaDollarSign,
//   FaClock,
//   FaCheckCircle,
//   FaUser,
//   FaCalendar,
// } from "react-icons/fa";
// import { COLOR_MAP } from "../config/serviceConfig";
// import { FaMoneyBillWave } from "react-icons/fa";
import React from "react";
import {
  FaTimes,
  FaStar,
  FaClock,
  FaCheckCircle,
  FaUser,
  FaCalendar,
  FaMoneyBillWave,
} from "react-icons/fa";
import { COLOR_MAP } from "../config/serviceConfig";
import { formatCurrency } from "../utils/formatCurrency";

const ServiceDetailModal = ({ service, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-screen overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b sticky top-0 bg-white z-10">
          <h2 className="text-2xl font-bold">Service Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Color Background Section */}
          <div
            className={`h-40 ${
              COLOR_MAP[service.defaultCardColor] || "bg-blue-500"
            } rounded-lg flex items-center justify-center mb-6 relative`}
          >
            <div className="w-20 h-20 text-white opacity-90 flex items-center justify-center">
              <FaCheckCircle size={50} />
            </div>
            {service.isFeatured && (
              <div className="absolute top-3 right-3 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                <FaStar className="w-3 h-3" />
                Featured
              </div>
            )}
          </div>

          {/* Title & Category */}
          <div className="mb-6">
            <span className="text-xs font-semibold text-blue-600 uppercase">
              {service.category}
            </span>
            <h3 className="text-3xl font-bold text-gray-900">
              {service.title}
            </h3>
          </div>

          {/* Status Badge */}
          <div className="mb-6">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                service.status === "active"
                  ? "bg-green-100 text-green-800"
                  : service.status === "inactive"
                  ? "bg-gray-100 text-gray-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {service.status}
            </span>
          </div>

          {/* Provider Info */}
          {service.provider && (
            <div className="bg-blue-50 p-4 rounded-lg mb-6 flex items-center gap-3">
              <FaUser className="text-blue-600 text-lg" />
              <div>
                <p className="text-sm text-gray-600">Provider</p>
                <p className="font-semibold text-gray-900">
                  {service.provider.name || service.providerName}
                </p>
              </div>
            </div>
          )}

          {/* Description */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
            <p className="text-gray-600 leading-relaxed">
              {service.description}
            </p>
          </div>

          {/* Short Description */}
          {service.shortDescription && (
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-2">
                Short Description
              </h4>
              <p className="text-gray-600">{service.shortDescription}</p>
            </div>
          )}

          {/* Key Details Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="border-l-4 border-green-600 pl-4">
              <div className="flex items-center gap-2 mb-1">
                <FaMoneyBillWave className="text-green-600" />
                <span className="text-sm text-gray-600">Price</span>
              </div>
              <p className="text-xl font-bold text-gray-900">
                {formatCurrency(service.price)}
                <span className="text-sm text-gray-600 font-normal ml-2">
                  / {service.pricingType}
                </span>
              </p>
            </div>

            {service.deliveryTime && (
              <div className="border-l-4 border-purple-600 pl-4">
                <div className="flex items-center gap-2 mb-1">
                  <FaClock className="text-purple-600" />
                  <span className="text-sm text-gray-600">Delivery</span>
                </div>
                <p className="text-xl font-bold text-gray-900">
                  {service.deliveryTime}
                </p>
              </div>
            )}

            {service.duration && (
              <div className="border-l-4 border-orange-600 pl-4">
                <div className="flex items-center gap-2 mb-1">
                  <FaCalendar className="text-orange-600" />
                  <span className="text-sm text-gray-600">Duration</span>
                </div>
                <p className="text-xl font-bold text-gray-900">
                  {service.duration}
                </p>
              </div>
            )}

            {service.rating && (
              <div className="border-l-4 border-yellow-600 pl-4">
                <div className="flex items-center gap-2 mb-1">
                  <FaStar className="text-yellow-600" />
                  <span className="text-sm text-gray-600">Rating</span>
                </div>
                <p className="text-xl font-bold text-gray-900">
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
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">Features</h4>
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-3 text-gray-600"
                  >
                    <FaCheckCircle className="text-green-600 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Requirements */}
          {service.requirements && service.requirements.length > 0 && (
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">Requirements</h4>
              <ul className="space-y-2">
                {service.requirements.map((req, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-3 text-gray-600"
                  >
                    <span className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></span>
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tags */}
          {service.tags && service.tags.length > 0 && (
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">Tags</h4>
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

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 pt-6 border-t">
            <div className="text-center">
              <p className="text-gray-600 text-sm">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">
                {service.totalOrders || 0}
              </p>
            </div>
            <div className="text-center">
              <p className="text-gray-600 text-sm">Total Ratings</p>
              <p className="text-2xl font-bold text-gray-900">
                {service.totalRatings || 0}
              </p>
            </div>
          </div>
        </div>

        {/* Close Button */}
        <div className="border-t p-6 bg-gray-50 flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-400 transition font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailModal;
