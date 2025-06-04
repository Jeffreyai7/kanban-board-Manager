import { RouterProvider } from "react-router-dom";
import router from "./services/routes";

function App() {
  return <RouterProvider router={router} />;
}

export default App;

// import ThemeToggle from "./components/ThemeToggle";

// function App() {
//   return (
//     <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
//       <header className="p-4">
//         <ThemeToggle />
//       </header>
//       <main>
//         <h1 className="text-3xl text-black dark:text-white">
//           Welcome to TaskCraft!
//         </h1>
//         <p className="text-sm bg-amber-50 dark:bg-amber-950 text-gray-700 dark:text-gray-300">
//           Toggle between light and dark modes using the button above.
//         </p>
//       </main>
//     </div>
//   );
// }

// export default App;
