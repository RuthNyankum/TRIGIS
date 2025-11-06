import Contact from "../models/contact.js";
import {
  sendAdminNotification,
  sendClientAutoReply,
} from "../config/sendMail.js";

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
export const submitContactForm = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      company,
      service,
      budget,
      message,
      projectType,
    } = req.body;

    // Create contact record
    const contact = await Contact.create({
      firstName,
      lastName,
      email,
      phone,
      company,
      service,
      budget,
      message,
      projectType,
      ipAddress: req.ip,
      userAgent: req.get("user-agent"),
    });

    // Send emails asynchronously (don't wait for them)
    Promise.all([
      sendAdminNotification(contact),
      sendClientAutoReply(contact),
    ]).catch((error) => {
      console.error("Email sending error:", error);
      // Don't fail the request if emails fail
    });

    res.status(201).json({
      success: true,
      message:
        "Thank you for contacting us! We'll get back to you within 24 hours.",
      data: {
        id: contact._id,
        fullName: contact.fullName,
        email: contact.email,
      },
    });
  } catch (error) {
    console.error("Contact form error:", error);

    // Handle validation errors
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors,
      });
    }

    res.status(500).json({
      success: false,
      message:
        "An error occurred. Please try again later or contact us directly.",
    });
  }
};

// @desc    Get all contacts (Admin only)
// @route   GET /api/contact
// @access  Private/Admin
export const getAllContacts = async (req, res) => {
  try {
    const { status, page = 1, limit = 10, search } = req.query;

    const query = {};

    // Filter by status
    if (status) {
      query.status = status;
    }

    // Search by name or email
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
      ];
    }

    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .lean();

    const count = await Contact.countDocuments(query);

    res.status(200).json({
      success: true,
      data: contacts,
      pagination: {
        total: count,
        page: Number(page),
        pages: Math.ceil(count / limit),
      },
    });
  } catch (error) {
    console.error("Get contacts error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching contacts",
    });
  }
};

// @desc    Get single contact (Admin only)
// @route   GET /api/contact/:id
// @access  Private/Admin
export const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    res.status(200).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    console.error("Get contact error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching contact",
    });
  }
};

// @desc    Update contact status (Admin only)
// @route   PATCH /api/contact/:id
// @access  Private/Admin
export const updateContactStatus = async (req, res) => {
  try {
    const { status, responded, notes } = req.body;

    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    if (status) contact.status = status;
    if (typeof responded !== "undefined") contact.responded = responded;
    if (notes) contact.notes = notes;

    await contact.save();

    res.status(200).json({
      success: true,
      message: "Contact updated successfully",
      data: contact,
    });
  } catch (error) {
    console.error("Update contact error:", error);
    res.status(500).json({
      success: false,
      message: "Error updating contact",
    });
  }
};

// @desc    Delete contact (Admin only)
// @route   DELETE /api/contact/:id
// @access  Private/Admin
export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    await contact.deleteOne();

    res.status(200).json({
      success: true,
      message: "Contact deleted successfully",
    });
  } catch (error) {
    console.error("Delete contact error:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting contact",
    });
  }
};

// @desc    Get contact statistics (Admin only)
// @route   GET /api/contact/stats
// @access  Private/Admin
export const getContactStats = async (req, res) => {
  try {
    const total = await Contact.countDocuments();
    const newContacts = await Contact.countDocuments({ status: "new" });
    const contacted = await Contact.countDocuments({ status: "contacted" });
    const inProgress = await Contact.countDocuments({ status: "in-progress" });
    const completed = await Contact.countDocuments({ status: "completed" });

    // Get contacts by service
    const serviceStats = await Contact.aggregate([
      {
        $group: {
          _id: "$service",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]);

    // Get contacts by month (last 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const monthlyStats = await Contact.aggregate([
      {
        $match: {
          createdAt: { $gte: sixMonthsAgo },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    res.status(200).json({
      success: true,
      data: {
        summary: {
          total,
          newContacts,
          contacted,
          inProgress,
          completed,
        },
        serviceStats,
        monthlyStats,
      },
    });
  } catch (error) {
    console.error("Get stats error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching statistics",
    });
  }
};
