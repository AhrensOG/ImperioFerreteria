import { Context } from "@/context/GlobalContext";
import {
  addCategoriesToProduct,
  addFirstImage,
  addImagesToProduct,
  backToCreateProduct,
  createProduct,
  getAllProducts,
  removeCategoriesToProduct,
  removeImagesToProduct,
  updateProduct,
} from "@/context/actions";
import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import CategoryCard from "./auxiliarComponents/CategoryCard";
import ImageCard from "./auxiliarComponents/ImageCard";

const Form = ({ data = null }) => {
  const { state, dispatch } = useContext(Context);
  const action = data ? "PUT" : "POST";

  const [loader, setLoader] = useState(false);

  const [firstImage, setFirstImage] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [removedCategories, setRemovedCategories] = useState([]);
  const [prevImages, setPrevImages] = useState([]);
  const [removedImages, setRemovedImages] = useState([]);
  const [newImages, setNewImages] = useState([]);

  const initialValues = data || {
    title: "",
    firstImage: "",
    description: "",
    price: "",
    quantity: "",
  };

  const onSubmit = async (values, { resetForm }) => {
    try {
      if (action === "POST") {
        setLoader(true);
        if (firstImage) {
          const res = await addFirstImage(firstImage)
          values.firstImage = res
          setFirstImage(false)
        }
        const createdProduct = await createProduct(values);

        if (!createdProduct?.id) {
          return console.log(createdProduct);
        }
        if (selectedCategories.length) {
          await addCategoriesToProduct(selectedCategories, createdProduct.id);
          setSelectedCategories([]);
        }
        if (newImages.length) {
          await addImagesToProduct(newImages, createdProduct.id);
          setNewImages([]);
        }
        await getAllProducts(dispatch);
        resetForm();
        setRemovedCategories([]);
        setPrevImages([]);
        setRemovedImages([]);
        setLoader(false);
      }
      if (action === "PUT") {
        setLoader(true);
        if (firstImage) {
          const res = await addFirstImage(firstImage)
          values.firstImage = res
          setFirstImage(false)
        }
        
        const updatedProduct = await updateProduct(values);
        
        if (removedCategories.length) {
          await removeCategoriesToProduct(removedCategories, updatedProduct.id);
          setRemovedCategories([]);
        }
        if (selectedCategories.length) {
          await addCategoriesToProduct(selectedCategories, updatedProduct.id);
        }
        if (removedImages.length) {
          await removeImagesToProduct(removedImages);
          setRemovedImages([]);
        }
        if (newImages.length) {
          await addImagesToProduct(newImages, updatedProduct.id);
          setNewImages([]);
        }
        await getAllProducts(dispatch);
        setLoader(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit,
  });

  const handleBackToCreateProduct = () => {
    backToCreateProduct(dispatch);
    setSelectedCategories([]);
    setRemovedCategories([]);
    setPrevImages([]);
    setRemovedImages([]);
    setNewImages([]);
  };

  const handleChangeCategories = (e) => {
    e.preventDefault();
    const categoryObj = state.categories.find((c) => c.name === e.target.value);

    if (categoryObj &&!selectedCategories.some((cat) => cat.name === e.target.value)) {
      setRemovedCategories((curr) =>
        curr.filter((cat) => cat.name !== categoryObj.name)
      );

      setSelectedCategories((curr) => [...curr, categoryObj]);
    }
  };

  const handleRemoveCategory = (category) => {
    setSelectedCategories((prevCategories) =>
      prevCategories.filter((cat) => cat.name !== category.name)
    );
    if (!removedCategories.some((cat) => cat.name === category.name)) {
      setRemovedCategories((curr) => [...curr, category]);
    }
  };

  const handleRemovePrevImages = (image) => {
    setPrevImages((prevImg) =>
      prevImg.filter((img) => img.name !== image.name)
    );

    if (!removedImages.some((img) => img.name === image.name)) {
      setRemovedImages((curr) => [...curr, image]);
    }
  };

  const handleChangeNewImages = (e) => {
    e.preventDefault();
    Array.from(e.target.files).forEach((image) => {
      setNewImages((curr) => [...curr, image]);
    });
  };

  const handleChangeFirstImage = (e) => {
    e.preventDefault();
    setFirstImage(e.target.files[0])
  };

  useEffect(() => {
    data?.Categories && setSelectedCategories(data.Categories);
    setRemovedCategories([]);
    data?.ProductsImages && setPrevImages(data.ProductsImages);
    setRemovedImages([]);
  }, [data, newImages]);

  return (
    <div className="w-full flex flex-col p-10 h-screen">
      <span className="text-4xl font-semibold text-[#e26928] pb-10 w-full text-center">
        {data ? "Actualizar Producto" : "Crear Producto"}
      </span>
      <div className="overflow-y-scroll scrollbar-thumb-[#e26928] scrollbar-thin p-1">
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
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
            title="file"
            type="file"
            onChange={(e) => handleChangeFirstImage(e)}
            className="border border-[#e26928] rounded-md outline-none text-xl focus:ring focus:ring-[#e26928] w-full pr-3 text-gray-500 file:p-3 file:mr-2 file:shadow file:bg-[#e26928] file:border-none file:text-white file:font-semibold"
          />
          <textarea
            id="description"
            name="description"
            type="text"
            placeholder="Descripción"
            onChange={formik.handleChange}
            value={formik.values.description}
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
              className="border border-[#e26928] p-3 rounded-md outline-none text-xl focus:ring focus:ring-[#e26928] w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <input
              id="quantity"
              name="quantity"
              type="number"
              placeholder="Cantidad"
              onChange={formik.handleChange}
              value={formik.values.quantity}
              className="border border-[#e26928] p-3 rounded-md outline-none text-xl focus:ring focus:ring-[#e26928] w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>
          <input
            title="file"
            type="file"
            multiple
            className="border border-[#e26928] rounded-md outline-none text-xl focus:ring focus:ring-[#e26928] w-full pr-3 text-gray-500 file:p-3 file:mr-2 file:shadow file:bg-[#e26928] file:border-none file:text-white file:font-semibold"
            onChange={(e) => handleChangeNewImages(e)}
          />
          <div className="flex flex-row flex-wrap gap-2">
            {prevImages.length ? (
              prevImages.map((img) => {
                return (
                  <ImageCard
                    key={img.id}
                    image={img}
                    removeImage={handleRemovePrevImages}
                  />
                );
              })
            ) : (
              <div className="hidden"></div>
            )}
          </div>
          <select
            className="border border-[#e26928] p-3 rounded-md outline-none text-xl focus:ring focus:ring-[#e26928] w-full"
            onChange={(e) => handleChangeCategories(e)}
          >
            <option value={null} name={null}>
              Seleccionar categorias
            </option>
            {state?.categories?.length ? (
              state.categories.map((c) => {
                return (
                  <option key={c.id} value={c.name} name={c.name}>
                    {c.name}
                  </option>
                );
              })
            ) : (
              <option className="notFound" disabled>
                Sin Categorias
              </option>
            )}
          </select>
          <div className="flex flex-row flex-wrap gap-2">
            {selectedCategories.length ? (
              selectedCategories.map((c) => {
                return (
                  <CategoryCard
                    key={c.id}
                    category={c}
                    removeCategory={handleRemoveCategory}
                  />
                );
              })
            ) : (
              <div className="hidden"></div>
            )}
          </div>
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
              onClick={() => handleBackToCreateProduct()}
            >
              {"<-"} Volver a crear producto
            </button>
          ) : (
            <div className="hidden"></div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Form;
