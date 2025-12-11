// import React, { useEffect } from "react";
// import { FaTimes, FaSave } from "react-icons/fa";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   setEditingServiceField,
//   addArrayField,
//   removeArrayField,
//   clearEditingService,
//   createAdminService,
//   updateAdminService,
// } from "../redux/slice/admin/adminServiceFormSlice";
// import { fetchAdminServices } from "../redux/slice/admin/adminServicesSlice";
// import { CATEGORIES, COLORS, PRICING_TYPES } from "../config/serviceConfig";

// const ServiceForm = ({ onCancel }) => {
//   const dispatch = useDispatch();

//   // Redux state
//   const formData = useSelector(
//     (state) => state.adminServiceForm.editingService
//   );
//   const loading = useSelector((state) => state.adminServiceForm.loading);
//   const isEditing = Boolean(formData._id);

//   // Cleanup on unmount
//   useEffect(() => {
//     return () => {
//       dispatch(clearEditingService());
//     };
//   }, [dispatch]);

//   // Handlers
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     dispatch(
//       setEditingServiceField({
//         field: name,
//         value: type === "checkbox" ? checked : value,
//       })
//     );
//   };

//   const handleArrayChange = (field, index, value) => {
//     dispatch(addArrayField({ field, index, value }));
//   };

//   const handleAddArray = (field) => {
//     dispatch(addArrayField({ field }));
//   };

//   const handleRemoveArray = (field, index) => {
//     dispatch(removeArrayField({ field, index }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       if (isEditing) {
//         await dispatch(
//           updateAdminService({ id: formData._id, formData })
//         ).unwrap();
//       } else {
//         await dispatch(createAdminService(formData)).unwrap();
//       }

//       // Refresh services list
//       dispatch(fetchAdminServices());

//       // Close modal
//       onCancel();
//     } catch (error) {
//       console.error("Error saving service:", error);
//     }
//   };

//   const handleCancel = () => {
//     dispatch(clearEditingService());
//     onCancel();
//   };

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//       <div className="bg-white rounded-xl p-8 max-w-2xl w-full max-h-screen overflow-y-auto">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-bold">
//             {isEditing ? "Edit Service" : "Create New Service"}
//           </h2>
//           <button
//             onClick={handleCancel}
//             className="text-gray-500 hover:text-gray-700"
//           >
//             <FaTimes size={24} />
//           </button>
//         </div>

//         {/* Form */}
//         <form className="space-y-4" onSubmit={handleSubmit}>
//           {/* Title */}
//           <InputField
//             label="Service Title *"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             required
//           />

//           {/* Description */}
//           <TextAreaField
//             label="Description *"
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             required
//           />

//           {/* Short Description */}
//           <InputField
//             label="Short Description"
//             name="shortDescription"
//             value={formData.shortDescription}
//             onChange={handleChange}
//           />

//           {/* Category & Price */}
//           <div className="grid grid-cols-2 gap-4">
//             <SelectField
//               label="Category"
//               name="category"
//               value={formData.category}
//               onChange={handleChange}
//               options={CATEGORIES}
//             />
//             <InputField
//               label="Price *"
//               name="price"
//               type="number"
//               value={formData.price}
//               onChange={handleChange}
//               required
//             />
//           </div>

//           {/* Pricing Type & Card Color */}
//           <div className="grid grid-cols-2 gap-4">
//             <SelectField
//               label="Pricing Type"
//               name="pricingType"
//               value={formData.pricingType}
//               onChange={handleChange}
//               options={PRICING_TYPES}
//             />
//             {/* <SelectField
//               label="Card Color"
//               name="defaultCardColor"
//               value={formData.defaultCardColor}
//               onChange={handleChange}
//               options={COLORS.map(
//                 (c) => c.charAt(0).toUpperCase() + c.slice(1)
//               )}
//             /> */}
//             <SelectField
//               label="Card Color"
//               name="defaultCardColor"
//               value={formData.defaultCardColor}
//               onChange={handleChange}
//               options={COLORS} // ✅ Don't transform the values!
//             />
//           </div>

//           {/* Delivery Time & Duration */}
//           <div className="grid grid-cols-2 gap-4">
//             <InputField
//               label="Delivery Time"
//               name="deliveryTime"
//               value={formData.deliveryTime}
//               onChange={handleChange}
//             />
//             <InputField
//               label="Duration"
//               name="duration"
//               value={formData.duration}
//               onChange={handleChange}
//             />
//           </div>

//           {/* Status & Featured */}
//           <div className="grid grid-cols-2 gap-4">
//             <SelectField
//               label="Status"
//               name="status"
//               value={formData.status}
//               onChange={handleChange}
//               options={["active", "inactive", "archived"]}
//             />
//             <CheckboxField
//               label="Mark as Featured ⭐"
//               name="isFeatured"
//               checked={formData.isFeatured}
//               onChange={handleChange}
//             />
//           </div>

//           {/* Array Fields */}
//           <ArrayFieldGroup
//             label="Features"
//             fields={formData.features}
//             onAdd={() => handleAddArray("features")}
//             onChange={(idx, val) => handleArrayChange("features", idx, val)}
//             onRemove={(idx) => handleRemoveArray("features", idx)}
//           />

//           <ArrayFieldGroup
//             label="Requirements"
//             fields={formData.requirements}
//             onAdd={() => handleAddArray("requirements")}
//             onChange={(idx, val) => handleArrayChange("requirements", idx, val)}
//             onRemove={(idx) => handleRemoveArray("requirements", idx)}
//           />

//           <ArrayFieldGroup
//             label="Tags"
//             fields={formData.tags}
//             onAdd={() => handleAddArray("tags")}
//             onChange={(idx, val) => handleArrayChange("tags", idx, val)}
//             onRemove={(idx) => handleRemoveArray("tags", idx)}
//           />

//           {/* Buttons */}
//           <div className="flex gap-4 mt-6 pt-4 border-t">
//             <button
//               type="submit"
//               disabled={loading}
//               className="flex-1 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition disabled:opacity-50 flex items-center justify-center gap-2 font-semibold"
//             >
//               <FaSave /> {loading ? "Saving..." : "Save Service"}
//             </button>
//             <button
//               type="button"
//               onClick={handleCancel}
//               className="flex-1 bg-gray-300 text-gray-800 py-3 rounded-lg hover:bg-gray-400 transition font-semibold"
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// // Generic Inputs
// const InputField = ({
//   label,
//   name,
//   value,
//   onChange,
//   type = "text",
//   required = false,
// }) => (
//   <div>
//     <label className="block text-sm font-semibold mb-1">{label}</label>
//     <input
//       type={type}
//       name={name}
//       value={value}
//       onChange={onChange}
//       required={required}
//       className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//     />
//   </div>
// );

// const TextAreaField = ({ label, name, value, onChange, required = false }) => (
//   <div>
//     <label className="block text-sm font-semibold mb-1">{label}</label>
//     <textarea
//       name={name}
//       value={value}
//       onChange={onChange}
//       required={required}
//       rows="3"
//       className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//     />
//   </div>
// );

// const SelectField = ({ label, name, value, onChange, options }) => (
//   <div>
//     <label className="block text-sm font-semibold mb-1">{label}</label>
//     <select
//       name={name}
//       value={value}
//       onChange={onChange}
//       className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//     >
//       {options.map((opt) => (
//         <option key={opt} value={opt}>
//           {opt}
//         </option>
//       ))}
//     </select>
//   </div>
// );

// const CheckboxField = ({ label, name, checked, onChange }) => (
//   <div className="flex items-end">
//     <label className="flex items-center gap-2 cursor-pointer">
//       <input
//         type="checkbox"
//         name={name}
//         checked={checked}
//         onChange={onChange}
//         className="w-4 h-4"
//       />
//       <span className="font-semibold">{label}</span>
//     </label>
//   </div>
// );

// const ArrayFieldGroup = ({ label, fields, onAdd, onChange, onRemove }) => (
//   <div>
//     <label className="block font-semibold mb-2">{label}</label>
//     {fields.map((field, idx) => (
//       <div key={idx} className="flex gap-2 mb-2">
//         <input
//           type="text"
//           placeholder={`Enter ${label.toLowerCase()}`}
//           value={field}
//           onChange={(e) => onChange(idx, e.target.value)}
//           className="flex-1 p-2 border rounded-lg text-sm"
//         />
//         {fields.length > 1 && (
//           <button
//             type="button"
//             onClick={() => onRemove(idx)}
//             className="text-red-600 hover:text-red-800 px-2"
//           >
//             <FaTimes />
//           </button>
//         )}
//       </div>
//     ))}
//     <button
//       type="button"
//       onClick={onAdd}
//       className="text-purple-600 text-sm hover:text-purple-800"
//     >
//       + Add {label.slice(0, -1)}
//     </button>
//   </div>
// );

// export default ServiceForm;

import React, { useEffect } from "react";
import { FaTimes, FaSave } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  setEditingServiceField,
  addArrayField,
  removeArrayField,
  clearEditingService,
  createAdminService,
  updateAdminService,
} from "../redux/slice/admin/adminServiceFormSlice";
import { fetchAdminServices } from "../redux/slice/admin/adminServicesSlice";
import { CATEGORIES, COLORS, PRICING_TYPES } from "../config/serviceConfig";

const ServiceForm = ({ onCancel }) => {
  const dispatch = useDispatch();

  // Redux state
  const formData = useSelector(
    (state) => state.adminServiceForm.editingService
  );
  const loading = useSelector((state) => state.adminServiceForm.loading);
  const isEditing = Boolean(formData._id);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      dispatch(clearEditingService());
    };
  }, [dispatch]);

  // Handlers
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    dispatch(
      setEditingServiceField({
        field: name,
        value: type === "checkbox" ? checked : value,
      })
    );
  };

  const handleArrayChange = (field, index, value) => {
    dispatch(addArrayField({ field, index, value }));
  };

  const handleAddArray = (field) => {
    dispatch(addArrayField({ field }));
  };

  const handleRemoveArray = (field, index) => {
    dispatch(removeArrayField({ field, index }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEditing) {
        await dispatch(
          updateAdminService({ id: formData._id, formData })
        ).unwrap();
      } else {
        await dispatch(createAdminService(formData)).unwrap();
      }

      // Refresh services list
      dispatch(fetchAdminServices());

      // Close modal
      onCancel();
    } catch (error) {
      console.error("Error saving service:", error);
    }
  };

  const handleCancel = () => {
    dispatch(clearEditingService());
    onCancel();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-8 max-w-2xl w-full max-h-screen overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {isEditing ? "Edit Service" : "Create New Service"}
          </h2>
          <button
            onClick={handleCancel}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes size={24} />
          </button>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Title */}
          <InputField
            label="Service Title *"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          {/* Description */}
          <TextAreaField
            label="Description *"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />

          {/* Short Description */}
          <InputField
            label="Short Description"
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
          />

          {/* Category & Price */}
          <div className="grid grid-cols-2 gap-4">
            <SelectField
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              options={CATEGORIES}
            />
            <InputField
              label="Price *"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>

          {/* Pricing Type & Card Color */}
          <div className="grid grid-cols-2 gap-4">
            <SelectField
              label="Pricing Type"
              name="pricingType"
              value={formData.pricingType}
              onChange={handleChange}
              options={PRICING_TYPES}
            />
            <SelectField
              label="Card Color"
              name="defaultCardColor"
              value={formData.defaultCardColor}
              onChange={handleChange}
              options={COLORS}
              capitalize={true}
            />
          </div>

          {/* Delivery Time & Duration */}
          <div className="grid grid-cols-2 gap-4">
            <InputField
              label="Delivery Time"
              name="deliveryTime"
              value={formData.deliveryTime}
              onChange={handleChange}
            />
            <InputField
              label="Duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
            />
          </div>

          {/* Status & Featured */}
          <div className="grid grid-cols-2 gap-4">
            <SelectField
              label="Status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              options={["active", "inactive", "archived"]}
            />
            <CheckboxField
              label="Mark as Featured ⭐"
              name="isFeatured"
              checked={formData.isFeatured}
              onChange={handleChange}
            />
          </div>

          {/* Array Fields */}
          <ArrayFieldGroup
            label="Features"
            fields={formData.features}
            onAdd={() => handleAddArray("features")}
            onChange={(idx, val) => handleArrayChange("features", idx, val)}
            onRemove={(idx) => handleRemoveArray("features", idx)}
          />

          <ArrayFieldGroup
            label="Requirements"
            fields={formData.requirements}
            onAdd={() => handleAddArray("requirements")}
            onChange={(idx, val) => handleArrayChange("requirements", idx, val)}
            onRemove={(idx) => handleRemoveArray("requirements", idx)}
          />

          <ArrayFieldGroup
            label="Tags"
            fields={formData.tags}
            onAdd={() => handleAddArray("tags")}
            onChange={(idx, val) => handleArrayChange("tags", idx, val)}
            onRemove={(idx) => handleRemoveArray("tags", idx)}
          />

          {/* Buttons */}
          <div className="flex gap-4 mt-6 pt-4 border-t">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition disabled:opacity-50 flex items-center justify-center gap-2 font-semibold"
            >
              <FaSave /> {loading ? "Saving..." : "Save Service"}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 bg-gray-300 text-gray-800 py-3 rounded-lg hover:bg-gray-400 transition font-semibold"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Generic Inputs
const InputField = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = false,
}) => (
  <div>
    <label className="block text-sm font-semibold mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
    />
  </div>
);

const TextAreaField = ({ label, name, value, onChange, required = false }) => (
  <div>
    <label className="block text-sm font-semibold mb-1">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      rows="3"
      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
    />
  </div>
);

// ✅ FIXED: SelectField now capitalizes display but keeps value lowercase
const SelectField = ({
  label,
  name,
  value,
  onChange,
  options,
  capitalize = false,
}) => (
  <div>
    <label className="block text-sm font-semibold mb-1">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {/* ✅ Capitalize for display only if needed */}
          {capitalize && typeof opt === "string"
            ? opt.charAt(0).toUpperCase() + opt.slice(1)
            : opt}
        </option>
      ))}
    </select>
  </div>
);

const CheckboxField = ({ label, name, checked, onChange }) => (
  <div className="flex items-end">
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className="w-4 h-4"
      />
      <span className="font-semibold">{label}</span>
    </label>
  </div>
);

const ArrayFieldGroup = ({ label, fields, onAdd, onChange, onRemove }) => (
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

export default ServiceForm;
