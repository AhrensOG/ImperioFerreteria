import Link from "next/link";
import React, { useState, useEffect } from "react";
import CarouselDetail from "../hero/auxiliarComponents/CarouselDetail";
import ChocolateSection from "./auxiliarComponents/ChocolateSection";
import { getOneProduct } from "@/context/actions";
import { useRouter } from "next/router";

const Detail = ({
    title,
    description,
    price,
    quantity,
    firstImage,
    moreImages,
}) => {
    const imagesArray = moreImages.map((e) => {
        return e.url;
    });
    imagesArray.push(firstImage);

    const [items, setItems] = useState("");
    const onHandleChangeInput = (e) => {
        const inputValue = parseInt(e.target.value) || "";
        if (inputValue <= quantity) {
            if (inputValue === 0 || inputValue === "0") {
                setItems("");
                setItems(inputValue);
            }
            setItems(inputValue);
        }
    };
    const changeQuantity = (e) => {
        if (e.target.id === "Up") {
            if (typeof items == "string") {
                setItems(0);
            }
            if (items < quantity) {
                setItems(items + 1);
            }
        }
        if (e.target.id === "Down") {
            if (items > 0) {
                setItems(items - 1);
            }
        }
    };

    return (
        <div className="max-w-screen-lg flex flex-col pb-4">
            <Link href="/">
                <p className="text-gray-400  cursor-pointer hover:underline">
                    volver al inicio {">"}
                </p>
            </Link>
            {title ? (
                <div>
                    <div className=" text-5xl font-bold pb-12">{title}</div>
                    <ChocolateSection img={imagesArray} />
                    <CarouselDetail slides={imagesArray} />
                    <div className="space-y-2">
                        <span className="flex justify-start text-4xl">
                            {" "}
                            ${price}{" "}
                        </span>
                        <div className=" flex space-x-7 md:justify-center md:items-center md:h-14 ">
                            {/* Left Arrow */}
                            <div className="text-sm rounded-full  bg-black/20 text-white cursor-pointer md:my-[8%] ">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={5}
                                    stroke="currentColor"
                                    className="w-6 h-full -rotate-90"
                                    onClick={(e) => changeQuantity(e)}
                                    name="Down"
                                    id="Down"
                                    values={items}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15.75 19.5L8.25 12l7.5-7.5"
                                    />
                                </svg>
                            </div>
                            <div className="flex justify-center items-center space-x-2">
                                <span className=" flex justify-start items-end  md:text-2xl">
                                    Cantidad:
                                </span>
                                <input
                                    type="number"
                                    name="items"
                                    id="item"
                                    className="h-5 w-12 border-2 md:h-10 md:w-20 md:text-2xl"
                                    placeholder={items}
                                    value={items}
                                    onChange={onHandleChangeInput}
                                />
                            </div>
                            {/* Right Arrow */}
                            <div className=" text-sm rounded-full  bg-black/20 text-white cursor-pointer md:my-[8%]">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={5}
                                    stroke="currentColor"
                                    className="w-6 h-full -rotate-90"
                                    onClick={(e) => changeQuantity(e)}
                                    name="Up"
                                    id="Up"
                                    values={items}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M8.25 4.5l7.5 7.5-7.5 7.5"
                                    />
                                </svg>
                            </div>
                            <p className="md:text-2xl">
                                ({quantity} disponibles)
                            </p>
                        </div>
                        <div className="md:flex md:space-x-44 md:justify-center">
                            <div className="flex justify-center items-center border-2  bg-[#e26928] h-full py-3 w-full">
                                <button className="flex justify-center items-center w-full h-full">
                                    <h3>COMPRAR AHORA</h3>
                                </button>
                            </div>
                            <div className="flex justify-center items-center border-2  bg-[#e26928]/70 h-full py-3 w-full">
                                <button className="flex justify-center items-center w-full h-full">
                                    <h3>AÑADIR AL CARRITO</h3>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="py-[10%] space-y-10">
                        <h3 className="text-left text-2xl">
                            DETALLES DEL PRODUCTO
                        </h3>
                        <div className="indent-8 text-left ml-[5%] mr-[10%] text-xl ">
                            {" "}
                            {description}{" "}
                        </div>
                    </div>
                </div>
            ) : (
                <div>cargando...</div>
            )}
        </div>
    );
};

export default Detail;
