import { useFormik } from "formik";
import React from "react";

const ProfileDataSection = ({ state }) => {
  const formik = useFormik({
    initialValues: {
      name: state?.user?.name,
      email: state?.user?.email,
      phone: state?.user?.phone || '',
      address: state?.user?.address || '',
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className="w-full max-w-screen-sm">
      <form onSubmit={formik.handleSubmit} className="flex flex-col items-center w-full gap-6 py-12 px-4 md:px-0">
        <input
          id="name"
          name="name"
          type="text"
          className="p-2 border border-[#e26928] text-black/50 w-full font-semibold"
          disabled
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        <input
          id="email"
          name="email"
          type="text"
          className="p-2 border border-[#e26928] text-black/50 w-full font-semibold"
          disabled
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        <input
          id="phone"
          name="phone"
          type="number"
          className="p-2 border border-[#e26928] w-full font-semibold outline-none focus:ring-2 focus:ring-[#e26928] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          placeholder="Teléfono"
          onChange={formik.handleChange}
          value={formik.values.phone}
        />
        <input
          id="address"
          name="address"
          type="text"
          className="p-2 border border-[#e26928] w-full font-semibold outline-none focus:ring-2 focus:ring-[#e26928]"
          placeholder="Dirección"
          onChange={formik.handleChange}
          value={formik.values.address}
        />
        <button type="submit" className="p-2 border border-[#e26928] bg-[#e26928] text-white text-lg font-semibold w-full">Actualizar</button>
      </form>
    </div>
  );
};

export default ProfileDataSection;
