import React from "react";
import { useNavigate } from "react-router";
import {
  FaStar,
  FaMoneyBillWave, // ✅ replaced FaDollarSign
  FaClock,
  FaCheckCircle,
  FaArrowRight,
  FaEdit,
  FaTrashAlt,
} from "react-icons/fa";
import { COLOR_MAP } from "../config/serviceConfig";
import { formatCurrency } from "../utils/formatCurrency"; // ✅ import formatter

const ServiceCard = ({ service, onEdit, onDelete, isAdmin = false }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/services/${service._id}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition overflow-hidden group">
      {/* Card Header */}
      <div
        className={`h-32 ${
          COLOR_MAP[service.defaultCardColor] || "bg-blue-500"
        } flex items-center justify-center relative`}
      >
        <div className="w-16 h-16 text-white opacity-80 group-hover:opacity-100 transition flex items-center justify-center">
          <FaCheckCircle size={40} />
        </div>

        {/* Featured Badge */}
        {service.isFeatured && (
          <div className="absolute top-3 right-3 bg-yellow-400 text-gray-900 px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-md">
            <FaStar className="w-3 h-3" />
            Featured
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-5">
        {/* Category & Title */}
        <div className="mb-2">
          <span className="text-xs font-semibold text-blue-600 uppercase">
            {service.category}
          </span>
          <h3 className="font-bold text-gray-900 text-lg line-clamp-1">
            {service.title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {service.description}
        </p>

        {/* Metadata */}
        <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
          {service.deliveryTime && (
            <div className="flex items-center gap-1 text-gray-600">
              <FaClock className="w-3 h-3" />
              <span>{service.deliveryTime}</span>
            </div>
          )}
          {service.rating && (
            <div className="flex items-center gap-1 text-gray-600">
              <FaStar className="w-3 h-3 text-yellow-500" />
              <span>{service.rating}</span>
            </div>
          )}
        </div>

        {/* Price & Buttons */}
        <div className="border-t pt-3">
          {/* Price */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-1">
              <FaMoneyBillWave className="text-green-600 w-4 h-4" />
              <span className="font-bold text-gray-900">
                {formatCurrency(service.price)}
              </span>
            </div>
            <span className="text-xs text-gray-500">{service.pricingType}</span>
          </div>

          {/* Admin vs User Buttons */}
          {isAdmin ? (
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(service)}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium flex items-center justify-center gap-2"
              >
                <FaEdit size={14} />
                Edit
              </button>
              <button
                onClick={() => onDelete(service._id)}
                className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition text-sm font-medium flex items-center justify-center gap-2"
              >
                <FaTrashAlt size={14} />
                Delete
              </button>
            </div>
          ) : (
            <button
              onClick={handleViewDetails}
              className="w-full bg-purple-600 hover:bg-yellow-500 text-white py-2 rounded-lg transition flex items-center justify-center gap-2 text-sm font-medium"
            >
              View Details
              <FaArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
