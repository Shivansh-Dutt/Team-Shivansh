import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get author (user data) from Redux store
  const author = useSelector((state) => state.author.user);
  console.log(author)

  useEffect(() => {
    // Check if author (user) exists in Redux store
    if (!author) {
      navigate('/login'); // Redirect to login if not authenticated
    }
  }, [author, navigate]);

  // If user is authenticated, render the child components
  return author ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
