import { useNavigate } from "react-router-dom";
import LeftBackground from "../components/LeftBackground";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../lib/utils";
import { useState } from "react";

const Login = () => {
  const [isSubmitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  const { handleSubmit, register, setError } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = handleSubmit((data) => {
    try {
      setSubmitting(true);
      console.log(data);
    } catch (error) {
      setSubmitting(false);
    }
  });

  return (
    <section className="flex flex-col w-full min-h-screen">
      <div className="flex flex-col md:flex-row w-full h-screen shadow-lg  overflow-hidden">
        <LeftBackground />
        <div className="w-full md:w-1/2 min-w-[480px] relative bg-white h-screen overflow-y-auto">
          <div className="max-w-md mx-auto lg:mt-24 xl:mt-52">
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
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
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
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>

              <button
                type="submit"
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-200 ease-in-out"
              >
                Log in
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
