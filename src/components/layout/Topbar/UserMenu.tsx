import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { User } from "../../../types/types";
import { CiLogout } from "react-icons/ci";

interface UserMenuProps {
  user: User;
}

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <img
        src={user.avatar}
        alt="Avatar"
        className="w-12 h-12 object-cover rounded-full cursor-pointer"
        onClick={() => setShowMenu(!showMenu)}
      />
      {showMenu && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-2.5 z-50">
          <div className="px-4 py-2 border-b border-b-gray-200">
            <p className="text-sm font-medium text-gray-900">{user.name}</p>
            <p className="text-xs text-gray-600">{user.email}</p>
          </div>

          {/* div containing the buttons */}
          <div className=" flex justify-center items-center pt-2 mx-3">
            <Link to="/login">
              <button className="bg-red-100 w-full flex justify-center items-center gap-1 border border-red-200 rounded-lg px-4 py-2 hover:bg-red-200 text-sm text-red-800">
                <CiLogout className="text-sm text-red-800" />
                <span>Log out</span>
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
