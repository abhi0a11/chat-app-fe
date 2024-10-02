import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "../../utils/validation.js";
import { useDispatch, useSelector } from "react-redux";
import AuthInput from "./AuthInput.jsx";
import SyncLoader from "react-spinners/SyncLoader.js";
import { Link, useNavigate } from "react-router-dom";
import { changeStatus, registerUser } from "../../features/userSlice.js";
import Picture from "./Picture.jsx";
import axios from "axios";

const cloud_secret = process.env.REACT_APP_CLOUD_SECRET;
const cloud_name = process.env.REACT_APP_CLOUD_NAME;

const Registerform = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.user);
  const [picture, setPicture] = useState();
  const [readablePicture, setReadablePicture] = useState();
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpSchema),
  });

  const onSubmit = async (data) => {
    let res;
    dispatch(changeStatus("loading"));
    if (picture) {
      //upload picture to cloudinary
      //bug: image uploading to cloudinary even though user not registered.
      //case: when register using same email id.
      await uploadImage().then(async (response) => {
        res = await dispatch(
          registerUser({ ...data, picture: response.secure_url })
        );
      });
    } else {
      res = await dispatch(registerUser({ ...data, picture: "" }));
    }
    if (res.payload.user) {
      navigate("/");
    }
  };
  const uploadImage = async () => {
    let formData = new FormData();
    formData.append("upload_preset", cloud_secret);
    formData.append("file", picture);
    const { data } = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
      formData
    );
    console.log(data);
    return data;
  };
  return (
    <div className="h-screen w-full flex items-center justify-center overflow-hidden">
      {/* container */}
      <div className="w-full max-w-md space-y-8 p-10 dark: bg-dark_bg_2 rounded-xl">
        {/* heading */}
        <div className="text-center dark:text-dark_text_1">
          <h2 className="mt-6 text-3xl font-bold">Welcome</h2>
          <p className="mt-2 text-sm ">Sign up</p>
        </div>
        {/* form  */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
          <AuthInput
            name="name"
            type="text"
            placeholder="full name"
            register={register}
            error={errors?.name?.message}
          />
          <AuthInput
            name="email"
            type="text"
            placeholder="Email address"
            register={register}
            error={errors?.email?.message}
          />
          <AuthInput
            name="status"
            type="text"
            placeholder="Status (Optional)"
            register={register}
            error={errors?.status?.message}
          />
          <AuthInput
            name="password"
            type="password"
            placeholder="Password"
            register={register}
            error={errors?.password?.message}
          />
          {/* picture */}
          <Picture
            readablePicture={readablePicture}
            setPicture={setPicture}
            setReadablePicture={setReadablePicture}
          />
          {/* if we have error */}
          {error && (
            <div>
              <p className="text-red-400">{error}</p>
            </div>
          )}
          {/* submit button */}
          <button
            className="w-full flex justify-center bg-green_1 text-gray-100 p-4 rounded-full tracking-wide font-semibold focus: outline-none hover:bg-green_2 shadow-lg cursor-pointer transition ease-in duration-300"
            type="submit"
          >
            {status === "loading" ? <SyncLoader color="#fff" /> : "Sign Up"}
          </button>

          {/* sign in link */}
          <p className="flex flex-col items-center justify-center mt-10 text-center text-md dark:text-dark_text_1">
            <span>Already have an account?</span>
            <Link
              className="hover:underline cursor-pointer transition ease-in duration-300"
              to="/login"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Registerform;
