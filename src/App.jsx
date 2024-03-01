import "./App.css";
import { BsPlus, BsEyeFill, BsBag } from "react-icons/bs";
import { CiLogout } from "react-icons/ci";
import { IoArrowBackCircle } from "react-icons/io5";
import {
  IoMdArrowForward,
  IoMdAdd,
  IoMdClose,
  IoMdRemove,
} from "react-icons/io";
import { FiTrash2 } from "react-icons/fi";
import SigninUp from "./page/SigninUp";
import Header from "./assets/component/Header";
import Home from "./page/Home";
import SideBar from "./page/SideBar";
import DetailProduct from "./page/DetailProduct";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./assets/component/PrivateRoute";
import { useEffect, useState } from "react";

const App = () => {
  const isLogin = localStorage.getItem("isLogin");
  const [isAllowed, setIsAllowed] = useState(true);

  useEffect(() => {
    if (isLogin) {
      setIsAllowed(true);
    } else {
      setIsAllowed(false);
    }

    const intervalId = setInterval(() => {
      const newIsLogin = localStorage.getItem("isLogin");

      if (newIsLogin) {
        setIsAllowed(true);
      } else {
        setIsAllowed(false);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isLogin]);
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <SigninUp setIsAllowed={setIsAllowed} />,
    },
    {
      path: "/",
      element: (
        <PrivateRoute isAllowed={isAllowed}>
          <Header />
        </PrivateRoute>
      ),
      children: [
        {
          path: "",
          element: (
            <PrivateRoute isAllowed={isAllowed}>
              <Home />
            </PrivateRoute>
          ),
        },
        {
          path: ":productId",
          element: (
            <PrivateRoute isAllowed={isAllowed}>
              <DetailProduct />
            </PrivateRoute>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
