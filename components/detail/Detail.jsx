import Link from "next/link";
import React, { useState, useContext } from "react";
import CarouselDetail from "./auxiliarComponents/CarouselDetail";
import ChocolateSection from "./auxiliarComponents/ChocolateSection";
import { addProductToCart, openCart } from "@/context/actions";
import { Context } from "@/context/GlobalContext";
import SliderTablet from "./auxiliarComponents/SliderTablet";
import { toast } from "sonner";
import { useRouter } from "next/router";

const Detail = ({
  id,
  title,
  description,
  price,
  quantity,
  firstImage,
  moreImages,
}) => {
  const { state, dispatch } = useContext(Context);
  const router = useRouter();
  const imagesArray = moreImages.map((e) => {
    return e.url;
  });
  imagesArray.push(firstImage);

  const [items, setItems] = useState(quantity ? 1 : 0);

  const handleIncrement = () => {
    if (items < quantity) {
      setItems(items + 1);
    }
  };

  const handleDecrement = () => {
    if (items > 1) {
      setItems(items - 1);
    }
  };

  const handleInputChange = (e) => {
    const inputValue = parseInt(e.target.value);

    if (!isNaN(inputValue) && inputValue <= quantity && inputValue >= 1) {
      setItems(inputValue);
    } else if (e.target.value === "") {
      setItems("");
    }
  };

  const handleAddProductToCart = async () => {
    if (!state.userIsLogged) {
      toast.info("Debes iniciar sesion!", {
        description: "Aguarda minetras te redirigimos...",
      });
      return router.push("/user/signIn");
    }
    if (quantity === 0) {
      return toast.info("Este producto no tiene stock disponible", {
        description: "Puedes intetnarlo mas tarde!",
      });
    }
    if (items === "") {
      return toast.info("Debes añadir al menos una unidad", {
        description: "Verifica la cantidad!",
      });
    }
    const productData = {
      id,
      title,
      description,
      price,
      items,
      firstImage,
      moreImages,
    };
    await addProductToCart(productData, dispatch);

    toast.success("Añadido correctamente!");
  };

  const handleBuyProduct = () => {
    if (!state.userIsLogged) {
      toast.info("Debes iniciar sesion!", {
        description: "Aguarda minetras te redirigimos...",
      });
      return router.push("/user/signIn");
    }
    if (quantity === 0) {
      return toast.info("Este producto no tiene stock disponible", {
        description: "Puedes intetnarlo mas tarde!",
      });
    }
    if (items === "") {
      return toast.info("Debes añadir al menos una unidad", {
        description: "Verifica la cantidad!",
      });
    }
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
    openCart(true, dispatch);
    router.push("/user/profile");
  };

  return (
    <div>
      <Link href={"/products"}>
        <button className="text-gray-400 text-lg text-start my-4 cursor-pointer hover:underline">
          Volver a productos {">"}
        </button>
      </Link>
      <div className="max-w-screen-lg flex flex-col pb-4">
        {title ? (
          <div className="lg:flex lg:flex-col gap-4">
            <div className="lg:flex lg:flex-row gap-4">
              <div className="h-[300px] sm:h-[500px] md:h-[550px] lg:h-full">
                <ChocolateSection img={imagesArray} />
                <CarouselDetail slides={imagesArray} />
                <SliderTablet slides={imagesArray} />
              </div>
              <div className="flex flex-col justify-center">
                <div className="text-3xl font-bold py-4 lg:py-0 lg:w-full">
                  {title}
                </div>
                <div className="space-y-2 py-5 px-4">
                  <span className="flex justify-start text-4xl">${price}</span>
                  <div className=" flex flex-col  md:justify-center items-center py-2 space-y-7">
                    <div className="flex justify-center space-x-7">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="#e26928"
                        className="w-8 cursor-pointer"
                        onClick={handleDecrement}
                        name="Down"
                        id="Down"
                        values={items}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m9 12.75 3 3m0 0 3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                      <div className="flex justify-center items-center">
                        <span className="flex justify-start pr-1 items-end  md:text-2xl">
                          Cantidad:
                        </span>
                        <input
                          id="item"
                          name="items"
                          type="number"
                          disabled={quantity ? false : true}
                          value={items}
                          min={1}
                          max={quantity}
                          className="h-6 w-24 py-3 px-1 border border-[#e26928] rounded-md md:h-10 md:w-20 md:text-2xl outline-[#e26928] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          onChange={(e) => handleInputChange(e)}
                        />
                      </div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="#e26928"
                        className="w-8 cursor-pointer"
                        onClick={handleIncrement}
                        name="Up"
                        id="Up"
                        values={items}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m15 11.25-3-3m0 0-3 3m3-3v7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                    </div>
                    <div className=" flex justify-center">
                      <p className="md:text-2xl">
                        {quantity
                          ? `(${quantity} Disponibles)`
                          : "(Sin Stock Disponible)"}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row lg:flex-col md:justify-center gap-2">
                    <button
                      onClick={handleBuyProduct}
                      className=" bg-[#e26928] text-white font-semibold  w-full h-full py-2"
                    >
                      COMPRAR AHORA
                    </button>
                    <button
                      onClick={handleAddProductToCart}
                      className={
                        "  w-full h-full border hover:bg-[#e26928] hover:text-white border-[#e26928] py-2 text-[#e26928] font-semibold "
                      }
                    >
                      AÑADIR AL CARRITO
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="py-12 space-y-2">
              <h3 className="text-left text-2xl">DETALLES DEL PRODUCTO</h3>
              <div className="indent-8 text-left text-xl">{description}</div>
            </div>
          </div>
        ) : (
          <div>cargando...</div>
        )}
      </div>
    </div>
  );
};

export default Detail;
