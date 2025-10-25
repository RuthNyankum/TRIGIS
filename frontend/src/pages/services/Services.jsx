import React, { useState, useEffect } from "react";
import { FaSearch, FaFilter, FaStar } from "react-icons/fa";
import api from "../../config/axios";
import ServiceCard from "../../components/ServiceCard";
import { COLOR_MAP, CATEGORIES } from "../../config/serviceConfig";

const Services = () => {
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/services/all?limit=100");
      if (data.success) {
        setServices(data.data);
        setError("");
      } else {
        setError(data.message || "Failed to load services");
      }
    } catch (error) {
      console.error("Error fetching services:", error);
      setError("Failed to load services. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || service.category === selectedCategory;

    let matchesPrice = true;
    if (priceRange !== "all") {
      const ranges = {
        low: { min: 0, max: 100 },
        medium: { min: 100, max: 500 },
        high: { min: 500, max: 5000 },
      };
      const range = ranges[priceRange];
      if (range) {
        matchesPrice = service.price >= range.min && service.price <= range.max;
      }
    }

    return matchesSearch && matchesCategory && matchesPrice;
  });

  const featuredServices = filteredServices.filter((s) => s.isFeatured);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="gradient-bg text-white py-12 mb-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Our Services</h1>
          <p className="text-blue-100 text-lg">
            Professional services to help your business succeed
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Prices</option>
              <option value="low">₵0 - ₵1,000</option>
              <option value="medium">₵1,000 - ₵5,000</option>
              <option value="high">₵5,000+</option>
            </select>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-full font-medium transition ${
                selectedCategory === "all"
                  ? "gradient-bg text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              All Categories
            </button>
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-medium transition ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-100 text-red-800 rounded-lg">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">Loading services...</p>
          </div>
        ) : (
          <>
            {/* Featured Services */}
            {featuredServices.length > 0 && (
              <div className="mb-12">
                <div className="flex items-center gap-2 mb-6">
                  <FaStar className="text-yellow-500 w-6 h-6" />
                  <h2 className="text-2xl font-bold text-gray-900">
                    Featured Services
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredServices.slice(0, 3).map((service) => (
                    <ServiceCard key={service._id} service={service} />
                  ))}
                </div>
              </div>
            )}

            {/* All Services */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                All Services
              </h2>
              {filteredServices.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredServices.map((service) => (
                    <ServiceCard key={service._id} service={service} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-white rounded-lg">
                  <FaFilter className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">
                    No services found matching your criteria.
                  </p>
                  <p className="text-gray-400 text-sm mt-2">
                    Try adjusting your filters or search terms.
                  </p>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* CTA Section */}
      {!loading && (
        <div className="bg-blue-600 text-white py-16 mt-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-blue-100 mb-6">
              Contact us for custom service offerings tailored to your needs.
            </p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-blue-50 transition">
              Get in Touch
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;
