import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const LandingPage = () => {
  // Retrieve authUser from Redux store
  const authUser = useSelector((state) => state.author.user);
  const [logged, setlogged] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Every time authUser changes, this block will run
    if (authUser === null) {
      console.log("User is not logged in.");
      setlogged(false);
      // You can perform any action here when the user is not logged in, like showing a message or redirecting.
    } else {
      console.log("User is logged in:", authUser);
      setlogged(true);
      // You can perform actions for logged-in users, such as showing their name or redirecting.
    }
  }, [authUser]); // Dependency array: useEffect will run every time authUser changes

  return (
    <div className="bg-gradient-to-r from-blue-500 to-green-400 min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-md">
        <h1 className="text-2xl font-bold text-gray-800">
          Community Needs Map
        </h1>
        <div className="space-x-4">
          <Link
            to="/login"
            className="px-4 py-2 text-blue-700 border border-blue-700 rounded hover:bg-blue-700 hover:text-white"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800"
          >
            Signup
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="flex flex-col lg:flex-row items-center justify-center flex-1 text-center lg:text-left px-8 lg:px-20 py-12">
        <div className="lg:w-1/2">
          <h2 className="text-4xl font-extrabold text-white mb-4 leading-tight">
            Empower Communities, Bridge Gaps
          </h2>
          <p className="text-lg text-gray-100 mb-6">
            Join a network of individuals and volunteers committed to solving
            community problems. Report needs, offer help, and make a difference!
          </p>
          <div className="flex justify-center lg:justify-start gap-4">
            <h1
              className="px-6 py-3 bg-white text-blue-700 font-bold rounded shadow-md hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                if (logged) {
                  navigate("/dashboard");
                } else {
                  navigate("/login");
                }
              }}
            >
              Get Started
            </h1>
            <a
              href="#features"
              className="px-6 py-3 border-2 border-white text-white font-bold rounded hover:bg-white hover:text-blue-700"
            >
              Learn More
            </a>
          </div>
        </div>
        <div className="lg:w-1/2 mt-8 lg:mt-0">
          <img
            src="https://via.placeholder.com/500"
            alt="Community Working Together"
            className="w-full rounded-lg shadow-lg"
          />
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white text-gray-800">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold">Why Join Us?</h3>
          <p className="text-lg text-gray-600 mt-2">
            Discover how we empower communities and bring change.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 px-8 lg:px-20">
          <div className="flex flex-col items-center">
            <div className="bg-blue-700 text-white p-4 rounded-full mb-4 ">
              {/* Icon */}
              <svg
                className="w-8 h-8"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16l-4-4m0 0l4-4m-4 4h16"
                />
              </svg>
            </div>
            <h4 className="text-xl font-bold">Report Needs</h4>
            <p className="text-gray-600 mt-2">
              Easily report and highlight local issues that require attention.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-green-500 text-white p-4 rounded-full mb-4">
              {/* Icon */}
              <svg
                className="w-8 h-8"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 12H4"
                />
              </svg>
            </div>
            <h4 className="text-xl font-bold">Volunteer</h4>
            <p className="text-gray-600 mt-2">
              Use your skills to help fulfill reported needs and make an impact.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-yellow-500 text-white p-4 rounded-full mb-4">
              {/* Icon */}
              <svg
                className="w-8 h-8"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 20h9"
                />
              </svg>
            </div>
            <h4 className="text-xl font-bold">Collaborate</h4>
            <p className="text-gray-600 mt-2">
              Connect with other volunteers and work as a team to achieve goals.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4">
        <div className="text-center">
          <p>&copy; 2025 Community Needs Map. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
