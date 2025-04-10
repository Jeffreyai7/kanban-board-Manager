const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black py-4">
      <div className="p-4 grid grid-cols-1 md:grid-cols-7 gap-4">
        <div className="flex justify-center md:justify-start gap-1 items-center md:col-span-4">
          <div className="flex gap-0.5 border border-gray-200 rounded p-1">
            <div className="h-6 w-2 bg-blue-700 rounded"></div>
            <div className="h-4 w-2 bg-blue-700 rounded"></div>
          </div>
          <p className="font-bold text-2xl text-gray-100">Kanban</p>
        </div>

        {/* company */}
        <div className="text-center">
          <h4 className="text-gray-100 font-medium text-base mb-2">Company</h4>
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
          Copyright &copy; {year} Kanban
        </p>
      </div>
    </footer>
  );
};

export default Footer;
