import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Hero: React.FC = () => {
  return (
    <section className="pt-28 pb-16 md:pt-32 md:pb-24 bg-gradient-to-b from-white dark:from-gray-900 to-gray-50 dark:to-gray-800 dark:text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 lg:pr-12 mb-10 lg:mb-0 animate-slide-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-gray-900 dark:text-white">
              <span className="block">Manage Tasks,</span>
              <span className="bg-gradient-to-r from-[#2B3089] to-[#1D9EE2] dark:from-[#1D9EE2] dark:to-[#AB4A9C] inline-block text-transparent bg-clip-text">
                Not Chaos
              </span>
            </h1>
            <p
              className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-xl animate-fade-in"
              style={{ animationDelay: "0.2s" }}
            >
              TaskCraft helps you organize work with intuitive drag and drop
              task management, customizable workflows, and powerful
              collaboration tools.
            </p>

            <div
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 animate-fade-in"
              style={{ animationDelay: "0.4s" }}
            >
              <Link
                to="sign-up"
                className="flex items-center justify-center bg-[#2B3089] dark:bg-[#1D9EE2] hover:bg-[#1D9EE2] dark:hover:bg-[#2B3089] text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105"
              >
                Get Started for Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <a
                href="#how-it-works"
                className="flex items-center justify-center border-2 border-[#2B3089] dark:border-[#1D9EE2] text-[#2B3089] dark:text-[#1D9EE2] font-medium py-3 px-6 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 hover:scale-105"
              >
                See Demo
              </a>
            </div>

            <div
              className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400 animate-fade-in"
              style={{ animationDelay: "0.6s" }}
            >
              <span className="flex items-center mr-8">
                <svg
                  className="w-5 h-5 mr-2 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                No credit card required
              </span>
            </div>
          </div>

          <div className="lg:w-1/2 relative animate-float scroll-0">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl dark:shadow-gray-700 p-4 transform hover:scale-[1.02] transition-all duration-500">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-2">
                <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide">
                  {["To Do", "In Progress", "In Review", "Done"].map(
                    (column, index) => (
                      <div
                        key={index}
                        className="flex-shrink-0 w-72 h-96 animate-scale-up"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div
                          className={`h-full rounded-lg p-4 ${
                            index === 0
                              ? "bg-blue-50 dark:bg-blue-900/30"
                              : index === 1
                              ? "bg-purple-50 dark:bg-purple-900/30"
                              : index === 2
                              ? "bg-orange-50 dark:bg-orange-900/30"
                              : "bg-green-50 dark:bg-green-900/30"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                              {column}
                            </h3>
                            <span className="bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs font-medium px-2 py-1 rounded-full">
                              {index === 0
                                ? "3"
                                : index === 1
                                ? "2"
                                : index === 2
                                ? "1"
                                : "4"}
                            </span>
                          </div>

                          {[1, 2, 3].map((_task, taskIndex) => (
                            <div
                              key={taskIndex}
                              className={`bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm dark:shadow-gray-700 mb-3 transform hover:scale-[1.02] transition-all duration-300 ${
                                index === 1 && taskIndex === 0
                                  ? "border-l-4 border-[#1D9EE2]"
                                  : ""
                              } ${
                                index === 0 && taskIndex === 1
                                  ? "border-l-4 border-[#AB4A9C]"
                                  : ""
                              }`}
                            >
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="font-medium text-sm text-gray-800 dark:text-gray-200">
                                  {index === 0 && taskIndex === 0
                                    ? "Update homepage layout"
                                    : index === 0 && taskIndex === 1
                                    ? "Fix login button bug"
                                    : index === 1 && taskIndex === 0
                                    ? "Design new user flow"
                                    : index === 2 && taskIndex === 0
                                    ? "API integration"
                                    : index === 3 && taskIndex === 0
                                    ? "Write documentation"
                                    : `Task ${taskIndex + 1}`}
                                </h4>
                                <span
                                  className={`text-xs px-2 py-1 rounded-full ${
                                    taskIndex === 0
                                      ? "bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-200"
                                      : taskIndex === 1
                                      ? "bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-200"
                                      : "bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200"
                                  }`}
                                >
                                  {taskIndex === 0
                                    ? "High"
                                    : taskIndex === 1
                                    ? "Medium"
                                    : "Low"}
                                </span>
                              </div>
                              <p className="text-gray-500 dark:text-gray-400 text-xs mb-3">
                                {index === 0 && taskIndex === 0
                                  ? "Update the homepage with new branding elements"
                                  : index === 1 && taskIndex === 0
                                  ? "Create wireframes for new user onboarding experience"
                                  : "Task description goes here..."}
                              </p>
                              <div className="flex justify-between items-center">
                                <div className="flex -space-x-2">
                                  <div className="w-6 h-6 rounded-full bg-blue-500"></div>
                                  <div className="w-6 h-6 rounded-full bg-purple-500"></div>
                                </div>
                                <span className="text-xs text-gray-500">
                                  2d
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            <div className="absolute -z-10 -bottom-10 -right-10 w-64 h-64 bg-gradient-to-r from-[#AB4A9C] to-[#1D9EE2] opacity-20 dark:opacity-10 rounded-full blur-3xl"></div>
            <div className="absolute -z-10 -top-10 -left-10 w-40 h-40 bg-gradient-to-r from-[#2B3089] to-[#1D9EE2] opacity-20 dark:opacity-10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
