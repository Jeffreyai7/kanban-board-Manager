import { useState } from "react";
import UserMenu from "./UserMenu";
import SearchBar from "./Searchbar";
import { FaBell } from "react-icons/fa6";
import { Task } from "../../../types/types"; // Assuming you have this type

type TopbarProps = {
  isMobile: boolean;
  collapsed: boolean;
  taskRefs: React.MutableRefObject<Record<string, HTMLDivElement | null>>;
  scrollToTask: (taskId: string) => void;
  tasks: Task[]; // You need to pass tasks from parent or context
};

const Topbar = ({
  isMobile,
  collapsed,
  taskRefs, // destructure these properly
  scrollToTask,
  tasks,
}: TopbarProps) => {
  const user = {
    name: "Prince Jeffery",
    email: "prince-jeff@gmail.com",
    avatar:
      "https://img.freepik.com/premium-photo/cute-little-cartoon-boy-sportswear-cute-boy-character-coat-with-green-eyes-ai-generative_891301-17324.jpg",
  };

  const [searchTerm, setSearchTerm] = useState<string>("");

  return (
    <nav
      className={`fixed top-0 ${
        isMobile ? "left-0" : collapsed ? "left-16" : "left-40"
      } right-0 h-14 px-6 py-3 flex justify-between items-center bg-gray-100 dark:bg-primary`}
    >
      <div className="w-2/5">
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSelectTask={scrollToTask}
          // tasks={tasks}
          tasks={tasks || []}
        />
      </div>

      <div className="flex items-center gap-4">
        <button
          title="Notifications"
          className="text-gray-600 dark:text-gray-200 hover:text-gray-800 dark:hover:text-gray-300 text-xl"
        >
          <FaBell />
        </button>
        <UserMenu user={user} />
      </div>
    </nav>
  );
};

export default Topbar;

// import { useState } from "react";
// import UserMenu from "./UserMenu";
// import SearchBar from "./Searchbar";
// import { FaBell } from "react-icons/fa6";

// // type topBarProps = {
// //   isMobile: boolean;
// //   collapsed: boolean;
// // };
// type TopbarProps = {
//   isMobile: boolean;
//   collapsed: boolean;
//   taskRefs: React.MutableRefObject<Record<string, HTMLDivElement | null>>;
//   scrollToTask: (taskId: string) => void;
// };

// const Topbar = ({ isMobile, collapsed }: TopbarProps) => {
//   const user = {
//     // name: "Prince Jeffery",
//     email: "prince-jeff@gmail.com",
//     avatar:
//       "https://img.freepik.com/premium-photo/cute-little-cartoon-boy-sportswear-cute-boy-character-coat-with-green-eyes-ai-generative_891301-17324.jpg",
//   };

//   const [searchTerm, setSearchTerm] = useState<string>("");

//   const scrollToTask = (taskId: string) => {
//     const el = taskRefs.current[taskId];
//     if (el) {
//       el.scrollIntoView({ behavior: "smooth", block: "center" });
//       el.classList.add("ring", "ring-blue-500");
//       setTimeout(() => {
//         el.classList.remove("ring", "ring-blue-500");
//       }, 2000);
//     }
//   };

//   return (
//     <nav
//       className={`fixed top-0 ${
//         isMobile ? "left-0" : collapsed ? "left-16" : "left-40"
//       }  right-0 h-14  px-6 py-3 flex justify-between items-center bg-gray-100 dark:bg-primary
//         }`}
//     >
//       <div className="w-2/5">
//         <SearchBar
//           searchTerm={searchTerm}
//           setSearchTerm={setSearchTerm}
//           onSelectTask={scrollToTask}
//           tasks={tasks}
//         />
//       </div>

//       <div className="flex items-center gap-4">
//         <button
//           title="Notifications"
//           className="text-gray-600 dark:text-gray-200 hover:text-gray-800 dark:hover:text-gray-300 text-xl"
//         >
//           <FaBell />
//         </button>
//         <UserMenu user={user} />
//       </div>
//     </nav>
//   );
// };

// export default Topbar;
