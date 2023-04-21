import { useEffect, useState } from "react";
import Aside from "../../components/Aside";
import Sidebar from "../../components/Sidebar";
import OrgChart from "./OrgChart";
import { useSelector } from "react-redux";

const EmployeesOrg = () => {
    const token = useSelector((state) => state.token);
    const [data, setData] = useState(null);

    const getEmployeesData = async () => {
        const response = await fetch("http://localhost:3003/employees/org", {
            method: "GET",
            headers: {Authorization: `Bearer ${token}`}
        });

        const dataEmployees = await response.json();
        setData(dataEmployees);
    }

    useEffect(() => {
        getEmployeesData();
    }, []) // eslint-disable-line

    return(
        <>
            <Sidebar />
            <Aside />
            <OrgChart data={data}/>
        </>
    )
}

export default EmployeesOrg;