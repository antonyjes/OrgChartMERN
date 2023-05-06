import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAreas, setProyects } from "state";
import Dropzone from "react-dropzone";
import { toast } from "react-toastify";

const ModalEmployee = ({
  setShowModal,
  fatherId,
  operation,
  currentEmployee,
  getEmployeesData,
}) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const proyects = useSelector((state) => state.proyects);
  const areas = useSelector((state) => state.areas);
  const [firstName, setFirstName] = useState(currentEmployee.firstName || "");
  const [lastName, setLastName] = useState(currentEmployee.lastName || "");
  const [email, setEmail] = useState(currentEmployee.email || "");
  const [status, setStatus] = useState(currentEmployee.status || "");
  const [phoneNumber, setPhoneNumber] = useState(
    currentEmployee.phoneNumber || ""
  );
  const [proyectId, setProyectId] = useState(currentEmployee.proyectId || "");
  const [areaId, setAreaId] = useState(currentEmployee.areaId || "");
  const [position, setPosition] = useState(currentEmployee.position || "");
  const [fileValue, setFileValue] = useState("");
  const [filename, setFilename] = useState(currentEmployee.picturePath || "");

  const handleImageChange = (files) => {
    setFileValue(files[0]);
    setFilename(files[0].name);
  };

  const getProyects = async () => {
    const response = await fetch("http://localhost:3003/proyects", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setProyects({ proyects: data }));
  };

  const getAreas = async () => {
    const response = await fetch("http://localhost:3003/areas", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setAreas({ areas: data }));
  };

  useEffect(() => {
    getProyects();
    getAreas();
  }, []); // eslint-disable-line

  const createEmployee = async () => {
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);
    formData.append("status", status);
    formData.append("phoneNumber", phoneNumber);
    formData.append("nodeFatherId", fatherId);
    formData.append("proyectId", proyectId);
    formData.append("areaId", areaId);
    formData.append("position", position);
    formData.append("picture", fileValue);
    formData.append("picturePath", fileValue.name);

    const savedEmployeeResponse = await fetch(
      "http://localhost:3003/employees/createEmployee",
      {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      }
    );

    const savedEmployee = await savedEmployeeResponse.json();

    if (savedEmployee) {
      setShowModal(false);
      toast.success("Employee created!");
      getEmployeesData();
    }
  };

  const editEmployee = async () => {
    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName" ,lastName);
    formData.append("email", email);
    formData.append("status", status);
    formData.append("phoneNumber", phoneNumber);
    formData.append("proyectId", proyectId);
    formData.append("areaId", areaId);
    formData.append("position", position);
    formData.append("picture", fileValue);
    formData.append("picturePath", filename);

    const updatedEmployeeResponse = await fetch(
      `http://localhost:3003/employees/${currentEmployee._id}/editEmployee`, {
        method: "PATCH",
        headers: {Authorization: `Bearer ${token}`},
        body: formData,
      }
    );

    const updatedEmployee = await updatedEmployeeResponse.json();

    if (updatedEmployee) {
      setShowModal(false);
      toast.success("Employee updated!");
      getEmployeesData();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (operation === "Create") await createEmployee();
    if (operation === "Edit") await editEmployee();
  };

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
            <form onSubmit={handleSubmit}>
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
                <div className="mb-6">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    value={lastName}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Last Name"
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="prueba@prueba.com"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="">Select an status:</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <div className="mb-6">
                  <label htmlFor="phoneNumber">Phone Number</label>
                  <input
                    type="text"
                    id="phoneNumber"
                    value={phoneNumber}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="999999901"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Proyect
                  </label>
                  <select
                    value={proyectId}
                    onChange={(e) => setProyectId(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="">Select an status:</option>
                    {proyects.map((proyect) => (
                      <option key={proyect._id} value={proyect._id}>
                        {proyect.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Area
                  </label>
                  <select
                    value={areaId}
                    onChange={(e) => setAreaId(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="">Select an status:</option>
                    {areas.map((area) => (
                      <option key={area._id} value={area._id}>
                        {area.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-6">
                  <label htmlFor="position">Position</label>
                  <input
                    type="text"
                    id="position"
                    value={position}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="prueba@prueba.com"
                    onChange={(e) => setPosition(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-6">
                  <Dropzone
                    acceptedFiles=".jpg,.jpeg,.png"
                    multiple={false}
                    onDrop={(acceptedFiles) => handleImageChange(acceptedFiles)}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div
                        {...getRootProps()}
                        className="flex items-center justify-center w-full"
                      >
                        <input
                          {...getInputProps()}
                          type="file"
                          className="hidden"
                        />
                        <label className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg
                              aria-hidden="true"
                              className="w-10 h-10 mb-3 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                              ></path>
                            </svg>
                            {filename === "" ? (
                              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-semibold">
                                  Click to upload
                                </span>{" "}
                                or drag and drop
                              </p>
                            ) : (
                              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                {filename}
                              </p>
                            )}
                          </div>
                        </label>
                      </div>
                    )}
                  </Dropzone>
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
