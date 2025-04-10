import monitor from "../assets/monitor-bg.png";

const HomeMain = () => {
  return (
    <main>
      <main className="bg-[#f9f9f9]  py-20">
        <section className="max-w-[90%] w-full mx-auto py-16 grid grid-cols-1 md:grid-cols-2 items-center gap-3">
          <div className="text-center md:text-left pb-16 md:b-2">
            {/* <h1 className="text-3xl md:text-4xl font-bold mb-10 leading-12">
              From Chaos to Clarity <br />
              One Card at a Time
            </h1> */}
            <h1 className="text-3xl text-blue-800 md:text-5xl font-bold mb-5 leading-12">
              From Chaos to Clarity
            </h1>
            <p className="text-gray-800 capitalize">
              structure your workflow by turning ideas into clear, actionable
              cards.
            </p>
            {/* <p className="leading-7 text-gray-800">
              Tired of messy to-do lists and scattered tasks? Our Kanban board
              brings structure to your workflow by turning your ideas into
              clear, actionable cards. Whether you're planning a personal
              project or managing a team, our intuitive drag-and-drop interface
              helps you stay focused, organized, and in control. It's time to
              transform your productivity—one card at a time.
            </p> */}

            <div className="md:max-w-[90%] mt-10 flex flex-col md:flex-row gap-4">
              <input
                type="email"
                name="userEmail"
                placeholder="Enter your email"
                className="w-full h-full border rounded py-3 px-3 border-gray-300 outline-gray-300"
              />
              <button className="bg-blue-700 text-white text-sm rounded-2xl py-2 px-4 hover:bg-blue-900 cursor-pointer transition-all duration-300 md:max-w-[30%] w-full">
                Sign Up for free
              </button>
            </div>
            <p className="transition-all duration-400 mt-4">
              Already have an account?{" "}
              <span className="text-blue-600 border-b border-b-blue-600 hover:border-none hover:text-blue-800">
                Log in here
              </span>
            </p>

            {/* <div className="mt-5">
              <button className="bg-blue-700 text-white rounded-2xl py-2 px-4 hover:bg-blue-900 cursor-pointer transition-all duration-300">
                Sign Up for free
              </button>
            </div> */}
          </div>

          <div className="bg-[#f9f9f9]">
            <img src={monitor} alt="monitor" loading="lazy" />
          </div>
        </section>

        <section>
          <div className="max-w-[95%] md:max-w-[65%] mx-auto bg-white rounded-3xl py-5 px-2 md:p-16">
            <h2 className="text-lg md:text-3xl font-bold text-center mb-7">
              From busy to balanced - Productivity that flows
            </h2>
            <div className="flex justify-center items-center gap-1.5 md:gap-7">
              <p className="text-gray-700 text-sm md:text-base">
                <span className="block text-blue-700 text-3xl md:text-5xl font-bold text-center mb-3">
                  85%
                </span>
                Boost in task completion rate
              </p>
              <p className="text-gray-700 px-1 border-x md:border-0 border-x-gray-300 text-sm md:text-base">
                <span className="block text-blue-700 text-3xl md:text-5xl font-bold text-center mb-3">
                  30%
                </span>
                More time saved per project
              </p>
              <p className="text-gray-700 text-sm md:text-base">
                <span className="block text-blue-700 text-3xl md:text-5xl font-bold text-center mb-3">
                  90%
                </span>
                Reduction in missed deadlines
              </p>
            </div>
          </div>
        </section>
      </main>
    </main>
  );
};

export default HomeMain;
