import UserMenu from "./UserMenu";
import { FaBell } from "react-icons/fa6";
import Logo from "../../Logo";

const Topbar: React.FC = () => {
  const user = {
    name: "Prince Jeffery",
    email: "prince-jeff@gmail.com",
    avatar:
      "https://img.freepik.com/premium-photo/cute-little-cartoon-boy-sportswear-cute-boy-character-coat-with-green-eyes-ai-generative_891301-17324.jpg",
  };

  return (
    <nav className="h-[70px] bg-gray-100 shadow-md px-6 py-3 flex justify-between items-center">
      <div>
        <Logo />
      </div>

      <div className="flex items-center gap-4">
        <button
          title="Notifications"
          className="text-gray-600 hover:text-black text-xl"
        >
          <FaBell />
        </button>
        <UserMenu user={user} />
      </div>
    </nav>
  );
};

export default Topbar;
