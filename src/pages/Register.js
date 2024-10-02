import React from "react";
import RegisterForm from "../components/auth/RegisterForm.jsx";

const Register = () => {
  return (
    <div className="min-h-screen dark:bg-dark_bg_1 flex item-center justify-center py-[19px] overflow-hidden">
      {/* container */}
      <div className="flex w-[1600] mx-auto h-full">
        {/* register form */}
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
