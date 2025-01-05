import React, { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateNeedPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    category: "",
    urgency: "Low", // Default value
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8000/api/v1/needs/createNeed",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.data.success) {
        toast.success("Need created successfully!");
        navigate("/dashboard"); // Redirect to dashboard after success
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Error creating the need. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <form
        className="bg-white p-6 rounded shadow-lg max-w-lg w-full"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Create a New Need
        </h1>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter the title of the need"
            className="w-full p-3 border rounded focus:ring focus:ring-blue-300"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Provide a detailed description"
            className="w-full p-3 border rounded focus:ring focus:ring-blue-300"
            rows="4"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter the location"
            className="w-full p-3 border rounded focus:ring focus:ring-blue-300"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-3 border rounded focus:ring focus:ring-blue-300"
            required
          >
            <option value="">Select Category</option>
            <option value="food">Food</option>
            <option value="clothing">Clothing</option>
            <option value="shelter">Shelter</option>
            <option value="medical">Healthcare</option>
            <option value="education">Education</option>
            <option value="other">Others</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Urgency</label>
          <select
            name="urgency"
            value={formData.urgency}
            onChange={handleChange}
            className="w-full p-3 border rounded focus:ring focus:ring-blue-300"
            required
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <button
          type="submit"
          className={`w-full py-3 text-white font-bold rounded ${
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Need"}
        </button>
      </form>
    </div>
  );
};

export default CreateNeedPage;
