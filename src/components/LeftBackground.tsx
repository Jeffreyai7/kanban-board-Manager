const LeftBackground = () => {
  return (
    <div className="hidden md:flex w-1/2 min-w-[480px] bg-cover bg-center bg-[#5c40fd] text-white">
      <div className="w-[480px] bg-opacity-50 md:pt-[calc(120px-4%)] md:pl-[calc(170px-4%)]  lg:pl-[calc(120px-3%)] lg:pt-[calc(125px-3%)] xl:pt-[125px] xl:pl-[159px]">
        <div className="">
          <div className="flex items-center gap-1 md:mb-[calc(266px-70%)] lg:mb-[calc(240px-50%)] xl:mb-[240px]">
            <div className="flex gap-0.5 border border-gray-200 rounded p-1">
              <div className="h-6 w-2 bg-blue-700 rounded"></div>
              <div className="h-4 w-2 bg-blue-700 rounded"></div>
            </div>
            <p
              className="leading-[49px] font-semibold text-[3rem]"
              style={{ fontFamily: "SF Pro Rounded, sans-serif" }}
            >
              Kanban
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftBackground;
