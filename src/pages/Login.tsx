import { useNavigate } from "react-router-dom";
import LeftBackground from "../components/LeftBackground";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../lib/utils";
import {
  GoogleLogin,
  CredentialResponse,
  GoogleOAuthProvider,
} from "@react-oauth/google";

const Login = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const handleGoogleLogin = async (credentialResponse: CredentialResponse) => {
    console.log(credentialResponse);
    if (credentialResponse) {
      navigate("/dashboard");
    }
  };

  const onSubmit = handleSubmit((data) => {
    try {
      if (data) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <section className="flex flex-col w-full min-h-screen">
      <div className="flex flex-col md:flex-row w-full h-screen shadow-lg  overflow-hidden">
        <LeftBackground />
        <div className="w-full md:w-1/2 min-w-0 sm:min-w-[360px] md:min-w-[375px] relative bg-white h-screen overflow-y-auto px-4">
          <div className="max-w-md mx-auto mt-6 sm:mt-8 md:mt-16 lg:mt-24 xl:mt-32">
            <h1 className="text-[1.8rem] text-center leading-[36px] font-bold">
              Log in to your account
            </h1>
            <p className="text-[1rem] text-[#6B7280] text-center leading-[24px]">
              Access your dashboard to manage your projects and tasks.
            </p>
            <form onSubmit={onSubmit}>
              <div className="mt-8">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <input
                  {...register("email")}
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm font-medium">
                    {errors.email?.message}
                  </p>
                )}
              </div>

              <div className="mt-6">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  {...register("password")}
                  type="password"
                  id="password"
                  name="password"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm font-medium">
                    {errors.password?.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 cursor-pointer rounded-md transition duration-200 ease-in-out"
                disabled={isSubmitting}
              >
                {isSubmitting && (
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                )}
                {isSubmitting ? "logging in..." : "login"}
              </button>
            </form>
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <span
                  onClick={() => navigate("/sign-up")}
                  className="text-blue-600 hover:text-blue-700 font-semibold cursor-pointer transition duration-200 ease-in-out"
                >
                  Sign up
                </span>
              </p>
            </div>
            <div className="w-full text-white font-medium py-3 rounded-md hover:bg-[rgb(253,130,64, 0.5)] transition cursor-pointer">
              <GoogleOAuthProvider
                clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
              >
                <GoogleLogin
                  onSuccess={handleGoogleLogin}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                />
              </GoogleOAuthProvider>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
