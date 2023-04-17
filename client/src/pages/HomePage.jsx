import { useSelector } from "react-redux";
import Aside from "../components/Aside";
import Sidebar from "../components/Sidebar";

const HomePage = () => {
  const user = useSelector((state) => state.user);

  return (
    <div>
      <Sidebar />
      <Aside />
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
              <p className="text-2xl text-gray-400 dark:text-gray-500 uppercase">
                Welcome {user.role}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
