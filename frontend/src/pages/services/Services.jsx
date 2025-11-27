import React, { useEffect, useMemo } from "react";
import { FaSearch, FaFilter, FaStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import ServiceCard from "../../components/ServiceCard";
import { Link } from "react-router";
import { COLOR_MAP, CATEGORIES } from "../../config/serviceConfig";
import {
  fetchServices,
  setSearchTerm,
  setSelectedCategory,
  setPriceRange,
} from "../../redux/slice/users/servicesSlice";

const Services = () => {
  const dispatch = useDispatch();

  // Redux state
  const { services, loading, error, searchTerm, selectedCategory, priceRange } =
    useSelector((state) => state.services);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  // Filter services
  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const matchesSearch =
        service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" || service.category === selectedCategory;

      let matchesPrice = true;
      if (priceRange !== "all") {
        const ranges = {
          low: { min: 0, max: 1000 },
          medium: { min: 1000, max: 5000 },
          high: { min: 5000, max: Infinity },
        };
        const range = ranges[priceRange];
        if (range) {
          matchesPrice =
            service.price >= range.min && service.price <= range.max;
        }
      }

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [services, searchTerm, selectedCategory, priceRange]);

  const featuredServices = useMemo(
    () => filteredServices.filter((s) => s.isFeatured),
    [filteredServices]
  );

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
          {/* Search + Price Filter */}
          <div className="flex flex-col lg:flex-row gap-4 mb-6 justify-center">
            {/* Search Input */}
            <div className="flex-1 relative max-w-md">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => dispatch(setSearchTerm(e.target.value))}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7E1394] transition"
              />
            </div>

            {/* Price Dropdown */}
            <div>
              <select
                value={priceRange}
                onChange={(e) => dispatch(setPriceRange(e.target.value))}
                className="px-4 py-3 border-2 border-transparent rounded-lg bg-white text-[#7E1394] font-medium
                  focus:outline-none focus:ring-2 focus:ring-[#7E1394] transition cursor-pointer
                hover:border-[#7E1394]"
                style={{
                  backgroundImage:
                    "linear-gradient(white, white), linear-gradient(to right, #7E1394, #CCD431)",
                  backgroundOrigin: "border-box",
                  backgroundClip: "padding-box, border-box",
                }}
              >
                <option value="all">All Prices</option>
                <option value="low">₵0 - ₵1,000</option>
                <option value="medium">₵1,000 - ₵5,000</option>
                <option value="high">₵5,000+</option>
              </select>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex justify-center">
            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={() => dispatch(setSelectedCategory("all"))}
                className={`px-4 py-2 rounded-full font-medium transition ${
                  selectedCategory === "all"
                    ? "text-white bg-gradient-to-r from-[#7E1394] to-[#CCD431] shadow-md"
                    : "bg-gray-100 text-gray-700 hover:text-[#7E1394] hover:border-[#7E1394] hover:bg-gray-200"
                }`}
              >
                All Categories
              </button>

              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => dispatch(setSelectedCategory(category))}
                  className={`px-4 py-2 rounded-full font-medium border transition ${
                    selectedCategory === category
                      ? "text-white bg-gradient-to-r from-[#7E1394] to-[#CCD431] shadow-md"
                      : "bg-gray-100 text-gray-700 hover:text-[#7E1394] hover:border-[#7E1394] hover:bg-gray-200"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
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
        <div
          className="text-white py-16 mt-16"
          style={{ background: "linear-gradient(to right, #7E1394, #CCD431)" }}
        >
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-white/90 mb-6">
              Contact us for custom service offerings tailored to your needs.
            </p>
            <Link
              to="/contact-us"
              className="inline-block bg-white text-[#7E1394] px-8 py-3 rounded-lg font-bold shadow-md hover:bg-[#f9f9f9] hover:shadow-lg transition"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;
