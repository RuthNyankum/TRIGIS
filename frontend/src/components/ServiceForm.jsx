import React from "react";
import { FaTimes, FaSave } from "react-icons/fa";
import { CATEGORIES, COLORS, PRICING_TYPES } from "../config/serviceConfig";

const ServiceForm = ({
  formData,
  onChange,
  onArrayChange,
  onAddArrayField,
  onRemoveArrayField,
  onSubmit,
  onCancel,
  isLoading = false,
  isEditing = false,
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-8 max-w-2xl w-full max-h-screen overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {isEditing ? "Edit Service" : "Create New Service"}
          </h2>
          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes size={24} />
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Service Title *
            </label>
            <input
              type="text"
              name="title"
              placeholder="e.g., Web Development"
              value={formData.title}
              onChange={onChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Description *
            </label>
            <textarea
              name="description"
              placeholder="Full service description"
              value={formData.description}
              onChange={onChange}
              rows="3"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Short Description */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Short Description
            </label>
            <input
              type="text"
              name="shortDescription"
              placeholder="Brief description (max 200 chars)"
              value={formData.shortDescription}
              onChange={onChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Category & Price */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={onChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">
                Price *
              </label>
              <input
                type="number"
                name="price"
                placeholder="0.00"
                value={formData.price}
                onChange={onChange}
                min="0"
                step="0.01"
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Pricing Type & Card Color */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">
                Pricing Type
              </label>
              <select
                name="pricingType"
                value={formData.pricingType}
                onChange={onChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {PRICING_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">
                Card Color
              </label>
              <select
                name="defaultCardColor"
                value={formData.defaultCardColor}
                onChange={onChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {COLORS.map((color) => (
                  <option key={color} value={color}>
                    {color.charAt(0).toUpperCase() + color.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Delivery Time & Duration */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">
                Delivery Time
              </label>
              <input
                type="text"
                name="deliveryTime"
                placeholder="e.g., 2-3 days"
                value={formData.deliveryTime}
                onChange={onChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">
                Duration
              </label>
              <input
                type="text"
                name="duration"
                placeholder="e.g., 1 hour"
                value={formData.duration}
                onChange={onChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {/* Status & Featured */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={onChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            <div className="flex items-end">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={formData.isFeatured}
                  onChange={onChange}
                  className="w-4 h-4"
                />
                <span className="font-semibold">Mark as Featured ⭐</span>
              </label>
            </div>
          </div>

          {/* Features */}
          <ArrayFieldGroup
            label="Features"
            fields={formData.features}
            fieldName="features"
            onAdd={() => onAddArrayField("features")}
            onChange={(idx, val) => onArrayChange("features", idx, val)}
            onRemove={(idx) => onRemoveArrayField("features", idx)}
          />

          {/* Requirements */}
          <ArrayFieldGroup
            label="Requirements"
            fields={formData.requirements}
            fieldName="requirements"
            onAdd={() => onAddArrayField("requirements")}
            onChange={(idx, val) => onArrayChange("requirements", idx, val)}
            onRemove={(idx) => onRemoveArrayField("requirements", idx)}
          />

          {/* Tags */}
          <ArrayFieldGroup
            label="Tags"
            fields={formData.tags}
            fieldName="tags"
            onAdd={() => onAddArrayField("tags")}
            onChange={(idx, val) => onArrayChange("tags", idx, val)}
            onRemove={(idx) => onRemoveArrayField("tags", idx)}
          />

          {/* Submit & Cancel Buttons */}
          <div className="flex gap-4 mt-6 pt-4 border-t">
            <button
              onClick={onSubmit}
              disabled={isLoading}
              className="flex-1 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition disabled:opacity-50 flex items-center justify-center gap-2 font-semibold"
            >
              <FaSave /> {isLoading ? "Saving..." : "Save Service"}
            </button>
            <button
              onClick={onCancel}
              className="flex-1 bg-gray-300 text-gray-800 py-3 rounded-lg hover:bg-gray-400 transition font-semibold"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sub-component for array fields (Features, Requirements, Tags)
const ArrayFieldGroup = ({ label, fields, onAdd, onChange, onRemove }) => {
  return (
    <div>
      <label className="block font-semibold mb-2">{label}</label>
      {fields.map((field, idx) => (
        <div key={idx} className="flex gap-2 mb-2">
          <input
            type="text"
            placeholder={`Enter ${label.toLowerCase()}`}
            value={field}
            onChange={(e) => onChange(idx, e.target.value)}
            className="flex-1 p-2 border rounded-lg text-sm"
          />
          {fields.length > 1 && (
            <button
              type="button"
              onClick={() => onRemove(idx)}
              className="text-red-600 hover:text-red-800 px-2"
            >
              <FaTimes />
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={onAdd}
        className="text-purple-600 text-sm hover:text-purple-800"
      >
        + Add {label.slice(0, -1)}
      </button>
    </div>
  );
};

export default ServiceForm;
