import Footer from "@/components/footer/Footer";
import LogIn from "@/components/logIn/LogIn";
import Header from "@/components/navbar/Header";
import HomeNavbar from "@/components/navbar/HomeNavbar";
import React from "react";

const SignIn = () => {
  return (
    <div className="h-full flex flex-col justify-between">
      <div>
        <Header />
        <HomeNavbar />
        <LogIn/>
      </div>
      <div>
        <Footer marginTop={10}/>
      </div>
    </div>
  );
};

export default SignIn;
