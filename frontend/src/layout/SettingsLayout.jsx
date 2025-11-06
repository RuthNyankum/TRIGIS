// src/components/SettingsLayout.jsx
import React from "react";

const SettingsLayout = ({ title, children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-6">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8">
        <h2
          className="text-3xl font-bold mb-6 text-transparent bg-clip-text"
          style={{ backgroundImage: "var(--brand-gradient)" }}
        >
          {title}
        </h2>
        <div className="space-y-6">{children}</div>
      </div>
    </div>
  );
};

export default SettingsLayout;
