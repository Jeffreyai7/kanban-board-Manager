import { useNavigate } from "react-router-dom";
import LeftBackground from "../components/LeftBackground";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "../lib/utils";

const SignUp = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = handleSubmit((data) => {
    try {
      console.log(data);
      navigate("/login");
    } catch (error) {}
  });

  return (
    <section className="flex flex-col w-full min-h-screen">
      <div className="flex flex-col md:flex-row w-full h-screen shadow-lg overflow-hidden">
        <LeftBackground />
        <div className="w-full md:w-1/2 min-w-0 sm:min-w-[360px] md:min-w-[375px] relative bg-white h-screen overflow-y-auto pb-4 px-4">
          <div className="max-w-md mx-auto mt-6 sm:mt-8 md:mt-16 lg:mt-24 xl:mt-32">
            <h1 className="text-[1.8rem] text-center leading-[36px] font-bold">
              Create your account
            </h1>
            <p className="text-[1rem] text-[#6B7280] text-center leading-[24px]">
              Get started with your projects and tasks.
            </p>
            <form onSubmit={onSubmit}>
              <div className="mt-8">
                <label
                  htmlFor="fName"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <input
                  {...register("fName")}
                  type="text"
                  id="fName"
                  name="fName"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {errors.fName && (
                  <p className="text-red-500 text-sm font-medium">
                    {errors.fName?.message}
                  </p>
                )}
              </div>
              <div className="mt-8">
                <label
                  htmlFor="lName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>
                <input
                  {...register("lName")}
                  type="text"
                  id="lName"
                  name="lName"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {errors.lName && (
                  <p className="text-red-500 text-sm font-medium">
                    {errors.lName?.message}
                  </p>
                )}
              </div>
              <div className="mt-6">
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <input
                  {...register("phoneNumber")}
                  type="number"
                  id="phoneNumber"
                  name="phoneNumber"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-sm font-medium">
                    {errors.phoneNumber?.message}
                  </p>
                )}
              </div>
              <div className="mt-6">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
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
              <div className="mt-6">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <input
                  {...register("confirmPassword")}
                  type="confirm password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm font-medium">
                    {errors.confirmPassword?.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold cursor-pointer py-2 px-4 rounded-md transition duration-200 ease-in-out"
                disabled={isSubmitting}
              >
                {isSubmitting && (
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
                )}
                {isSubmitting ? "Creating account..." : "Create account"}
              </button>
            </form>
            <p className="mt-4 text-sm text-center text-gray-500">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-blue-600 hover:underline cursor-pointer font-semibold transition duration-200 ease-in-out"
              >
                Sign in
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
