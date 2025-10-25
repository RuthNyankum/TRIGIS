import Service from "../models/services.js";

// Create service
export const createService = async (req, res) => {
  try {
    const serviceData = {
      ...req.body,
      provider: req.user._id,
      providerName: req.user.name || req.user.fullName,
    };

    const service = await Service.create(serviceData);

    res.status(201).json({
      success: true,
      data: service,
      message: "Service created successfully",
    });
  } catch (error) {
    console.error("Error creating service:", error);
    res.status(400).json({
      success: false,
      message: error.message || "Error creating service",
    });
  }
};

// Get all services
export const getAllServices = async (req, res) => {
  try {
    const {
      search,
      category,
      minPrice,
      maxPrice,
      page = 1,
      limit = 12,
    } = req.query;

    let query = { status: "active" };

    // Search functionality
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // Filter by category
    if (category && category !== "all") {
      query.category = category;
    }

    // Filter by price range
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const skip = (page - 1) * limit;

    const services = await Service.find(query)
      .sort({ isFeatured: -1, createdAt: -1 })
      .limit(Number(limit))
      .skip(Number(skip))
      .populate("provider", "name email");

    const total = await Service.countDocuments(query);

    res.status(200).json({
      success: true,
      data: services,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    console.error("Error fetching services:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Error fetching services",
    });
  }
};

// Get single service
export const getService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id).populate(
      "provider",
      "name email"
    );

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    res.status(200).json({
      success: true,
      data: service,
    });
  } catch (error) {
    console.error("Error fetching service:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Error fetching service",
    });
  }
};

// Update service
export const updateService = async (req, res) => {
  try {
    const { id } = req.params;

    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    // Check if user is authorized to update (owner or admin)
    if (
      service.provider.toString() !== req.user._id.toString() &&
      req.user.role !== "admin" &&
      req.user.role !== "superadmin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this service",
      });
    }

    const updatedService = await Service.findByIdAndUpdate(
      id,
      { ...req.body, provider: req.user._id },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      data: updatedService,
      message: "Service updated successfully",
    });
  } catch (error) {
    console.error("Error updating service:", error);
    res.status(400).json({
      success: false,
      message: error.message || "Error updating service",
    });
  }
};

// Delete service
export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    const service = await Service.findById(id);
    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found",
      });
    }

    // Check if user is authorized to delete (owner or admin)
    if (
      service.provider.toString() !== req.user._id.toString() &&
      req.user.role !== "admin" &&
      req.user.role !== "superadmin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this service",
      });
    }

    await Service.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Service deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting service:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Error deleting service",
    });
  }
};
