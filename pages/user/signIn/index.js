import Footer from "@/components/footer/Footer";
import LogIn from "@/components/logIn/LogIn";
import Header from "@/components/navbar/Header";
import HomeNavbar from "@/components/navbar/HomeNavbar";
import React from "react";

const SignIn = () => {
  return (
    <div>
      <Header />
      <HomeNavbar />
      <LogIn/>
      <Footer />
    </div>
  );
};

export default SignIn;
