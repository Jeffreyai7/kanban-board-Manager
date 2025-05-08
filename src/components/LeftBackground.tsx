import { Link } from "react-router-dom";

const LeftBackground = () => {
  return (
    <div className="hidden md:flex w-1/2 min-w-[480px] bg-cover bg-center bg-gradient-to-br from-gray-900 via-slate-800 to-blue-900 text-white">
      <div className="w-[480px] bg-opacity-50 md:pt-[calc(120px-4%)] md:pl-[calc(170px-4%)]  lg:pl-[calc(120px-3%)] lg:pt-[calc(125px-3%)] xl:pt-[125px] xl:pl-[159px]">
        <Link to="/" className="">
          <img src="/images/logo.png" alt="Logo" />
          {/* <div className="flex items-center gap-1 md:mb-[calc(266px-70%)] lg:mb-[calc(240px-50%)] xl:mb-[240px]">
           
            <p
              className="leading-[49px] font-semibold text-[3rem]"
              style={{ fontFamily: "SF Pro Rounded, sans-serif" }}
            >
              TaskCraft
            </p>
          </div> */}
        </Link>
      </div>
    </div>
  );
};

export default LeftBackground;
