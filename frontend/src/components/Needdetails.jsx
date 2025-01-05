import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

const NeedListPage = () => {
  const [needs, setNeeds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");
  const [urgency, setUrgency] = useState("");

  const fetchNeeds = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8000/api/v1/needs/getallNeeds",
        { category, urgency },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setNeeds(response.data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching needs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNeeds();
  }, [category, urgency]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Community Needs</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 justify-center mb-6">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-3 border rounded focus:ring focus:ring-blue-300"
        >
          <option value="">All Categories</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Education">Education</option>
          <option value="Food and Shelter">Food and Shelter</option>
          <option value="Community Support">Community Support</option>
        </select>
        <select
          value={urgency}
          onChange={(e) => setUrgency(e.target.value)}
          className="p-3 border rounded focus:ring focus:ring-blue-300"
        >
          <option value="">All Urgency Levels</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button
          onClick={fetchNeeds}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Apply Filters
        </button>
      </div>

      {/* Needs List */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500">Loading needs...</p>
        </div>
      ) : needs.length === 0 ? (
        <div className="text-center text-gray-500">No needs found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {needs.map((need) => (
            <div
              key={need._id}
              className="bg-white shadow-md rounded p-4 hover:shadow-lg"
            >
              <h2 className="text-xl font-bold mb-2">{need.title}</h2>
              <p className="text-gray-700 mb-2">{need.description}</p>
              <p className="text-gray-600 text-sm">
                <strong>Location:</strong> {need.location}
              </p>
              <p className="text-gray-600 text-sm">
                <strong>Category:</strong> {need.category}
              </p>
              <p className="text-gray-600 text-sm">
                <strong>Urgency:</strong> {need.urgency}
              </p>
              <p className="text-gray-600 text-sm">
                <strong>Reported By:</strong> {need?.reportedBy?.name || "N/A"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NeedListPage;
