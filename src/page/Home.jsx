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
import Product from "../assets/component/Product";
import { useOutletContext, useParams } from "react-router-dom";
import axios from "axios";
import Header from "../assets/component/Header";

export default function Home() {
  const [cartItems, setCartItems] = useOutletContext();
  const discoverMore = () => {
    const targetView = document.getElementById("products");
    targetView.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* <Header /> */}
      <div className="w-[100vw]">
        <section className="h-[800px] bg-hero bg-no-repeat bg-cover bg-center py-20">
          <div className="container mx-auto flex justify-around h-full">
            <div className="flex flex-col justify-center">
              <div className="font-semibold flex items-center uppercase">
                <div className="w-10 h-[2px] mr-3 bg-cyan-700"></div>Hot Trend
              </div>
              <h1 className="uppercase text-[55px] md:text-[70px] leading-[1.1] font-semibold mb-4">
                Fresh Fashion Finds
                <br />
                <span className="font-light text-lg">new collection</span>
              </h1>
              <a
                className="self-start uppercase font-semibold border-b-2 border-primary text-2xl cursor-pointer"
                onClick={discoverMore}
              >
                Discover More
              </a>
            </div>
          </div>
        </section>

        <Product cartItems={cartItems} setCartItems={setCartItems} />
      </div>
    </>
  );
}
