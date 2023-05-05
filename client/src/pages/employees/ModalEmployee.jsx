import { useState } from "react";
import { useSelector } from "react-redux";

const ModalEmployee = ({
  setShowModal,
  fatherId,
  operation,
  currentEmployee,
  getEmployeesData,
}) => {
  const [firstName, setFirstName] = useState(currentEmployee.firstName || "");
  const token = useSelector((state) => state.token);

  return (
    <div>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-non">
        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-white rounded-lg shadow-lg w-96">
            <div className="bg-gray-800 text-white py-4 px-6 rounded-t-lg flex justify-between items-center">
              <h2 className="text-lg font-bold">{operation}</h2>
              <button
                className="text-white hover:text-gray-400 transition duration-150"
                onClick={() => setShowModal(false)}
              >
                X
              </button>
            </div>
            <form>
              <div className="p-6">
                <div className="mb-6">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    value={firstName}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="First Name"
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end py-4 px-6">
                <button
                  type="button"
                  className="text-gray-500 hover:text-gray-700 mr-2"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalEmployee;
