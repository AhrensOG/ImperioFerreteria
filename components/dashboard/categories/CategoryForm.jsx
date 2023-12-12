import { Context } from '@/context/GlobalContext';
import { backToCreateCategory, createCategory, getAllCategories, updateCategory } from '@/context/actions';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react'

const CategoryForm = ({ data = null }) => {
  const { dispatch } = useContext(Context)
  const action = data ? "PUT" : "POST";

  const [loader, setLoader] = useState(false);

  const initialValues = data || {
    name: "",
  };

  const onSubmit = async (values, { resetForm }) => {
    if (action === 'POST') {
      setLoader(true)
      createCategory(values)
      getAllCategories(dispatch)
      resetForm()
      setLoader(false)
    }
    if (action === 'PUT') {
      setLoader(true)
      updateCategory(values)
      getAllCategories(dispatch)
      setLoader(false)
    }
  }

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit,
  });

  const handleBackToCreateCategory = () => {
    backToCreateCategory(dispatch)
  }

  return (
    <div className="w-full flex flex-col p-10 h-screen">
    <span className="text-4xl font-semibold text-[#e26928] pb-10 w-full text-center">
      {data ? "Actualizar Categoria" : "Crear Categoria"}
    </span>
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 py-1">
      <input
        id="name"
        name="name"
        type="text"
        placeholder="Nombre"
        onChange={formik.handleChange}
        value={formik.values.name}
        className="border border-[#e26928] p-3 rounded-md outline-none text-xl focus:ring focus:ring-[#e26928]"
      />
      <button
        type="submit"
        title="button"
        className="p-3 text-xl rounded-md bg-[#e26928] text-white font-bold"
      >
        {loader && action === "POST"
          ? "Creando..."
          : loader && action === "PUT"
          ? "Actualizando..."
          : action === "POST"
          ? "Crear"
          : "Actualizar"}
      </button>
      {action === "PUT" ? (
        <button
          className="font-bold text-xl text-[#e26928] border border-[#e26928] p-3 rounded-md "
          onClick={() => handleBackToCreateCategory()}
        >
          {"<-"} Volver a crear categoria
        </button>
      ) : (
        <div className="hidden"></div>
      )}
    </form>
  </div>
  )
}

export default CategoryForm