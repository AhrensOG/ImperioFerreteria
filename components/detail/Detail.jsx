import Link from "next/link";
import React, { useState } from "react";
import CarouselDetail from "../hero/auxiliarComponents/CarouselDetail";

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

    const [items, setItems] = useState(0);
    const onHandleChangeInput = (e) => {
        console.log(typeof e.target.value);
        const inputValue = parseInt(e.target.value) || null;
        if (inputValue <= quantity) {
            setItems(inputValue);
        }
    };
    const changeQuantity = (e) => {
        if (e.target.id === "Up") {
            if (typeof items === "string") {
                setItems(0);
            }
            if (items < quantity) {
                setItems(items + 1);
            }
        } else {
            if (items > 0) {
                setItems(items - 1);
            } else {
                setItems("");
            }
        }
    };
    return (
        <div>
            <Link href="/">
                <p className="text-gray-400 pl-[5%] cursor-pointer hover:underline">
                    volver al inicio {">"}
                </p>
            </Link>
            {title ? (
                <div className="m-3">
                    <div className="pl-[5%] text-3xl font-bold">{title}</div>
                    <CarouselDetail slides={imagesArray} />
                    <div className="space-y-2">
                        <span className="flex justify-start text-4xl">
                            {" "}
                            ${price}{" "}
                        </span>
                        <div className=" flex space-x-7">
                            {/* Left Arrow */}
                            <div className=" text-sm rounded-full  bg-black/20 text-white cursor-pointer">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6 -rotate-90"
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
                                <span className=" flex justify-start items-end ">
                                    Cantidad:
                                </span>
                                <input
                                    type="number"
                                    name="items"
                                    id="item"
                                    className="h-5 w-12 border-2"
                                    placeholder={items}
                                    value={items}
                                    onChange={onHandleChangeInput}
                                />
                            </div>
                            {/* Right Arrow */}
                            <div className=" text-sm rounded-full  bg-black/20 text-white cursor-pointer">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6 -rotate-90"
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
                            <p>({quantity} disponibles)</p>
                        </div>
                        <div>
                            <div className="flex justify-center items-center border-2  bg-[#e26928] h-full py-3 ">
                                <button className="flex justify-center items-center w-full h-full">
                                    <h3>COMPRAR AHORA</h3>
                                </button>
                            </div>
                            <div className="flex justify-center items-center border-2  bg-[#e26928]/70 h-full py-3 ">
                                <button className="flex justify-center items-center w-full h-full">
                                    <h3>AÑADIR AL CARRITO</h3>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="py-[10%] pl-[10%] space-y-4">
                        <h3>DETALLES DEL PRODUCTO</h3>
                        <div className=" indent-8 mr-4"> {description} </div>
                    </div>
                </div>
            ) : (
                <div>cargando...</div>
            )}
        </div>
    );
};

export default Detail;
