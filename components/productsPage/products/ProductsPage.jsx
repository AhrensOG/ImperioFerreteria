import React, { useContext } from "react";
import Card from "./auxiliarComponents/Card";
import { Context } from "@/context/GlobalContext";
import Link from "next/link";

const ProductsPage = () => {
    const { state } = useContext(Context);
    return (
        <div className="flex flex-col sm:flex-row sm:flex-wrap justify-evenly gap-8 items-center p-4 sm:px-12">
            {state?.products?.map((p) => {
                return (
                    <Link href={`/products/${p.id}`}>
                        <Card
                            key={p.id}
                            id={p.id}
                            title={p.title}
                            url={p.firstImage}
                            description={p.description}
                        />
                    </Link>
                );
            })}
        </div>
    );
};

export default ProductsPage;
