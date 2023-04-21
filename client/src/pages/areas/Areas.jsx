import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAreas } from "../../state";
import Aside from "../../components/Aside";
import Sidebar from "../../components/Sidebar";
import ReactPaginate from "react-paginate";
import ModalAreas from "./ModalAreas";
import {toast} from "react-toastify";

const Areas = () => {
  const dispatch = useDispatch();
  const areas = useSelector((state) => state.areas);
  const token = useSelector((state) => state.token);
  const [currentPage, setCurrentPage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [operation, setOperation] = useState("");
  const [currentArea, setCurrentArea] = useState([]);

  const getAreas = async () => {
    const response = await fetch("http://localhost:3003/areas", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setAreas({ areas: data }));
  };

  const PER_PAGE = 10;
  const offset = currentPage * PER_PAGE;
  const pageCount = Math.ceil(areas.length / PER_PAGE);

  const handlePageClick = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
  };

  const handleDelete = async ( userId ) => {
    const response = await fetch(
      `http://localhost:3003/areas/${userId}/delete`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
      }
    );
    console.log(response);
    toast.success("Area deleted!");
    getAreas();
  };

  useEffect(() => {
    getAreas();
  }, []); //eslint-disable-line

  const areasToDisplay = areas.slice(offset, offset + PER_PAGE).map((area) => (
    <tr key={area._id}>
      <td className="border px-4 py-2">{area.name}</td>
      <td className="border px-4 py-2">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          onClick={() => {
            setShowModal(true);
            setOperation("Edit");
            setCurrentArea(area);
          }}
        >
          Edit
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleDelete(area._id)}
        >
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
            <h1 className="text-3xl font-bold mb-4">Areas</h1>
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
              onClick={() => {
                setShowModal(true);
                setOperation("Create");
              }}
            >
              New area
            </button>
          </div>
          <table className="table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>{areasToDisplay}</tbody>
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
        <ModalAreas
          setShowModal={setShowModal}
          operation={operation}
          currentArea={currentArea}
          getAreas={getAreas}
        />
      )}
    </>
  );
};

export default Areas;
