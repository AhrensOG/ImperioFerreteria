import { Context } from "@/context/GlobalContext";
import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import ImageCard from "./ImageCard";
import {
  addImagesToOrganization,
  addOrganizationFirstImage,
  createOrganization,
  getOrganization,
  removeImagesToOrganization,
  updateOrganization,
} from "@/context/actions";
import { toast } from "sonner";

const OrganizationForm = ({ data = null }) => {
  const { dispatch } = useContext(Context);
  const action = data ? "PUT" : "POST";

  const [loader, setLoader] = useState(false);
  const [firstImage, setFirstImage] = useState();
  const [prevImages, setPrevImages] = useState([]);
  const [removedImages, setRemovedImages] = useState([]);
  const [newImages, setNewImages] = useState([]);

  const initialValues = data || {
    name: "",
    url: "",
    whatsAppLink: "",
    instagramLink: "",
    facebookLink: "",
    locationLink: "",
  };

  const onSubmit = async (values) => {
    try {
      setLoader(true);
      if (action === "POST") {
        if (firstImage) {
          const res = await addOrganizationFirstImage(firstImage);
          values.url = res;
          setFirstImage(false);
        }

        const createdOrganization = await createOrganization(values);

        if (!createdOrganization?.id) {
          return toast.error(
            `Ups! Ocurrio un error en la creacion de la organización`,
            {
              description: "Intenta mas tarde o comunicate con tu WebMaster",
            }
          );
        }
        if (newImages.length) {
          await addImagesToOrganization(newImages, createdOrganization.id);
          setNewImages([]);
        }
        await getOrganization(dispatch);
      }
      if (action === "PUT") {
        if (firstImage) {
          const res = await addOrganizationFirstImage(firstImage);
          values.firstImage = res;
          setFirstImage(false);
        }

        const updatedOrganization = await updateOrganization(values, data.id);

        if (removedImages.length) {
          await removeImagesToOrganization(removedImages);
          setRemovedImages([]);
        }
        if (newImages.length) {
          await addImagesToOrganization(newImages, updatedOrganization.id);
          setNewImages([]);
        }
        await getOrganization(dispatch);
      }
      setLoader(false);
    } catch (error) {
      toast.error(`Ups! Ocurrio un error en la creacion de la organización`, {
        description: `Intenta mas tarde o comunicate con tu WebMaster! Error: ${error.message}`,
      });
    }
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit,
  });

  useEffect(() => {
    if (data) {
      setFirstImage(data.url);
      setPrevImages(data.BusinessImages || []);
    }
  }, [data]);

  const handleChangeNewImages = (e) => {
    e.preventDefault();
    const files = Array.from(e.target.files);
    setNewImages(files);
  };

  const handleChangeFirstImage = (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    setFirstImage(file);
  };

  const handleRemovePrevImages = (image) => {
    setPrevImages((prevImg) =>
      prevImg.filter((img) => img.name !== image.name)
    );

    if (!removedImages.some((img) => img.name === image.name)) {
      setRemovedImages((curr) => [...curr, image]);
    }
  };

  return (
    <div className="w-full flex flex-col p-10 h-screen">
      <span className="text-4xl font-semibold text-[#e26928] pb-10 w-full text-center">
        {data ? "Actualizar Informacion" : "Crear Organización"}
      </span>
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-4 p-1 overflow-y-scroll scrollbar-thin"
      >
        {!data ? (
          <div className="w-full flex flex-col gap-4">
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Nombre de la Organización"
              onChange={formik.handleChange}
              value={formik.values.name}
              className="border border-[#e26928] p-3 rounded-md outline-none text-xl focus:ring focus:ring-[#e26928]"
            />
            <div>
              <span className="text-sm text-[#e26928]">
                Imágen principal (JPG, PNG)
              </span>
              <input
                id="url"
                name="url"
                type="file"
                placeholder="Imagen Principal"
                onChange={handleChangeFirstImage}
                className="border border-[#e26928] rounded-md outline-none text-xl focus:ring focus:ring-[#e26928] w-full pr-3 text-gray-500 file:p-3 file:mr-2 file:shadow file:bg-[#e26928] file:border-none file:text-white file:font-semibold"
              />
            </div>
          </div>
        ) : (
          <div className="hidden"></div>
        )}
        <input
          id="whatsAppLink"
          name="whatsAppLink"
          type="text"
          placeholder="Link de WhatsApp"
          onChange={formik.handleChange}
          value={formik.values.whatsAppLink}
          className="border border-[#e26928] p-3 rounded-md outline-none text-xl focus:ring focus:ring-[#e26928]"
        />
        <input
          id="instagramLink"
          name="instagramLink"
          type="text"
          placeholder="Link de Instragram"
          onChange={formik.handleChange}
          value={formik.values.instagramLink}
          className="border border-[#e26928] p-3 rounded-md outline-none text-xl focus:ring focus:ring-[#e26928]"
        />
        <input
          id="facebookLink"
          name="facebookLink"
          type="text"
          placeholder="Link de Facebook"
          onChange={formik.handleChange}
          value={formik.values.facebookLink}
          className="border border-[#e26928] p-3 rounded-md outline-none text-xl focus:ring focus:ring-[#e26928]"
        />
        <input
          id="locationLink"
          name="locationLink"
          type="text"
          placeholder="Link de Ubicación"
          onChange={formik.handleChange}
          value={formik.values.locationLink}
          className="border border-[#e26928] p-3 rounded-md outline-none text-xl focus:ring focus:ring-[#e26928]"
        />
        <div>
          <span className="text-sm text-[#e26928]">
            Imágenes del carrusel (JPG, PNG)
          </span>
          <input
            title="file"
            type="file"
            multiple
            onChange={handleChangeNewImages}
            className="border border-[#e26928] rounded-md outline-none text-xl focus:ring focus:ring-[#e26928] w-full pr-3 text-gray-500 file:p-3 file:mr-2 file:shadow file:bg-[#e26928] file:border-none file:text-white file:font-semibold"
          />
          <div className="flex flex-row flex-wrap gap-2 pt-2">
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
      </form>
    </div>
  );
};

export default OrganizationForm;
