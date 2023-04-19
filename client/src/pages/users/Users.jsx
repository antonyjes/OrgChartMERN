import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router";
import { setUsers } from "../../state";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Sidebar from "../../components/Sidebar";
import Aside from "../../components/Aside";

const Users = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector((state) => state.token);
    const users = useSelector((state) => state.users);
    const [currentPage, setCurrentPage] = useState(0);

    const getUsers = async () => {
        const response = await fetch("http://localhost:3003/users", {
            method: "GET",
            headers: {Authorization: `Bearer ${token}`}
        });
        const data = await response.json();
        dispatch(setUsers({users: data}));
    };

    const PER_PAGE = 10;
    const offset = currentPage * PER_PAGE;
    const pageCount = Math.ceil(users.length / PER_PAGE);

    const handlePageClick = ({selected: selectedPage }) => {
        setCurrentPage(selectedPage);
    }

    useEffect(() => {
        getUsers();
    }, []) // eslint-disable-line

    const usersToDisplay = users.slice(offset, offset + PER_PAGE).map((user) => (
        <tr key={user._id}>
            <td className="border px-4 py-2">{user.firstName}</td>
        <td className="border px-4 py-2">{user.lastName}</td>
        <td className="border px-4 py-2">{user.email}</td>
        <td className="border px-4 py-2">{user.role}</td>
        <td className="border px-4 py-2"><img className="w-16 h-16 mx-auto rounded-full object-cover" src={`http://localhost:3003/assets/users/${user.picturePath}`} alt={`${user.firstName} pict`} /></td>
        <td className="border px-4 py-2">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={() => navigate(`/editUser/${user._id}`)}>
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
                <h1 className="text-3xl font-bold mb-4">Teachers</h1>
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={() => navigate("/newTeacher")}>
                  New teacher
                </button>
              </div>
              <table className="table-auto">
                <thead>
                  <tr>
                    <th className="px-4 py-2">First Name</th>
                    <th className="px-4 py-2">Last Name</th>
                    <th className="px-4 py-2">Email</th>
                    <th className="px-4 py-2">Role</th>
                    <th className="px-4 py-2">Image User</th>
                    <th className="px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>{usersToDisplay}</tbody>
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
        </>
      );
}

export default Users;