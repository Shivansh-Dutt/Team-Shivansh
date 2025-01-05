import Signup from "./components/Register";
import Login from "./components/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home"
import Dashboard from "./components/Dashboard";
import CreateNeedPage from "./components/createNeedForm";
import NeedListPage from "./components/Needdetails";
import ProfilePage from "./components/Profile";
import ProtectedRoute from "./components/ProtectedRoute"

const BrowserRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/Signup",
    element: <Signup />,
  },
  {
    path: '/dashboard',
    element: <ProtectedRoute />, // Protected Route
    children: [
      {
        path: '',
        element: <Dashboard />,
      },
    ],
  },
  {
    path: '/createNeed',
    element: <ProtectedRoute />, // Protected Route
    children: [
      {
        path: '',
        element: <CreateNeedPage />,
      },
    ],
  },
  {
    path: '/Needs',
    element: <ProtectedRoute />, // Protected Route
    children: [
      {
        path: '',
        element: <NeedListPage />,
      },
    ],
  },
  {
    path: '/profile',
    element: <ProtectedRoute />, // Protected Route
    children: [
      {
        path: '',
        element: <ProfilePage />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={BrowserRouter} />
    </>
  );
}

export default App;