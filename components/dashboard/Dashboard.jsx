import React, { useContext, useEffect, useState } from "react";
import SideBar from "./auxiliarComponents/SideBar";
import User from "./user/User";
import Products from "./products/Products";
import { Context } from "@/context/GlobalContext";
import {
  getAllCategories,
  getAllOrders,
  getAllProducts,
  getAllUsers,
  getOrganization,
} from "@/context/actions";
import Form from "./products/Form";
import LogIn from "../logIn/LogIn";
import Categories from "./categories/Categories";
import CategoryForm from "./categories/CategoryForm";
import { isUserLogged } from "@/context/actions/isUserLogged";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/config";
import Orders from "./orders/Orders";
import Organization from "./organization/Organization";
import OrganizationForm from "./organization/auxiliarComponents/OrganizationForm";

const ADMIN = process.env.NEXT_PUBLIC_ADMIN;

const Dashboard = () => {
  const [showProducts, setShowProducts] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [showUsers, setShowUsers] = useState(false);
  const [showOrders, setShowOrders] = useState(false);
  const [showOrganization, setShowOrganization] = useState(false);

  const { state, dispatch } = useContext(Context);

  useEffect(() => {
    const getData = async () => {
      await isUserLogged(dispatch);
      await getAllProducts(dispatch);
      await getAllCategories(dispatch);
      await getAllUsers(dispatch);
      await getAllOrders(dispatch);
      await getOrganization(dispatch);
    };
    getData();
  }, []);

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
              setShowOrders={setShowOrders}
              showOrders={showOrders}
              setShowOrganization={setShowOrganization}
              showOrganization={showOrganization}
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
            {showOrders ? (
              <Orders orders={state.orders} />
            ) : (
              <div className="hidden"></div>
            )}
            {showOrganization ? (
              <div className="w-full flex flex-row">
                <Organization data={state.organization}/>
                {state.organization ? (
                  <OrganizationForm data={state.organization} />
                ) : (
                  <OrganizationForm />
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
            <span className="text-5xl font-bold text-red-700">
              SIN AUTORIZACIÓN
            </span>
            <button
              className="text-xl font-semibold text-[#e26928]"
              onClick={() => signOut(auth)}
            >
              Cerrar Sesion
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
