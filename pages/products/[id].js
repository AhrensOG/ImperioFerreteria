import Detail from "@/components/detail/Detail";
import HomeNavbar from "@/components/navbar/HomeNavbar";
import React, { useEffect, useContext } from "react";
import { Context } from "@/context/GlobalContext";
import { getOneProduct } from "@/context/actions";
import { useRouter } from "next/router";
import Footer from "@/components/footer/Footer";

const ProductDetail = () => {
    const router = useRouter();
    const { state, dispatch } = useContext(Context);
    let id = router.query.id;
    useEffect(() => {
        if (id) {
            getOneProduct(id, dispatch);
        }
    }, []);
    return (
        <section>
            <HomeNavbar />
            {state?.product?.title ? (
                <Detail
                    title={state.product.title}
                    description={state.product.description}
                    price={state.product.price}
                    quantity={state.product.quantity}
                    firstImage={state.product.firstImage}
                    moreImages={state.product.ProductsImages}
                />
            ) : (
                <div> cargando...</div>
            )}
            <Footer />
        </section>
    );
};

export default ProductDetail;