import React, { useContext, useEffect, useState } from "react";
import SideBar from "./auxiliarComponents/SideBar";
import User from "./user/User";
import Products from "./products/Products";
import { Context } from "@/context/GlobalContext";
import { getAllProducts } from "@/context/actions";

const Dashboard = () => {
  const [showProducts, setShowProducts] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [showUsers, setShowUsers] = useState(false);

  const { state, dispatch } = useContext(Context)

  useEffect(() => {
    getAllProducts(dispatch)
  }, []);

  return (
    <div className="flex flex-row">
      <div className="">
        <SideBar
          setShowProducts={setShowProducts}
          showProducts={showProducts}
          setShowCategories={setShowCategories}
          showCategories={showCategories}
          setShowUsers={setShowUsers}
          showUsers={showUsers}
        />
      </div>
      <div className="">
        {showUsers ? <User /> : <div className="hidden"></div>}
        {showProducts ? <Products products={state.products} /> : <div className="hidden"></div>}
      </div>
    </div>
  );
};

export default Dashboard;
