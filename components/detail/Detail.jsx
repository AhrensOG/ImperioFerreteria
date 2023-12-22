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
  const router = useRouter()
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
    if (!state.userIsLogged) {
      toast.info('Debes iniciar sesion!',{
        duration: 2000,
        className: 'bg-[#e26928]'
      })
      return router.push('/user/signIn')
    }
    toast.success('Añadido correctamente!',{
      duration: 2000,
      className: 'bg-[#e26928]'
    })
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

  const handleBuyProduct = () => {
    if (!state.userIsLogged) {
      toast.info('Debes iniciar sesion!',{
        duration: 2000,
        className: 'bg-[#e26928]'
      })
      return router.push('/user/signIn')
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
    openCart(true, dispatch)
    router.push('/user/profile')
  }

  return (
    <div>
      <Link href={'/products'}>
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
                <div className="text-3xl font-bold py-4 lg:py-0 lg:w-full">{title}</div>
                <div className="space-y-2 py-5 px-4">
                  <span className="flex justify-start text-4xl">${price}</span>
                  <div className=" flex flex-col  md:justify-center items-center py-2 space-y-7">
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
                      <p className="md:text-2xl">({quantity} disponibles)</p>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row lg:flex-col md:justify-center gap-2">
                    <button onClick={handleBuyProduct} className=" bg-[#e26928] text-white font-semibold  w-full h-full py-2">
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
              </div>
            </div>
            <div className="py-12 space-y-2">
              <h3 className="text-left text-2xl">DETALLES DEL PRODUCTO</h3>
              <div className="indent-8 text-left text-xl">
                {description}
              </div>
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
