import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import Aside from "../../components/Aside";
import FormEdit from "./FormEdit";

const EditUser = () => {
  const token = useSelector((state) => state.token);
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);

  const getUser = async (req, res) => {
    const response = await fetch(`http://localhost:3003/users/${userId}/user`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();
    setUserData(data);
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line

  if (!userData) return null;

  return (
    <>
      <Sidebar />
      <Aside />
      <FormEdit userData={userData} setUserData={setUserData} />
    </>
  );
};

export default EditUser;
