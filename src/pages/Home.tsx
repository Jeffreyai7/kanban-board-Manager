import Header from "../components/Header";
import monitor from "../assets/monitor.png";

const Home: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <section className="max-w-[90%] w-full mx-auto my-16 grid grid-cols-1 md:grid-cols-2 items-center gap-3">
          <div className="text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold mb-10 leading-12">
              From Chaos to Clarity <br />
              One Card at a Time
            </h1>
            <p className="leading-7 text-gray-800">
              Tired of messy to-do lists and scattered tasks? Our Kanban board
              brings structure to your workflow by turning your ideas into
              clear, actionable cards. Whether you're planning a personal
              project or managing a team, our intuitive drag-and-drop interface
              helps you stay focused, organized, and in control. It's time to
              transform your productivity—one card at a time.
            </p>

            <div className="mt-5">
              <button className="bg-blue-700 text-white rounded-2xl py-2 px-4 hover:bg-blue-900 cursor-pointer transition-all duration-300">
                Sign Up for free
              </button>
            </div>
          </div>

          <div>
            <img src={monitor} alt="monitor" />
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
