import React from "react";
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
import SidebarItems from "../assets/component/SidebarItems";

export default function SideBar({
  cartItems,
  setCartItems,
  isClicked,
  sidebarStatus,
  totalQuantity,
}) {
  const addToCart = (product) => {
    const addedProduct = {
      id: product.id,
      image: product.image,
      title: product.title,
      price: product.price,
    };
    const checkItem = cartItems.find((item) => item.id === addedProduct.id);
    if (checkItem) {
      const updatedCart = cartItems.map((item) =>
        item.id === addedProduct.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCartItems(updatedCart);
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    } else {
      const updatedCart = [...cartItems, { ...addedProduct, quantity: 1 }];
      setCartItems(updatedCart);
      console.log(updatedCart);
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    }
  };

  const removefromCart = (product) => {
    const addedProduct = {
      id: product.id,
      image: product.image,
      title: product.title,
      price: product.price,
    };
    const checkItem = cartItems.find((item) => item.id === addedProduct.id);
    if (checkItem) {
      const updatedCart = cartItems.map((item) =>
        item.id === addedProduct.id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      setCartItems(updatedCart);
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    } else {
      const updatedCart = [...cartItems, { ...addedProduct, quantity: 1 }];
      setCartItems(updatedCart);
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    }
  };
  const deleteFromcart = (product) => {
    const removedProduct = {
      id: product.id,
      image: product.image,
      title: product.title,
      price: product.price,
    };
    const checkItem = cartItems.find((item) => item.id === product.id);
    if (checkItem) {
      const updatedCart = cartItems.filter(
        (item) => item.id !== removedProduct.id
      );
      setCart(updatedCart);
      //   console.log(updatedCart);
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    }
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cartItems");
  };

  const getTotalPrice = () => {
    let total = 0;
    cartItems.map((item) => (total += item.price));
    return total;
  };
  const totalPrice = getTotalPrice();

  const handleCheckoutcart = () => {
    alert(`Thank you for buying, your total is ${totalPrice}`);

    setCartItems([]);
  };

  const handleRemoveItemType = () => {
    const updateCart = cartItems.filter((item) => item.id !== product.id);
    setCartItems(updateCart);
    localStorage.setItem("cartItems", JSON.stringify(updateCart));
  };

  return (
    <div
      className={`${sidebarStatus ? "right-0" : "-right-full"}
        w-full bg-white fixed top-0 h-full shadow-2xl md:w-[35vw] lg:w-[40vw] xl:max-w-[30vw] transition-all duration-300 z-20 px-4 lg:px-[35px]`}
    >
      <div className="flex items-center justify-between py-6 border-b">
        <div
          className="cursor-pointer w-8 h-8 flex justify-center items-center"
          onClick={isClicked}
        >
          <IoMdArrowForward className="text-2xl" />
        </div>
      </div>
      <div className="flex flex-col gap-y-2 h-[360px] md:h-[480px] lg:h-[420px] overflow-y-auto overflow-x-hidden border-b">
        {cartItems.map((product, index) => (
          <SidebarItems
            key={index}
            product={product}
            addToCart={addToCart}
            removeFromCart={removefromCart}
            deleteFromcart={deleteFromcart}
            handleRemoveItemType={handleRemoveItemType}
          />
        ))}
      </div>

      <div className="flex flex-col gap-y-3  mt-4">
        <div className="flex w-full justify-between items-center">
          <div className="font-semibold">
            <span className="mr-2">Subtotal:</span>{" "}
            {`$ ${parseFloat(totalPrice).toFixed(2)}`}
          </div>
          <div
            className="cursor-pointer py-4 bg-red-500 text-white w-12 h-12 flex justify-center items-center text-xl"
            onClick={clearCart}
          >
            <FiTrash2 />
          </div>
        </div>
        <button
          className="bg-primary flex p-3 justify-center items-center text-white w-full font-medium"
          onClick={handleCheckoutcart}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
