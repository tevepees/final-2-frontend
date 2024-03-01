import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useOutletContext, useParams } from "react-router-dom";
import { BsPlus, BsEyeFill, BsBag } from "react-icons/bs";
import { CiLogout } from "react-icons/ci";
import { IoArrowBackCircle } from "react-icons/io5";
import {
  IoMdArrowForward,
  IoMdAdd,
  IoMdClose,
  IoMdRemove,
} from "react-icons/io";

export default function DetailProduct() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [cartItems, setCartItems] = useOutletContext();

  const { productId } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: response } = await axios.get(
          `https://fakestoreapi.com/products/${productId}`
        );
        setData(response);
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

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
      console.log(updatedCart);
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    } else {
      const updatedCart = [...cartItems, { ...addedProduct, quantity: 1 }];
      setCartItems(updatedCart);
      console.log(updatedCart);
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    }
  };
  return (
    <section className="pt-[450px] md:pt-32 pb-[400px] md:pb-12 lg:py-32 max-h-screen flex flex-col items-center relative">
      <Link to="/">
        <div className="w-[100vw] pl-20">
          <IoArrowBackCircle
            className="text-primary cursor-pointer"
            size={40}
          />
        </div>
      </Link>
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="flex flex-1 justify-center items-center mb-8 lg:mb-0">
            <img
              className="max-w-[200px] lg:max-w-xs"
              src={data.image}
              alt=""
            />
          </div>
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-[26px] font-medium mb-2 max-w-[450px] mx-auto lg:mx-0">
              {data.title}
            </h1>
            <div className="text-2xl text-red-500 font-medium mb-6">
              ${data.price}
            </div>
            <p className="mb-8">{data.description}</p>
            <button
              className="bg-primary py-4 px-8 text-white"
              onClick={() => addToCart(data)}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
