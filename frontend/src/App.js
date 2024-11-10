import './App.css';
import { useContext } from "react";
import { Navigate, createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Login from "./pages/login/login";
import Navbar from "./components/navbar/navbar";
import Home from "./pages/home/home";
import About from "./pages/about/about";
import Starter from "./pages/starter/starter";
import Contact from "./pages/contact/contact";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Navbar />
          <Outlet />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/aboutUs",
          element: <About />,
        },
        {
          path: "/contactUs",
          element: <Contact />,
        },
        {
          path: "/getStarted",
          element: <Starter />
        }
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
