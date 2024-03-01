import React, { useEffect, useState } from "react";
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
import { Outlet } from "react-router-dom";
import SideBar from "../../page/SideBar";

export default function Header() {
  const [background, setBackground] = useState("bg-white");
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cartItems")) || []
  );
  const [sidebarStatus, setSidebarStatus] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [scrolling, setScrolling] = useState(false);

  const handleLogOut = (e) => {
    e.preventDefault();

    localStorage.removeItem("isLogin");
  };
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const gettotalQuantity = () => {
    if (cartItems.length === 0) {
      return 0;
    }

    let total = 0;
    for (let i = 0; i < cartItems.length; i++) {
      total += cartItems[i]?.quantity;
    }
    return total;
  };
  const totalQuantity = gettotalQuantity();

  const isClicked = () => {
    if (sidebarStatus) {
      setSidebarStatus(false);
    } else {
      setSidebarStatus(true);
    }
  };
  return (
    <div className="flex flex-col ">
      <header
        className={`py-6 w-full z-10 lg:px-8 transition-all fixed ${scrolling ? "bg-white shadow-md" : "bg-none"}`}
      >
        <div className="container mx-auto flex items-center justify-between h-full p-7">
          <div>
            <div className="w-[40px]">
              <h1
                style={{ fontFamily: '"Satisfy", cursive', fontSize: "1.5rem" }}
              >
                Fakecommerce
              </h1>
            </div>
          </div>

          <div className="flex gap-6 ">
            <div className="cursor-pointer flex relative" onClick={isClicked}>
              <BsBag className="text-2xl" />
              <div className="bg-red-500 absolute -right-2 -bottom-2 text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center items-center">
                {totalQuantity}
              </div>
            </div>
            <div
              className="cursor-pointer flex relative"
              onClick={handleLogOut}
            >
              <CiLogout className="text-3xl" />
            </div>
          </div>
        </div>
      </header>
      <Outlet context={[cartItems, setCartItems]} />
      <SideBar
        cartItems={cartItems}
        setCartItems={setCartItems}
        isClicked={isClicked}
        sidebarStatus={sidebarStatus}
        totalQuantity={totalQuantity}
      />
    </div>
  );
}
