import Link from "next/link";
import React, { useState, useContext } from "react";
import CarouselDetail from "./auxiliarComponents/CarouselDetail";
import ChocolateSection from "./auxiliarComponents/ChocolateSection";
import { addProductToCart } from "@/context/actions";
import { Context } from "@/context/GlobalContext";

const Detail = ({
    id,
    title,
    description,
    price,
    quantity,
    firstImage,
    moreImages,
}) => {
    const { dispatch } = useContext(Context);
    const imagesArray = moreImages.map((e) => {
        return e.url;
    });
    imagesArray.push(firstImage);

    const [items, setItems] = useState(1);
    const onHandleChangeInput = (e) => {
        const inputValue = parseInt(e.target.value) || 1;
        if (inputValue <= quantity) {
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
            if (items > 1) {
                setItems(items - 1);
            }
        }
    };

    const handleAddProductToCart = () => {
        const productData = {
            id,
            title,
            description,
            price,
            items,
            firstImage,
            moreImages,
        };
        addProductToCart(productData, dispatch);
    };

    return (
        <div className="max-w-screen-lg flex flex-col pb-4">
            <Link href="/products">
                <p className="text-gray-400 pl-4  cursor-pointer hover:underline">
                    volver a productos {">"}
                </p>
            </Link>
            {title ? (
                <div>
                    <div className=" text-3xl sm:text-4xl px-4 font-bold pb-12">
                        {title}
                    </div>
                    <div className="h-[400px]">
                        <ChocolateSection img={imagesArray} />
                        <CarouselDetail slides={imagesArray} />
                    </div>
                    <div className="space-y-2 py-5 px-4">
                        <span className="flex justify-start text-4xl">
                            {" "}
                            ${price}{" "}
                        </span>
                        <div className=" flex flex-col  md:justify-center items-center py-7 space-y-7">
                            <div className="flex justify-center space-x-7">
                                <button className="text-lg rounded-full  bg-black/20 text-white cursor-pointer md:my-[8%]">
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
                                </button>
                                <div className="flex justify-center items-center">
                                    <span className=" flex justify-start items-end  md:text-2xl">
                                        Cantidad:
                                    </span>
                                    <input
                                        type="number"
                                        name="items"
                                        id="item"
                                        className="h-5 w-12 border-2 md:h-10 md:w-20 md:text-2xl"
                                        defaultValue={items}
                                        value={items}
                                        onChange={onHandleChangeInput}
                                    />
                                </div>
                                <button className="text-lg rounded-full  bg-black/20 text-white cursor-pointer md:my-[8%]">
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
                                </button>
                            </div>
                            <div className=" flex justify-center">
                                <p className="md:text-2xl">
                                    ({quantity} disponibles)
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row  md:space-x-44 md:justify-center gap-2">
                            <button className=" bg-[#e26928] text-white font-semibold  w-full h-full py-2">
                                COMPRAR AHORA
                            </button>
                            <button
                                disabled={items === "" || items === 0}
                                onClick={handleAddProductToCart}
                                className="  w-full h-full border hover:bg-[#e26928] hover:text-white border-[#e26928] py-2 text-[#e26928] font-semibold "
                            >
                                AÑADIR AL CARRITO
                            </button>
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
