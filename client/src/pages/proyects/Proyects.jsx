import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProyects } from "../../state";
import ReactPaginate from "react-paginate";
import Sidebar from "../../components/Sidebar";
import Aside from "../../components/Aside";
import ModalProyects from "./ModalProyect";

const Proyects = () => {
  const dispatch = useDispatch();
  const proyects = useSelector((state) => state.proyects);
  const token = useSelector((state) => state.token);
  const [currentPage, setCurrentPage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [operation, setOperation] = useState("");
  const [currentProyect, setCurrentProyect] = useState([]);

  const getProyects = async () => {
    const response = await fetch("http://localhost:3003/proyects", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setProyects({ proyects: data }));
  };

  const PER_PAGE = 10;
  const offset = currentPage * PER_PAGE;
  const pageCount = Math.ceil(proyects.length / PER_PAGE);

  const handlePageClick = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
  };

  useEffect(() => {
    getProyects();
  }, []); //eslint-disable-line

  const proyectToDisplay = proyects
    .slice(offset, offset + PER_PAGE)
    .map((proyect) => (
      <tr key={proyect._id}>
        <td className="border px-4 py-2">{proyect.name}</td>
        <td className="border px-4 py-2">{proyect.description}</td>
        <td className="border px-4 py-2">{proyect.status}</td>
        <td className="border px-4 py-2">{proyect.dateInit}</td>
        <td className="border px-4 py-2">{proyect.dateEnd}</td>
        <td className="border px-4 py-2">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            onClick={() => {
              setShowModal(true);
              setOperation("Edit");
              setCurrentProyect(proyect);
            }}
          >
            Edit
          </button>
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Delete
          </button>
        </td>
      </tr>
    ));

  return (
    <>
      <Sidebar />
      <Aside />
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <div className="flex flex-row justify-between mb-4">
            <h1 className="text-3xl font-bold mb-4">Proyects</h1>
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
              onClick={() => {
                setShowModal(true);
                setOperation("Create");
              }}
            >
              New proyect
            </button>
          </div>
          <table className="table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Description</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">DateInit</th>
                <th className="px-4 py-2">DateEnd</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>{proyectToDisplay}</tbody>
          </table>
          <div className="flex justify-center mt-4">
            <ReactPaginate
              previousLabel={"← Previous"}
              nextLabel={"Next →"}
              pageCount={pageCount}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              previousLinkClassName={"previous_page"}
              nextLinkClassName={"next_page"}
              disabledClassName={"pagination__link--disabled"}
              activeClassName={"pagination__link--active"}
            />
          </div>
        </div>
      </div>
      {showModal && (
        <ModalProyects
          setShowModal={setShowModal}
          operation={operation}
          currentProyect={currentProyect}
          getProyects={getProyects}
        />
      )}
    </>
  );
};

export default Proyects;
