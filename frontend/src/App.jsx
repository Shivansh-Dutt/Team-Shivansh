import Signup from "./components/Register";
import Login from "./components/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home"
import Dashboard from "./components/Dashboard";
import CreateNeedPage from "./components/createNeedForm";
import NeedListPage from "./components/Needdetails";
import ProfilePage from "./components/Profile";

const BrowserRouter = createBrowserRouter([
  // {
  //   path:"/",
  //   // element:<MainLayout/>,
  //   children:[
  //     {
  //       path:'/profile/:id',
  //       element:<Profile/>
  //     },
  //     {
  //       path: '/account/edit',
  //       element:<EditProfile/>
  //     }
  //   ]
  // },
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
    path:"/dashboard",
    element:<Dashboard/>
  },
  {
    path:"/createNeed",
    element:<CreateNeedPage/>
  },
  {
    path:"/Needs",
    element:<NeedListPage/>
  },
  {
    path:"/profile",
    element:<ProfilePage/>
  }
]);

function App() {
  return (
    <>
      <RouterProvider router={BrowserRouter} />
    </>
  );
}

export default App;
