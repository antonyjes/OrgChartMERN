import { useEffect, useState } from "react";
import Aside from "../../components/Aside";
import Sidebar from "../../components/Sidebar";
import { useSelector } from "react-redux";
import { OrganizationChart } from "primereact/organizationchart";
import "./styles/EmployeesOrg.css";

const EmployeesOrg = () => {
  const token = useSelector((state) => state.token);
  const [data, setData] = useState(null);

  const getEmployeesData = async () => {
    const response = await fetch("http://localhost:3003/employees", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    const dataEmployees = await response.json();
    setData(dataEmployees);
  };

  const createTreeData = (data) => {
    const nodesById = {};

    // First, create a node for each employee and save it by ID
    for (const employee of data) {
      const node = {
        name: `${employee.firstName} ${employee.lastName}`,
        email: employee.email,
        status: employee.status,
        children: [],
      };

      nodesById[employee._id] = node;
    }

    // Then, add each employee node as a child of their manager's node
    for (const employee of data) {
      if (employee.nodeFatherId) {
        const managerNode = nodesById[employee.nodeFatherId];
        const employeeNode = nodesById[employee._id];
        managerNode.children.push(employeeNode);
      }
    }

    // Find the employee without a manager and use them as the root node
    let root = null;
    for (const employee of data) {
      if (!employee.nodeFatherId) {
        root = nodesById[employee._id];
        break;
      }
    }

    return [root];
  };

  const nodeTemplate = (node) => {
    return (
      <div className="node-template">
        <div className="node-header">{node.name}</div>
        <div className="node-body">
          <div>Email: {node.email}</div>
          <div>Status: {node.status}</div>
        </div>
      </div>
    );
  };

  useEffect(() => {
    getEmployeesData();
  }, []); // eslint-disable-line

  return (
    <>
      <Sidebar />
      <Aside />
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <div id="treeWrapper" style={{ width: "50em", height: "20em" }}>
            {data && (
              <OrganizationChart
                value={createTreeData(data)}
                nodeTemplate={nodeTemplate}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeesOrg;
