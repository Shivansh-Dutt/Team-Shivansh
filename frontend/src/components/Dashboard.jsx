import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navbar */}
      <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">Community Dashboard</h1>
        <div className="space-x-4">
          <Link
            to="/profile"
            className="px-4 py-2 text-blue-700 border border-blue-700 rounded hover:bg-blue-700 hover:text-white"
          >
            Profile
          </Link>
          <Link
            to="/logout"
            className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800"
          >
            Logout
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row flex-1">
        {/* Sidebar */}
        <aside className="bg-white shadow-lg w-full lg:w-1/4 p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Menu</h2>
          <ul className="space-y-4">
            <li>
              <Link
                to="/createNeed"
                className="block text-blue-700 font-medium hover:underline"
              >
                Create Need
              </Link>
            </li>
            <li>
              <Link
                to="/volunteer-opportunities"
                className="block text-blue-700 font-medium hover:underline"
              >
                Volunteer Opportunities
              </Link>
            </li>
            <li>
              <Link
                to="/my-needs"
                className="block text-blue-700 font-medium hover:underline"
              >
                My Needs
              </Link>
            </li>
            <li>
              <Link
                to="/activity"
                className="block text-blue-700 font-medium hover:underline"
              >
                My Activity
              </Link>
            </li>
          </ul>
        </aside>

        {/* Dashboard Content */}
        <main className="flex-1 p-6">
          <h2 className="text-3xl font-bold text-gray-700 mb-6">
            Welcome to Your Dashboard
          </h2>
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {/* Card: Reported Needs */}
            <div className="bg-white p-6 rounded shadow-md">
              <h3 className="text-xl font-semibold text-blue-700">
                Reported Needs
              </h3>
              <p className="text-gray-600 mt-2">
                View and manage needs you’ve reported.
              </p>
              <Link
                to="/my-needs"
                className="inline-block mt-4 px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800"
              >
                View Needs
              </Link>
            </div>

            {/* Card: Volunteer Opportunities */}
            <div className="bg-white p-6 rounded shadow-md">
              <h3 className="text-xl font-semibold text-green-600">
                Volunteer Opportunities
              </h3>
              <p className="text-gray-600 mt-2">
                Explore needs reported by others and contribute.
              </p>
              <Link
                to="/volunteer-opportunities"
                className="inline-block mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Find Opportunities
              </Link>
            </div>

            {/* Card: Activity */}
            <div className="bg-white p-6 rounded shadow-md">
              <h3 className="text-xl font-semibold text-yellow-500">
                My Activity
              </h3>
              <p className="text-gray-600 mt-2">
                Track your volunteering and reported needs.
              </p>
              <Link
                to="/activity"
                className="inline-block mt-4 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                View Activity
              </Link>
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 text-center">
        <p>&copy; 2025 Community Needs App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
