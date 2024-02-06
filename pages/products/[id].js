import Detail from "@/components/detail/Detail";
import HomeNavbar from "@/components/navbar/HomeNavbar";
import React, { useEffect, useContext } from "react";
import { Context } from "@/context/GlobalContext";
import { deleteProductDetail, getOneProduct } from "@/context/actions";
import { useRouter } from "next/router";
import Footer from "@/components/footer/Footer";
import Loader from "@/components/loader/Loader";
import SecondaryHomeNavbar from "@/components/navbar/SecondaryHomeNavbar";

const ProductDetail = () => {
    const router = useRouter();
    const { state, dispatch } = useContext(Context);
    const user = state?.user;
    let id = router.query.id;
    useEffect(() => {
        if (id) {
            getOneProduct(id, dispatch);
        }
        return () => {
            deleteProductDetail(dispatch)
        } 
    }, [id, user]);
    return (
        <div className="h-full flex flex-col justify-between">
            <div>
                <SecondaryHomeNavbar />
                <div className=" mx-[20px] md:flex justify-center">
                    {state?.product?.title ? (
                        <Detail
                            id={id}
                            title={state.product.title}
                            description={state.product.description}
                            price={state.product.price}
                            quantity={state.product.quantity}
                            firstImage={state.product.firstImage}
                            moreImages={state.product.ProductsImages}
                        />
                    ) : (
                        <div className="h-[50vh] flex flex-row justify-center items-center"> <Loader/></div>
                    )}
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
};

export default ProductDetail;
