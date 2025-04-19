import SearchBar from "./Searchbar";
import UserMenu from "./UserMenu";
import { User } from "../../../types/types";
import { FaBell } from "react-icons/fa6";

const Topbar: React.FC = () => {
  const user: User = {
    name: "Prince Jeffery",
    email: "prince-jeff@gmail.com",
    avatar: "https://i.pravatar.cc/150?img=8",
  };
  return (
    <nav className="h-[70px] bg-white/95 shadow-sm px-6 py-3 flex justify-between items-center">
      {/* Right Side */}

      <div>
        <SearchBar />
      </div>

      {/* Left Side */}
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
