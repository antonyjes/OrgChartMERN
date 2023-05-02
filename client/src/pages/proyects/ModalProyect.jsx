import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const ModalProyects = ({
  setShowModal,
  operation,
  currentProyect,
  getProyects,
}) => {
  const [name, setName] = useState(currentProyect.name || "");
  const [description, setDescription] = useState(
    currentProyect.description || ""
  );
  const [status, setStatus] = useState(currentProyect.status || "");
  const [dateInit, setDateInit] = useState(currentProyect.dateInit || "");
  const [dateEnd, setDateEnd] = useState(currentProyect.dateEnd || "");
  const token = useSelector((state) => state.token);

  function dateFormated(date) {
    let dateObj = new Date(date);
    let formattedDate = dateObj.toISOString().slice(0, 10);
    return formattedDate;
  }

  const createProyect = async () => {
    const savedProyectResponse = await fetch(
      "http://localhost:3003/proyects/createProyect",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          description: description,
          status: status,
          dateInit: dateInit,
          dateEnd: dateEnd,
        }),
      }
    );

    const savedProyect = await savedProyectResponse.json();

    if (savedProyect) {
      setShowModal(false);
      toast.success("Proyect created!");
      getProyects();
    }
  };

  const editProyect = async () => {
    const editProyectResponse = await fetch(
      `http://localhost:3003/proyects/${currentProyect._id}/editProyect`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name,
          description: description,
          status: status,
          dateInit: dateInit,
          dateEnd: dateEnd,
        }),
      }
    );

    const updatedProyect = editProyectResponse.json();

    if (updatedProyect) {
      toast.success("Proyect updated!");
      setShowModal(false);
      getProyects();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (operation === "Create") await createProyect();
    if (operation === "Edit") await editProyect();
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
                  Name of the proyect:
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
            <div className="p-6">
              <div className="mb-6">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description:
                </label>
                <input
                  type="text"
                  id="description"
                  value={description}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Proyect for ..."
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Status:
                </label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="">Select an status:</option>
                  <option value="In process">In process</option>
                  <option value="Finished">Finished</option>
                </select>
              </div>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <label
                  htmlFor="dateInit"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Date Init:
                </label>
                <input
                  type="date"
                  id="dateInit"
                  value={dateFormated(dateInit)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(e) => setDateInit(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="p-6">
              <div className="mb-6">
                <label
                  htmlFor="dateEnd"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Date End:
                </label>
                <input
                  type="date"
                  id="dateEnd"
                  value={dateFormated(dateEnd)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(e) => setDateEnd(e.target.value)}
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

export default ModalProyects;
