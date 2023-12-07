import { useFormik } from "formik";
import React from "react";

const Form = ({ data = null }) => {
  const action = data ? "PUT" : "POST";

  const initialValues = data || {
    title: "",
    firstImage: "",
    description: "",
    price: null,
    quantity: null,
  };

  const formik = useFormik({
    initialValues,
  });
  console.log(initialValues);
  return (
    <div className="w-full flex flex-col p-10">
      <span className="text-4xl font-semibold text-[#e26928] pb-10 w-full text-center">
        {data ? "Actualizar Producto" : "Crear Producto"}
      </span>
      <div>
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-6"> 
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Título"
            onChange={formik.handleChange}
            value={formik.values.title}
            className="border border-[#e26928] p-3 rounded-md outline-none text-xl focus:ring focus:ring-[#e26928]"
          />
          <input
            id="firstImage"
            name="firstImage"
            type="text"
            placeholder="Imagen Principal"
            onChange={formik.handleChange}
            value={formik.values.title}
            className="border border-[#e26928] p-3 rounded-md outline-none text-xl focus:ring focus:ring-[#e26928]"
          />
          <textarea
            id="description"
            name="description"
            type="text"
            placeholder="Descripción"
            onChange={formik.handleChange}
            value={formik.values.title}
            className="border border-[#e26928] p-3 rounded-md outline-none text-xl focus:ring focus:ring-[#e26928]"
          />
          <div className="flex flex-row gap-6">
            <input
              id="price"
              name="price"
              type="number"
              placeholder="Precio"
              onChange={formik.handleChange}
              value={formik.values.price}
              className="border border-[#e26928] p-3 rounded-md outline-none text-xl focus:ring focus:ring-[#e26928] w-full"
            />
            <input
              id="quantity"
              name="quantity"
              type="number"
              placeholder="Cantidad"
              onChange={formik.handleChange}
              value={formik.values.quantity}
              className="border border-[#e26928] p-3 rounded-md outline-none text-xl focus:ring focus:ring-[#e26928] w-full"
            />
          </div>
          <button className="p-3 text-xl rounded-md bg-[#e26928] text-white font-bold">{action === 'PUT' ? 'Actualizar' : 'Crear' }</button>
        </form>
      </div>
    </div>
  );
};

export default Form;
