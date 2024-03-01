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
import { Link } from "react-router-dom";

export default function SidebarItems({
  product,
  addToCart,
  removeFromCart,
  deleteFromcart,
  handleRemoveItemType,
}) {
  console.log(product);
  return (
    <div className="flex gap-x-4 py-2 lg:px-6 border-b border-gray-200 w-full font-light text-gray-500">
      <div className="w-full min-h-[150px] flex items-center gap-x-4">
        <Link to={`/${product.id}`}>
          <div>
            <img className="max-w-[80px]" src={product.image} alt="" />
          </div>
        </Link>
        <div className="w-full flex flex-col">
          <div className="flex justify-between mb-2">
            <Link to={`/${product.id}`}>
              <div className="text-sm uppercase font-medium max-w-[240px] text-primary hover:underline">
                {product.title}
              </div>
            </Link>
            <div
              className="text-xl cursor-pointer"
              onClick={() => handleRemoveItemType(product)}
            >
              <IoMdClose className="text-gray-500 hover:text-red-500 transition" />
            </div>
          </div>
          <div className="flex gap-x-2 h-[36px] text-sm">
            <div className="flex flex-1 max-w-[100px] items-center h-full border text-primary font-medium">
              <div
                className="h-full flex-1 flex justify-center items-center cursor-pointer"
                onClick={() => removeFromCart(product)}
              >
                <IoMdRemove />
              </div>
              <div className="h-full flex justify-center items-center px-2">
                {product.quantity}
              </div>
              <div
                className="h-full flex flex-1 justify-center items-center cursor-pointer"
                onClick={() => addToCart(product)}
              >
                <IoMdAdd />
              </div>
            </div>
            {/* item price */}
            <div className="flex flex-1 justify-around items-center">
              $ {product.price}
            </div>
            {/* final price */}
            <div className="flex flex-1 justify-end items-center text-primary font-medium">{`$ ${parseFloat(
              product.price * product.quantity
            ).toFixed(2)}`}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
