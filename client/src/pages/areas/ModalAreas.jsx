import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const ModalAreas = ({ setShowModal, operation, currentArea, getAreas }) => {
  const [name, setName] = useState(currentArea.name || "");
  const token = useSelector((state) => state.token);

  const createArea = async () => {
    const savedAreaResponse = await fetch(
      "http://localhost:3003/areas/createArea",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name }),
      }
    );

    const savedArea = await savedAreaResponse.json();

    if (savedArea) {
      setShowModal(false);
      toast.success("Area created!")
      getAreas();
    }
  };

  const editArea = async () => {
    const editAreaResponse = await fetch(
      `http://localhost:3003/areas/${currentArea._id}/editArea`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name }),
      }
    );
    const updatedArea = editAreaResponse.json();
    if (updatedArea) {
      toast.success("Area updated!");
      setShowModal(false);
      getAreas();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (operation === "Create") await createArea();
    if (operation === "Edit") await editArea();
  };
  return (
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
          <form onSubmit={handleSubmit}>
            <div className="p-6">
              <div className="mb-6">
                <label
                  htmlFor="area"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Area of the company:
                </label>
                <input
                  type="text"
                  id="area"
                  value={name}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Gerente"
                  onChange={(e) => setName(e.target.value)}
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
  );
};

export default ModalAreas;
