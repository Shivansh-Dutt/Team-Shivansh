import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:8000/api/v1/user/profile",
        {
          withCredentials: true,
        }
      );
      setUser(response.data.user);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching profile.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">Failed to load profile. Try again later.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Profile</h1>

        {/* User Info */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">User Information</h2>
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Role:</strong> {user.role === "volunteer" ? "Volunteer" : "User"}
          </p>
        </div>

        {/* Reported Needs */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Reported Needs</h2>
          {user.reportedNeeds?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {user.reportedNeeds.map((need) => (
                <div
                  key={need._id}
                  className="bg-gray-50 p-4 shadow rounded hover:shadow-lg"
                >
                  <h3 className="font-bold">{need.title}</h3>
                  <p className="text-sm text-gray-600">{need.description}</p>
                  <p>
                    <strong>Category:</strong> {need.category}
                  </p>
                  <p>
                    <strong>Urgency:</strong> {need.urgency}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No needs reported yet.</p>
          )}
        </div>

        {/* Fulfilled Needs */}
        {user.role === "volunteer" && (
          <div>
            <h2 className="text-xl font-semibold mb-2">Fulfilled Needs</h2>
            {user.fulfilledNeeds?.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {user.fulfilledNeeds.map((need) => (
                  <div
                    key={need._id}
                    className="bg-gray-50 p-4 shadow rounded hover:shadow-lg"
                  >
                    <h3 className="font-bold">{need.title}</h3>
                    <p className="text-sm text-gray-600">{need.description}</p>
                    <p>
                      <strong>Category:</strong> {need.category}
                    </p>
                    <p>
                      <strong>Urgency:</strong> {need.urgency}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No needs fulfilled yet.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
