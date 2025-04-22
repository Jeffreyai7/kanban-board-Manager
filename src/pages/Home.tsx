import { Link } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
// import monitor from "../assets/monitor-bg.png";

const Home: React.FC = () => {
  const year = new Date().getFullYear();
  return (
    <>
      <Header />
      <main className="bg-primary text-white  pt-14 md:py-20">
        {/* <section className="max-w-[90%] w-full mx-auto py-16 grid grid-cols-1 md:grid-cols-2 items-center gap-3 "> */}
        <section className="max-w-[90%] min-h-[60vh] w-full mx-auto py-16 flex flex-col justify-center items-center ">
          <div className="text-center md:text-left pb-16 md:b-2">
            <h1 className="text-3xl md:text-7xl leading-24 text-center text-primary-tint max-w-[25ch] font-bold mb-5 ">
              {/* From Chaos to Clarity */}
              Seamless Task management for individuals
            </h1>
            <p className=" max-w-[80ch] text-center mx-auto">
              In today's fast paced world, staying organized and on track can be
              challenging. Taskcraft aims to provide a centralized solution just
              for you.
            </p>

            <div className="md:max-w-[90%] mt-10 flex items-center flex-col md:flex-row gap-4">
              <input
                type="email"
                name="userEmail"
                placeholder="Enter your email"
                className="w-full h-full border rounded py-3 px-3 border-gray-300 outline-gray-300"
              />
              <Link to="/sign-up" className="md:max-w-[30%] w-full">
                <Button variant="secondary">Sign Up for free</Button>
              </Link>
            </div>
            <p className="transition-all duration-400 mt-4">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-tertiary border-b border-b-tertiary hover:border-none"
              >
                Log in here
              </Link>
            </p>
          </div>

          {/* <div className="bg-[#f9f9f9]">
            <img src={monitor} alt="monitor" loading="lazy" />
          </div> */}
        </section>

        {/* next section */}
        <section className="py-10">
          <h2 className="text-white font-bold text-2xl md:text-4xl max-w-[40ch] mx-auto text-center md:leading-12 tracking-tighter px-4">
            Stay organized, boost productivity, and manage tasks effortlessly
            with TaskCraft.
          </h2>

          {/* grid section */}
          <div className="grid grid-cols-1 md:grid-cols-[35fr_65fr] gap-10 pt-16 px-3 md:px-16">
            {/* div-1 */}
            <div className="bg-amber-100 rounded-3xl flex flex-col justify-center items-center px-10 py-7 text-center">
              <h4 className="text-3xl font-bold text-blue-600 mb-5">
                Stay ahead of what's next
              </h4>
              <p className="text-lg text-gray-950">
                Organize your work, agenda, calender, reminders all from the
                confort of your home
              </p>
              <Link to="sign-up">
                <button className="border py-4 px-7 border-gray-300 bg-gray-300 text-base  text-black rounded-2xl mt-7">
                  Join for free today!
                </button>
              </Link>
            </div>
            {/* div-2 */}
            <div className="bg-black/95 rounded-3xl py-5 px-2 md:p-16">
              <h2 className="text-lg text-white md:text-[1.7rem] font-bold text-center mb-7">
                From busy to balanced - Productivity that flows
              </h2>
              <div className="flex justify-center items-center gap-1.5 md:gap-7">
                <p className="text-white/95 text-center text-sm md:text-base">
                  <span className="block text-blue-700 text-[1.9rem] md:text-4xl font-bold text-center mb-3">
                    85%
                  </span>
                  Boost in task completion rate
                </p>
                <p className="text-white/95 text-center border-x md:border-0 border-x-gray-300 text-sm md:text-base px-1">
                  <span className="block text-blue-700 text-[1.9rem] md:text-4xl font-bold text-center mb-3">
                    30%
                  </span>
                  More time saved per project
                </p>
                <p className="text-white/95 text-center text-sm md:text-base">
                  <span className="block text-blue-700 text-[1.9rem] md:text-4xl font-bold text-center mb-3">
                    90%
                  </span>
                  Reduction in missed deadlines
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="bg-white max-w-6xl mx-auto mt-16 md:rounded-2xl min-h-5 py-16 px-4 md:px-10 flex flex-col justify-center items-center gap-10 text-center">
          <h4 className="text-primary font-extrabold text-[1.8rem] tracking-wider md:text-4xl">
            Ready to craft your day with clarity?
          </h4>
          <p className="text-primary font-normal text-lg tracking-wide">
            Start using TaskCraft today — it&apos;s free and takes less than 60
            seconds to set up.
          </p>
          <Link
            to="/sign=up"
            className=" py-4 px-7 bg-primary hover:opacity-65 rounded-2xl"
          >
            Get Started Now
          </Link>
        </section>
      </main>

      {/* footer */}
      <footer className="bg-black py-4">
        <div className="p-4 grid grid-cols-1 md:grid-cols-7 gap-4">
          <div className="flex justify-center md:justify-start gap-1 items-center md:col-span-4">
            <div className="flex gap-0.5 border border-gray-200 rounded p-1">
              <div className="h-4 w-1 bg-primary-tint rounded-sm"></div>
              <div className="h-3 w-1 bg-primary-tint rounded-sm"></div>
            </div>
            <p className="font-bold text-base tracking-wider text-white">
              Task<span className="text-secondary uppercase">Craft</span>
            </p>
          </div>

          {/* company */}
          <div className="text-center">
            <h4 className="text-gray-100 font-medium text-base mb-2">
              Company
            </h4>
            {["About us", "FAQ"].map((link, index) => (
              <li
                key={index}
                className="text-gray-100 text-sm list-none hover:underline transition-all duration-300"
              >
                {link}
              </li>
            ))}
          </div>

          {/* legal */}
          <div className="text-center">
            <h4 className="text-gray-100 font-medium text-base mb-2">Legal</h4>
            {["Terms of services", "Privacy policy"].map((link, index) => (
              <li
                key={index}
                className="text-gray-100 text-sm list-none hover:underline transition-all duration-300"
              >
                {link}
              </li>
            ))}
          </div>

          {/* contact */}
          <div className="text-center">
            <h4 className="text-gray-100 font-medium text-base mb-2">
              Get in touch
            </h4>
            {["Contact us", "Help centre"].map((link, index) => (
              <li
                key={index}
                className="text-gray-100 list-none hover:underline transition-all duration-300"
              >
                {link}
              </li>
            ))}
          </div>
        </div>

        <hr className="bg-gray-400 w-full h-0.5" />

        <div>
          <p className="text-gray-100 text-base text-center pt-4">
            Copyright &copy; {year} TaskCraft
          </p>
        </div>
      </footer>
    </>
  );
};

export default Home;
