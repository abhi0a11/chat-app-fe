import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInSchema } from "../../utils/validation.js";
import { useDispatch, useSelector } from "react-redux";
import AuthInput from "./AuthInput.jsx";
import SyncLoader from "react-spinners/SyncLoader.js";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../features/userSlice.js";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, error } = useSelector(state => state.user);
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "abhishekkumawat.ak21@gmail.com",
      password: "Abhishek@abhi0112",
    },
    resolver: yupResolver(signInSchema),
  });

  const onSubmit = async values => {
    let res = await dispatch(loginUser({ ...values }));
    if (res.payload.user) {
      navigate("/");
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center overflow-hidden">
      {/* container */}
      <div className="w-full max-w-md space-y-8 p-10 dark: bg-dark_bg_2 rounded-xl">
        {/* heading */}
        <div className="text-center dark:text-dark_text_1">
          <h2 className="mt-6 text-3xl font-bold">Welcome Back</h2>
          <p className="mt-2 text-sm ">Sign in</p>
        </div>
        {/* form  */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
          <AuthInput
            name="email"
            type="text"
            placeholder="Email address"
            register={register}
            error={errors?.email?.message}
          />
          <AuthInput
            name="password"
            type="password"
            placeholder="Password"
            register={register}
            error={errors?.password?.message}
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
            {status === "loading" ? <SyncLoader color="#fff" /> : "Sign In"}
          </button>

          {/* sign in link */}
          <p className="flex flex-col items-center justify-center mt-10 text-center text-md dark:text-dark_text_1">
            <span>you do not have an account?</span>
            <Link
              className="hover:underline cursor-pointer transition ease-in duration-300"
              to="/register"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
