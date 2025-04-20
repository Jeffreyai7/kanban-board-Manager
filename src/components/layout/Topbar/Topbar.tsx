import SearchBar from "./Searchbar";
import UserMenu from "./UserMenu";
import { User } from "../../../types/types";
import { FaBell } from "react-icons/fa6";
import Logo from "../../Logo";

const Topbar: React.FC = () => {
  const user: User = {
    name: "Prince Jeffery",
    email: "prince-jeff@gmail.com",
    avatar:
      "https://img.freepik.com/premium-photo/cute-little-cartoon-boy-sportswear-cute-boy-character-coat-with-green-eyes-ai-generative_891301-17324.jpg?ga=GA1.1.1885923595.1745167719&semt=ais_hybrid&w=740",
    // avatar: "https://i.pravatar.cc/150?img=8",
  };
  return (
    <nav className="h-[70px] bg-gray-100 shadow-md px-6 py-3 flex justify-between items-center">
      {/* Right Side */}
      <div>
        <Logo />
      </div>

      {/* Left Side */}
      <div className="flex items-center gap-4">
        <SearchBar />
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
