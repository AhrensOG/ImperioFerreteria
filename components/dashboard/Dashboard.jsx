import React, { useContext, useEffect, useState } from "react";
import SideBar from "./auxiliarComponents/SideBar";
import User from "./user/User";
import Products from "./products/Products";
import { Context } from "@/context/GlobalContext";
import {
  getAllCategories,
  getAllProducts,
  getAllUsers,
} from "@/context/actions";
import Form from "./products/Form";
import LogIn from "../logIn/LogIn";
import Categories from "./categories/Categories";
import CategoryForm from "./categories/CategoryForm";
import { isUserLogged } from "@/context/actions/isUserLogged";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/config";

const ADMIN = process.env.NEXT_PUBLIC_ADMIN;

const Dashboard = () => {
  const [showProducts, setShowProducts] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [showUsers, setShowUsers] = useState(false);

  const { state, dispatch } = useContext(Context);

  useEffect(() => {
    isUserLogged(dispatch);
    getAllProducts(dispatch);
    getAllUsers(dispatch);
    getAllCategories(dispatch);
  }, [state.editProduct, state.editCategory]);

  useEffect(() => {}, [state.products, state.categories]);

  return (
    <div>
      {!state.userIsLogged ? (
        <div className="relative">
          <div className="absolute w-full top-[25vh]">
            <LogIn />
          </div>
        </div>
      ) : state.userIsLogged && state.user.id === ADMIN ? (
        <div className="flex flex-row w-full">
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
            {showUsers ? (
              <User users={state.users} />
            ) : (
              <div className="hidden"></div>
            )}
            {showProducts ? (
              <div className="flex flex-row w-full">
                <Products products={state.products} />
                {state.editProduct ? (
                  <Form data={state.editProduct} />
                ) : (
                  <Form />
                )}
              </div>
            ) : (
              <div className="hidden"></div>
            )}
            {showCategories ? (
              <div className="flex flex-row w-full">
                <Categories categories={state.categories} />
                {state.editCategory ? (
                  <CategoryForm data={state.editCategory} />
                ) : (
                  <CategoryForm />
                )}
              </div>
            ) : (
              <div className="hidden"></div>
            )}
          </div>
        </div>
      ) : (
        <div className="relative w-full">
          <div className="absolute w-full top-[50vh] flex flex-col items-center gap-4">
            <span className="text-5xl font-bold text-red-700">SIN AUTORIZACIÓN</span>
            <button className="text-xl font-semibold text-[#e26928]" onClick={() => signOut(auth)} >Cerrar Sesion</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
