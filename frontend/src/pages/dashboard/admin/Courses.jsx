import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaVideo,
  FaFileAlt,
  FaChevronDown,
  FaChevronUp,
  FaBook,
  FaUpload,
} from "react-icons/fa";

const API_BASE = "/api/courses/admin";

const ManageCourses = () => {
  const [courses, setCourses] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [editingCourseId, setEditingCourseId] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showCurriculum, setShowCurriculum] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Programming",
    price: 0,
    duration: "",
    level: "Beginner",
    instructorName: "",
    instructorId: "",
    learningOutcomes: [""],
    requirements: [""],
    defaultCardColor: "purple",
    status: "draft",
  });
  const [stats, setStats] = useState({
    totalCourses: 0,
    publishedCourses: 0,
    draftCourses: 0,
    totalEnrollments: 0,
  });
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState({});

  // Section/Lesson states
  const [newSection, setNewSection] = useState({ title: "", description: "" });
  const [newLesson, setNewLesson] = useState({
    title: "",
    description: "",
    type: "video",
    video: { url: "", duration: 0, provider: "youtube" },
    content: "",
  });
  const [expandedSections, setExpandedSections] = useState({});
  const [pendingVideoFile, setPendingVideoFile] = useState(null);
  const [pendingPdfFile, setPendingPdfFile] = useState(null);

  // Fetch functions
  const fetchCurrentUser = async () => {
    try {
      const response = await axios.get("/api/auth/me", {
        withCredentials: true,
      });
      const userData =
        response.data?.data || response.data?.user || response.data;
      setCurrentUser(userData);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await axios.get(API_BASE, { withCredentials: true });
      setCourses(response.data?.data || []);
    } catch (error) {
      console.error("Error fetching courses:", error);
      setCourses([]);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API_BASE}/stats`, {
        withCredentials: true,
      });
      setStats({
        totalCourses: response.data?.data?.totalCourses || 0,
        publishedCourses: response.data?.data?.publishedCourses || 0,
        draftCourses: response.data?.data?.draftCourses || 0,
        totalEnrollments: response.data?.data?.totalEnrollments || 0,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const fetchCourseDetails = async (courseId) => {
    try {
      const response = await axios.get(`${API_BASE}/${courseId}`, {
        withCredentials: true,
      });
      setSelectedCourse(response.data?.data?.course || response.data?.data);
      setShowCurriculum(true);
    } catch (error) {
      console.error("Error fetching course details:", error);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
    fetchCourses();
    fetchStats();
  }, []);

  useEffect(() => {
    if (currentUser && !formData.instructorName && !formData.instructorId) {
      setFormData((prev) => ({
        ...prev,
        instructorName: currentUser.fullName || currentUser.name || "",
        instructorId: currentUser._id || "",
      }));
    }
  }, [currentUser]);

  // Course CRUD operations
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleListChange = (index, field, value) => {
    setFormData((prev) => {
      const updated = [...prev[field]];
      updated[index] = value;
      return { ...prev, [field]: updated };
    });
  };

  const addField = (field) => {
    setFormData((prev) => ({ ...prev, [field]: [...prev[field], ""] }));
  };

  const useMyInfo = () => {
    if (currentUser) {
      setFormData((prev) => ({
        ...prev,
        instructorName: currentUser.fullName || currentUser.name || "",
        instructorId: currentUser._id || "",
      }));
      alert(" Your info has been filled in!");
    }
  };

  const handlePublish = async (courseId) => {
    try {
      await axios.put(
        `${API_BASE}/${courseId}`,
        { status: "published", isPublished: true },
        { withCredentials: true }
      );
      alert("✅ Course published successfully!");
      await fetchCourses();
      await fetchStats();
    } catch (error) {
      console.error("Error publishing course:", error);
      alert("❌ Failed to publish course");
    }
  };

  const handleUnpublish = async (courseId) => {
    try {
      await axios.put(
        `${API_BASE}/${courseId}`,
        { status: "draft", isPublished: false },
        { withCredentials: true }
      );
      alert("📤 Course unpublished successfully!");
      await fetchCourses();
      await fetchStats();
    } catch (error) {
      console.error("Error unpublishing course:", error);
      alert("❌ Failed to unpublish course");
    }
  };

  const handleDelete = async (courseId) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      await axios.delete(`${API_BASE}/${courseId}`, { withCredentials: true });
      alert("🗑️ Course deleted successfully!");
      await fetchCourses();
      await fetchStats();
    } catch (error) {
      console.error("Error deleting course:", error);
      alert("❌ Failed to delete course");
    }
  };

  const handleEdit = (course) => {
    setFormData({
      title: course.title || "",
      description: course.description || "",
      category: course.category || "Programming",
      price: course.price || 0,
      duration: course.duration || "",
      level: course.level || "Beginner",
      instructorName: course.instructorName || currentUser?.name || "",
      instructorId: course.instructorId || currentUser?._id || "",
      learningOutcomes: course.learningOutcomes?.length
        ? course.learningOutcomes
        : [""],
      requirements: course.requirements?.length ? course.requirements : [""],
      defaultCardColor: course.defaultCardColor || "purple",
      status: course.status || "draft",
    });
    setEditingCourseId(course._id);
    setShowAddModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.instructorName.trim() || !formData.title.trim()) {
      alert("❌ All required fields must be filled");
      return;
    }
    setLoading(true);

    const payload = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      category: formData.category,
      price: parseFloat(formData.price) || 0,
      duration: formData.duration.trim(),
      level: formData.level,
      learningOutcomes: formData.learningOutcomes.filter((v) => v.trim()),
      requirements: formData.requirements.filter((v) => v.trim()),
      defaultCardColor: formData.defaultCardColor,
      status: formData.status,
      instructorName: formData.instructorName,
      instructorId: formData.instructorId,
    };

    try {
      if (editingCourseId) {
        await axios.put(`${API_BASE}/${editingCourseId}`, payload, {
          withCredentials: true,
        });
        alert(`✅ Course "${payload.title}" updated successfully!`);
      } else {
        await axios.post(API_BASE, payload, { withCredentials: true });
        alert(`✅ Course "${payload.title}" created successfully!`);
      }

      setShowAddModal(false);
      setEditingCourseId(null);
      setFormData({
        title: "",
        description: "",
        category: "Programming",
        price: 0,
        duration: "",
        level: "Beginner",
        instructorName: currentUser?.fullName || currentUser?.name || "",
        instructorId: currentUser?._id || "",
        learningOutcomes: [""],
        requirements: [""],
        defaultCardColor: "purple",
        status: "draft",
      });

      await fetchCourses();
      await fetchStats();
    } catch (error) {
      console.error("Error saving course:", error);
      alert(
        `❌ ${
          error.response?.data?.error ||
          error.response?.data?.message ||
          "Something went wrong."
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  // Section operations
  const handleAddSection = async (courseId) => {
    if (!newSection.title.trim()) {
      alert("❌ Section title is required");
      return;
    }

    try {
      await axios.post(`${API_BASE}/${courseId}/sections`, newSection, {
        withCredentials: true,
      });
      alert("✅ Section added successfully!");
      setNewSection({ title: "", description: "" });
      await fetchCourseDetails(courseId);
    } catch (error) {
      console.error("Error adding section:", error);
      alert("❌ Failed to add section");
    }
  };

  const handleDeleteSection = async (courseId, sectionId) => {
    if (!window.confirm("Delete this section?")) return;
    try {
      await axios.delete(`${API_BASE}/${courseId}/sections/${sectionId}`, {
        withCredentials: true,
      });
      alert("✅ Section deleted!");
      await fetchCourseDetails(courseId);
    } catch (error) {
      console.error("Error deleting section:", error);
      alert("❌ Failed to delete section");
    }
  };

  // Lesson operations
  const handleAddLesson = async (courseId, sectionId) => {
    if (!newLesson.title.trim()) {
      alert("❌ Lesson title is required");
      return;
    }

    try {
      const payload = {
        ...newLesson,
        video:
          newLesson.type === "video"
            ? {
                ...newLesson.video,
                duration: parseInt(newLesson.video.duration) || 0,
              }
            : undefined,
      };

      const response = await axios.post(
        `${API_BASE}/${courseId}/sections/${sectionId}/lessons`,
        payload,
        { withCredentials: true }
      );

      // If there's a pending video file, upload it
      if (pendingVideoFile && response.data?.data) {
        const course = response.data.data;
        const section = course.sections.find((s) => s._id === sectionId);
        const addedLesson = section.lessons[section.lessons.length - 1];

        await uploadPendingFile(
          pendingVideoFile,
          "video",
          courseId,
          sectionId,
          addedLesson._id
        );
        setPendingVideoFile(null);
      }

      // If there's a pending PDF file, upload it
      if (pendingPdfFile && response.data?.data) {
        const course = response.data.data;
        const section = course.sections.find((s) => s._id === sectionId);
        const addedLesson = section.lessons[section.lessons.length - 1];

        await uploadPendingFile(
          pendingPdfFile,
          "pdf",
          courseId,
          sectionId,
          addedLesson._id
        );
        setPendingPdfFile(null);
      }

      alert("✅ Lesson added successfully!");
      setNewLesson({
        title: "",
        description: "",
        type: "video",
        video: { url: "", duration: 0, provider: "youtube" },
        content: "",
      });
      await fetchCourseDetails(courseId);
    } catch (error) {
      console.error("Error adding lesson:", error);
      alert("❌ Failed to add lesson");
    }
  };

  const uploadPendingFile = async (
    file,
    type,
    courseId,
    sectionId,
    lessonId
  ) => {
    const formData = new FormData();
    formData.append(type === "video" ? "video" : "pdf", file);

    try {
      const endpoint =
        type === "video"
          ? `/api/courses/admin/upload/video`
          : `/api/courses/admin/upload/pdf`;

      const res = await axios.post(endpoint, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      const fileUrl = res.data.url;

      const updatePayload =
        type === "video" ? { video: { url: fileUrl } } : { content: fileUrl };

      await axios.put(
        `${API_BASE}/${courseId}/sections/${sectionId}/lessons/${lessonId}`,
        updatePayload,
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Upload error:", error);
      throw error;
    }
  };

  const handleDeleteLesson = async (courseId, sectionId, lessonId) => {
    if (!window.confirm("Delete this lesson?")) return;
    try {
      await axios.delete(
        `${API_BASE}/${courseId}/sections/${sectionId}/lessons/${lessonId}`,
        { withCredentials: true }
      );
      alert("✅ Lesson deleted!");
      await fetchCourseDetails(courseId);
    } catch (error) {
      console.error("Error deleting lesson:", error);
      alert("❌ Failed to delete lesson");
    }
  };

  const toggleSection = (sectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  // FILE UPLOAD FUNCTION
  const handleFileUpload = async (e, type, courseId, sectionId, lessonId) => {
    const file = e.target.files[0];
    if (!file) return;

    const uploadKey = `${sectionId}-${lessonId}-${type}`;
    setUploadingFiles((prev) => ({ ...prev, [uploadKey]: true }));

    const formData = new FormData();
    formData.append(type === "video" ? "video" : "pdf", file);

    try {
      // Updated endpoints to match course routes
      const endpoint =
        type === "video"
          ? `/api/courses/admin/upload/video`
          : `/api/courses/admin/upload/pdf`;

      const res = await axios.post(endpoint, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      const fileUrl = res.data.url;

      // Update the lesson with the file URL
      const updatePayload =
        type === "video" ? { video: { url: fileUrl } } : { content: fileUrl };

      await axios.put(
        `${API_BASE}/${courseId}/sections/${sectionId}/lessons/${lessonId}`,
        updatePayload,
        { withCredentials: true }
      );

      alert(`✅ ${type.toUpperCase()} uploaded successfully!`);
      await fetchCourseDetails(courseId);
    } catch (error) {
      console.error("Upload error:", error);
      alert(
        `❌ ${type.toUpperCase()} upload failed: ${
          error.response?.data?.message || error.message
        }`
      );
    } finally {
      setUploadingFiles((prev) => {
        const newState = { ...prev };
        delete newState[uploadKey];
        return newState;
      });
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Manage Courses</h1>
          {currentUser && (
            <p className="text-sm text-gray-600 mt-1">
              Logged in as:{" "}
              <span className="font-semibold">
                {currentUser.fullName || currentUser.name}
              </span>{" "}
              <span className="text-xs text-gray-500">
                ({currentUser.role})
              </span>
            </p>
          )}
        </div>
        <button
          onClick={() => {
            setEditingCourseId(null);
            setShowAddModal(true);
          }}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition flex items-center gap-2 cursor-pointer"
        >
          <FaPlus /> Add Course
        </button>
      </header>

      {/* Stats */}
      <section className="grid grid-cols-4 gap-4 mb-6">
        {[
          {
            label: "Total Courses",
            value: stats.totalCourses,
            color: "bg-blue-500",
          },
          {
            label: "Published",
            value: stats.publishedCourses,
            color: "bg-green-500",
          },
          {
            label: "Drafts",
            value: stats.draftCourses,
            color: "bg-yellow-400",
          },
          {
            label: "Enrollments",
            value: stats.totalEnrollments,
            color: "bg-purple-500",
          },
        ].map((item, i) => (
          <div
            key={i}
            className={`${item.color} p-4 rounded-lg shadow text-center text-white`}
          >
            <p className="text-sm opacity-90">{item.label}</p>
            <h2 className="text-2xl font-bold">{item.value}</h2>
          </div>
        ))}
      </section>

      {/* Course List */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-bold text-gray-800 mb-4">All Courses</h2>
        <div className="grid gap-4">
          {courses.length ? (
            courses.map((course) => (
              <div
                key={course._id}
                className="p-4 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800">
                      {course.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{course.category}</p>
                    <p className="text-sm text-gray-500">
                      {course.level} • ${course.price} •{" "}
                      {course.totalLessons || 0} lessons •{" "}
                      {course.totalSections || 0} sections
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`px-3 py-1 text-sm font-medium rounded-full ${
                        course.status === "published"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {course.status}
                    </span>

                    <button
                      onClick={() => fetchCourseDetails(course._id)}
                      className="text-purple-600 hover:text-purple-800 text-sm font-medium flex items-center gap-1"
                    >
                      <FaBook /> Curriculum
                    </button>

                    {course.status === "published" ? (
                      <button
                        onClick={() => handleUnpublish(course._id)}
                        className="text-gray-600 hover:text-gray-800 text-sm font-medium"
                      >
                        Unpublish
                      </button>
                    ) : (
                      <button
                        onClick={() => handlePublish(course._id)}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        Publish
                      </button>
                    )}

                    <button
                      onClick={() => handleEdit(course)}
                      className="text-yellow-600 hover:text-yellow-800 text-sm font-medium"
                    >
                      <FaEdit />
                    </button>

                    <button
                      onClick={() => handleDelete(course._id)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 py-8">
              No courses available yet.
            </p>
          )}
        </div>
      </div>

      {/* Course Form Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg shadow-xl w-full max-w-2xl overflow-y-auto max-h-[90vh]"
          >
            <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">
                {editingCourseId ? "Edit Course" : "Create New Course"}
              </h2>
              <button
                type="button"
                onClick={() => {
                  setShowAddModal(false);
                  setEditingCourseId(null);
                }}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Instructor info */}
              <div className="bg-purple-50 border-l-4 border-purple-600 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-800">
                    👤 Instructor Information
                  </h3>
                  {currentUser && (
                    <button
                      type="button"
                      onClick={useMyInfo}
                      className="text-xs bg-purple-600 text-white px-3 py-1.5 rounded hover:bg-purple-700 transition font-medium"
                    >
                      Use My Info
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Instructor Name *
                    </label>
                    <input
                      type="text"
                      name="instructorName"
                      value={formData.instructorName}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Instructor ID *
                    </label>
                    <input
                      type="text"
                      name="instructorId"
                      value={formData.instructorId}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Course Details */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Course Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  >
                    <option>Programming</option>
                    <option>Design</option>
                    <option>Marketing</option>
                    <option>Business</option>
                    <option>Data Science</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Duration
                  </label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    placeholder="e.g. 4 weeks"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Level
                  </label>
                  <select
                    name="level"
                    value={formData.level}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  >
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Card Color
                  </label>
                  <select
                    name="defaultCardColor"
                    value={formData.defaultCardColor}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  >
                    <option>purple</option>
                    <option>blue</option>
                    <option>green</option>
                    <option>red</option>
                    <option>yellow</option>
                    <option>indigo</option>
                    <option>teal</option>
                    <option>pink</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                ></textarea>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Learning Outcomes
                </label>
                {formData.learningOutcomes.map((outcome, i) => (
                  <input
                    key={i}
                    type="text"
                    value={outcome}
                    onChange={(e) =>
                      handleListChange(i, "learningOutcomes", e.target.value)
                    }
                    placeholder={`Outcome ${i + 1}`}
                    className="w-full p-2 mb-2 border border-gray-300 rounded-lg"
                  />
                ))}
                <button
                  type="button"
                  onClick={() => addField("learningOutcomes")}
                  className="text-xs text-blue-600 hover:underline"
                >
                  + Add Outcome
                </button>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Requirements
                </label>
                {formData.requirements.map((req, i) => (
                  <input
                    key={i}
                    type="text"
                    value={req}
                    onChange={(e) =>
                      handleListChange(i, "requirements", e.target.value)
                    }
                    placeholder={`Requirement ${i + 1}`}
                    className="w-full p-2 mb-2 border border-gray-300 rounded-lg"
                  />
                ))}
                <button
                  type="button"
                  onClick={() => addField("requirements")}
                  className="text-xs text-blue-600 hover:underline"
                >
                  + Add Requirement
                </button>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>

            <div className="sticky bottom-0 bg-gray-50 border-t p-4 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setShowAddModal(false);
                  setEditingCourseId(null);
                }}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {loading
                  ? editingCourseId
                    ? "Updating..."
                    : "Creating..."
                  : editingCourseId
                  ? "Update Course"
                  : "Create Course"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Curriculum Management Modal */}
      {showCurriculum && selectedCourse && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center z-10">
              <h2 className="text-xl font-bold text-gray-800">
                📚 Curriculum: {selectedCourse.title}
              </h2>
              <button
                onClick={() => {
                  setShowCurriculum(false);
                  setSelectedCourse(null);
                }}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Add Section Form */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold mb-3">➕ Add New Section</h3>
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Section Title"
                    value={newSection.title}
                    onChange={(e) =>
                      setNewSection({ ...newSection, title: e.target.value })
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Section Description (optional)"
                    value={newSection.description}
                    onChange={(e) =>
                      setNewSection({
                        ...newSection,
                        description: e.target.value,
                      })
                    }
                    className="w-full p-2 border border-gray-300 rounded-lg"
                  />
                  <button
                    onClick={() => handleAddSection(selectedCourse._id)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                  >
                    Add Section
                  </button>
                </div>
              </div>

              {/* Sections List */}
              <div className="space-y-4">
                {selectedCourse.sections?.length > 0 ? (
                  selectedCourse.sections.map((section, idx) => (
                    <div
                      key={section._id}
                      className="border border-gray-300 rounded-lg"
                    >
                      <div className="bg-gray-100 p-4 flex justify-between items-center">
                        <div className="flex-1">
                          <h3 className="font-bold text-gray-800">
                            Section {idx + 1}: {section.title}
                          </h3>
                          {section.description && (
                            <p className="text-sm text-gray-600 mt-1">
                              {section.description}
                            </p>
                          )}
                          <p className="text-xs text-gray-500 mt-1">
                            {section.lessons?.length || 0} lessons
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleSection(section._id)}
                            className="text-gray-600 hover:text-gray-800"
                          >
                            {expandedSections[section._id] ? (
                              <FaChevronUp />
                            ) : (
                              <FaChevronDown />
                            )}
                          </button>
                          <button
                            onClick={() =>
                              handleDeleteSection(
                                selectedCourse._id,
                                section._id
                              )
                            }
                            className="text-red-600 hover:text-red-800"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>

                      {expandedSections[section._id] && (
                        <div className="p-4 bg-white space-y-4">
                          {/* Add Lesson Form */}
                          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                            <h4 className="font-semibold mb-2 text-sm">
                              ➕ Add Lesson
                            </h4>
                            <div className="space-y-2">
                              <input
                                type="text"
                                placeholder="Lesson Title"
                                value={newLesson.title}
                                onChange={(e) =>
                                  setNewLesson({
                                    ...newLesson,
                                    title: e.target.value,
                                  })
                                }
                                className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                              />
                              <textarea
                                placeholder="Lesson Description"
                                value={newLesson.description}
                                onChange={(e) =>
                                  setNewLesson({
                                    ...newLesson,
                                    description: e.target.value,
                                  })
                                }
                                className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                                rows={2}
                              />
                              <select
                                value={newLesson.type}
                                onChange={(e) =>
                                  setNewLesson({
                                    ...newLesson,
                                    type: e.target.value,
                                  })
                                }
                                className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                              >
                                <option value="video">Video</option>
                                <option value="article">Article</option>
                                <option value="quiz">Quiz</option>
                              </select>

                              {newLesson.type === "video" && (
                                <div className="space-y-2">
                                  <div className="bg-blue-50 p-3 rounded border border-blue-200">
                                    <p className="text-xs font-semibold text-gray-700 mb-2">
                                      Video Source (Choose one):
                                    </p>
                                    <div className="flex gap-2 mb-2">
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setNewLesson({
                                            ...newLesson,
                                            video: {
                                              ...newLesson.video,
                                              provider: "youtube",
                                            },
                                          });
                                          setPendingVideoFile(null);
                                        }}
                                        className={`px-3 py-1 rounded text-xs font-medium ${
                                          newLesson.video.provider === "youtube"
                                            ? "bg-blue-600 text-white"
                                            : "bg-white text-gray-700 border"
                                        }`}
                                      >
                                        📹 URL (YouTube/Vimeo)
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setNewLesson({
                                            ...newLesson,
                                            video: {
                                              ...newLesson.video,
                                              provider: "cloudinary",
                                              url: "",
                                            },
                                          });
                                        }}
                                        className={`px-3 py-1 rounded text-xs font-medium ${
                                          newLesson.video.provider ===
                                          "cloudinary"
                                            ? "bg-blue-600 text-white"
                                            : "bg-white text-gray-700 border"
                                        }`}
                                      >
                                        ☁️ Upload File
                                      </button>
                                    </div>

                                    {newLesson.video.provider === "youtube" ? (
                                      <input
                                        type="text"
                                        placeholder="Enter YouTube/Vimeo URL"
                                        value={newLesson.video.url}
                                        onChange={(e) =>
                                          setNewLesson({
                                            ...newLesson,
                                            video: {
                                              ...newLesson.video,
                                              url: e.target.value,
                                            },
                                          })
                                        }
                                        className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                                      />
                                    ) : (
                                      <div>
                                        <input
                                          type="file"
                                          accept="video/mp4,video/mov,video/avi,video/mkv"
                                          onChange={(e) => {
                                            const file = e.target.files[0];
                                            if (file) {
                                              setPendingVideoFile(file);
                                            }
                                          }}
                                          className="w-full text-sm"
                                        />
                                        {pendingVideoFile && (
                                          <p className="text-xs text-green-600 mt-1">
                                            ✅ {pendingVideoFile.name} ready to
                                            upload
                                          </p>
                                        )}
                                      </div>
                                    )}
                                  </div>

                                  <input
                                    type="number"
                                    placeholder="Duration (seconds) - optional"
                                    value={newLesson.video.duration}
                                    onChange={(e) =>
                                      setNewLesson({
                                        ...newLesson,
                                        video: {
                                          ...newLesson.video,
                                          duration: e.target.value,
                                        },
                                      })
                                    }
                                    className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                                  />
                                </div>
                              )}

                              {newLesson.type === "article" && (
                                <div className="space-y-2">
                                  <textarea
                                    placeholder="Article Content (HTML/Markdown)"
                                    value={newLesson.content}
                                    onChange={(e) =>
                                      setNewLesson({
                                        ...newLesson,
                                        content: e.target.value,
                                      })
                                    }
                                    className="w-full p-2 border border-gray-300 rounded-lg text-sm"
                                    rows={4}
                                  />

                                  <div className="bg-purple-50 p-3 rounded border border-purple-200">
                                    <p className="text-xs font-semibold text-gray-700 mb-2">
                                      📄 Optional: Attach PDF
                                    </p>
                                    <input
                                      type="file"
                                      accept="application/pdf"
                                      onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                          setPendingPdfFile(file);
                                        }
                                      }}
                                      className="w-full text-sm"
                                    />
                                    {pendingPdfFile && (
                                      <p className="text-xs text-green-600 mt-1">
                                        ✅ {pendingPdfFile.name} ready to upload
                                      </p>
                                    )}
                                  </div>
                                </div>
                              )}

                              <button
                                onClick={() =>
                                  handleAddLesson(
                                    selectedCourse._id,
                                    section._id
                                  )
                                }
                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
                              >
                                Add Lesson
                              </button>
                            </div>
                          </div>

                          {/* Lessons List */}
                          <div className="space-y-2">
                            {section.lessons?.length > 0 ? (
                              section.lessons.map((lesson, lessonIdx) => (
                                <div
                                  key={lesson._id}
                                  className="bg-gray-50 rounded-lg border border-gray-200 p-3"
                                >
                                  <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                      {lesson.type === "video" ? (
                                        <FaVideo className="text-blue-600" />
                                      ) : lesson.type === "article" ? (
                                        <FaFileAlt className="text-green-600" />
                                      ) : (
                                        <FaBook className="text-purple-600" />
                                      )}
                                      <div>
                                        <p className="font-medium text-sm">
                                          {lessonIdx + 1}. {lesson.title}
                                        </p>
                                        <div className="flex items-center gap-2 mt-1">
                                          <p className="text-xs text-gray-500">
                                            {lesson.type === "video" &&
                                            lesson.video?.duration
                                              ? `${Math.floor(
                                                  lesson.video.duration / 60
                                                )}:${(
                                                  lesson.video.duration % 60
                                                )
                                                  .toString()
                                                  .padStart(2, "0")} min`
                                              : lesson.type}
                                          </p>
                                          {/* Show upload status badges */}
                                          {lesson.video?.url && (
                                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                                              ✓ Video
                                            </span>
                                          )}
                                          {lesson.content && (
                                            <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded">
                                              ✓ PDF
                                            </span>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                    <button
                                      onClick={() =>
                                        handleDeleteLesson(
                                          selectedCourse._id,
                                          section._id,
                                          lesson._id
                                        )
                                      }
                                      className="text-red-600 hover:text-red-800"
                                    >
                                      <FaTrash />
                                    </button>
                                  </div>

                                  {/* FILE UPLOAD SECTION - PROMINENT DISPLAY */}
                                  <div className="mt-3 pt-3 border-t-2 border-gray-300">
                                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg space-y-4">
                                      <h5 className="font-bold text-gray-800 flex items-center gap-2">
                                        <FaUpload className="text-blue-600" />
                                        Upload Course Materials
                                      </h5>

                                      {/* Video Upload */}
                                      <div className="bg-white p-3 rounded-lg border-2 border-blue-200">
                                        <label className="block text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
                                          <FaVideo className="text-blue-600" />
                                          Video Lesson
                                        </label>

                                        {lesson.video?.url ? (
                                          <div className="space-y-2">
                                            <div className="flex items-center justify-between bg-green-50 p-2 rounded">
                                              <span className="text-green-700 text-sm font-medium flex items-center gap-2">
                                                <FaVideo /> Video uploaded
                                                successfully!
                                              </span>
                                              <a
                                                href={lesson.video.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:text-blue-800 text-sm font-medium underline"
                                              >
                                                View Video
                                              </a>
                                            </div>
                                            <button
                                              onClick={() => {
                                                document
                                                  .getElementById(
                                                    `video-${lesson._id}`
                                                  )
                                                  .click();
                                              }}
                                              className="text-sm text-gray-600 hover:text-gray-800 underline"
                                            >
                                              Replace video
                                            </button>
                                          </div>
                                        ) : (
                                          <div className="text-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 transition">
                                            <FaVideo className="text-gray-400 text-3xl mx-auto mb-2" />
                                            <p className="text-sm text-gray-600 mb-2">
                                              Click to upload video lesson
                                            </p>
                                            <p className="text-xs text-gray-500 mb-3">
                                              MP4, MOV, AVI (Max 100MB)
                                            </p>
                                          </div>
                                        )}

                                        <input
                                          id={`video-${lesson._id}`}
                                          type="file"
                                          accept="video/mp4,video/mov,video/avi,video/mkv"
                                          onChange={(e) =>
                                            handleFileUpload(
                                              e,
                                              "video",
                                              selectedCourse._id,
                                              section._id,
                                              lesson._id
                                            )
                                          }
                                          className="hidden"
                                          disabled={
                                            uploadingFiles[
                                              `${section._id}-${lesson._id}-video`
                                            ]
                                          }
                                        />

                                        {!lesson.video?.url && (
                                          <button
                                            onClick={() => {
                                              document
                                                .getElementById(
                                                  `video-${lesson._id}`
                                                )
                                                .click();
                                            }}
                                            disabled={
                                              uploadingFiles[
                                                `${section._id}-${lesson._id}-video`
                                              ]
                                            }
                                            className="w-full mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                                          >
                                            {uploadingFiles[
                                              `${section._id}-${lesson._id}-video`
                                            ]
                                              ? "Uploading Video..."
                                              : "Choose Video File"}
                                          </button>
                                        )}
                                      </div>

                                      {/* PDF Upload */}
                                      <div className="bg-white p-3 rounded-lg border-2 border-purple-200">
                                        <label className="block text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
                                          <FaFileAlt className="text-purple-600" />
                                          PDF Materials
                                        </label>

                                        {lesson.content &&
                                        lesson.content.includes(".pdf") ? (
                                          <div className="space-y-2">
                                            <div className="flex items-center justify-between bg-green-50 p-2 rounded">
                                              <span className="text-green-700 text-sm font-medium flex items-center gap-2">
                                                <FaFileAlt /> PDF uploaded
                                                successfully!
                                              </span>
                                              <a
                                                href={lesson.content}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:text-blue-800 text-sm font-medium underline"
                                              >
                                                View PDF
                                              </a>
                                            </div>
                                            <button
                                              onClick={() => {
                                                document
                                                  .getElementById(
                                                    `pdf-${lesson._id}`
                                                  )
                                                  .click();
                                              }}
                                              className="text-sm text-gray-600 hover:text-gray-800 underline"
                                            >
                                              Replace PDF
                                            </button>
                                          </div>
                                        ) : (
                                          <div className="text-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-400 transition">
                                            <FaFileAlt className="text-gray-400 text-3xl mx-auto mb-2" />
                                            <p className="text-sm text-gray-600 mb-2">
                                              Click to upload PDF document
                                            </p>
                                            <p className="text-xs text-gray-500 mb-3">
                                              PDF only (Max 50MB)
                                            </p>
                                          </div>
                                        )}

                                        <input
                                          id={`pdf-${lesson._id}`}
                                          type="file"
                                          accept="application/pdf"
                                          onChange={(e) =>
                                            handleFileUpload(
                                              e,
                                              "pdf",
                                              selectedCourse._id,
                                              section._id,
                                              lesson._id
                                            )
                                          }
                                          className="hidden"
                                          disabled={
                                            uploadingFiles[
                                              `${section._id}-${lesson._id}-pdf`
                                            ]
                                          }
                                        />

                                        {(!lesson.content ||
                                          !lesson.content.includes(".pdf")) && (
                                          <button
                                            onClick={() => {
                                              document
                                                .getElementById(
                                                  `pdf-${lesson._id}`
                                                )
                                                .click();
                                            }}
                                            disabled={
                                              uploadingFiles[
                                                `${section._id}-${lesson._id}-pdf`
                                              ]
                                            }
                                            className="w-full mt-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                                          >
                                            {uploadingFiles[
                                              `${section._id}-${lesson._id}-pdf`
                                            ]
                                              ? "Uploading PDF..."
                                              : "Choose PDF File"}
                                          </button>
                                        )}
                                      </div>

                                      {/* Upload Status */}
                                      {(uploadingFiles[
                                        `${section._id}-${lesson._id}-video`
                                      ] ||
                                        uploadingFiles[
                                          `${section._id}-${lesson._id}-pdf`
                                        ]) && (
                                        <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg">
                                          <p className="text-sm text-blue-800 font-medium flex items-center gap-2">
                                            <span className="animate-spin">
                                              ⏳
                                            </span>
                                            Uploading file... Please wait.
                                          </p>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              ))
                            ) : (
                              <p className="text-sm text-gray-500 text-center py-4">
                                No lessons yet. Add your first lesson above.
                              </p>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500 py-8">
                    No sections yet. Create your first section above.
                  </p>
                )}
              </div>

              {/* Course Stats */}
              <div className="bg-gray-100 rounded-lg p-4">
                <h3 className="font-bold mb-3">📊 Course Statistics</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">
                      {selectedCourse.totalSections || 0}
                    </p>
                    <p className="text-xs text-gray-600">Sections</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">
                      {selectedCourse.totalLessons || 0}
                    </p>
                    <p className="text-xs text-gray-600">Lessons</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">
                      {selectedCourse.totalDuration || 0} min
                    </p>
                    <p className="text-xs text-gray-600">Total Duration</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCourses;
