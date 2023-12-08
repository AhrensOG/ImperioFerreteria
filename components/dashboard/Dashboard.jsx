import React, { useContext, useEffect, useState } from "react";
import SideBar from "./auxiliarComponents/SideBar";
import User from "./user/User";
import Products from "./products/Products";
import { Context } from "@/context/GlobalContext";
import { getAllProducts, getAllUsers } from "@/context/actions";
import Form from "./products/Form";

const Dashboard = () => {
    const [showProducts, setShowProducts] = useState(false);
    const [showCategories, setShowCategories] = useState(false);
    const [showUsers, setShowUsers] = useState(false);

  const { state, dispatch } = useContext(Context);

  useEffect(() => {
    getAllProducts(dispatch);
    getAllUsers(dispatch);
  }, [state.editProduct]);

  return (
    <div className="flex flex-row">
      <div>
        <SideBar
          setShowProducts={setShowProducts}
          showProducts={showProducts}
          setShowCategories={setShowCategories}
          showCategories={showCategories}
          setShowUsers={setShowUsers}
          showUsers={showUsers}
        />
      </div>
      <div className="w-full flex flex-row">
        {
          showUsers 
          ? <User  users={state.users} /> 
          : <div className="hidden"></div>
        }
        {
          showProducts 
          ? <div className="flex flex-row w-full">
              <Products products={state.products} />
              {
                state.editProduct 
                ? <Form data={state.editProduct}/> 
                : <Form/>
              }
            </div>
          : <div className="hidden"></div>
        }
      </div>
    </div>
  );
};

export default Dashboard;
