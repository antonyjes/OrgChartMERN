import { useEffect, useState } from "react";
import Aside from "../../components/Aside";
import Sidebar from "../../components/Sidebar";
import { useSelector } from "react-redux";
import { OrganizationChart } from "primereact/organizationchart";
import "./styles/EmployeesOrg.css";
import ModalEmployee from "./ModalEmployee";

const EmployeesOrg = () => {
  const token = useSelector((state) => state.token);
  const [data, setData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [fatherId, setFatherId] = useState("");
  const [operation, setOperation] = useState("");
  const [currentEmployee, setCurrentEmployee] = useState([]);

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
        position: employee.position,
        employeeData: employee,
        children: [],
        depth: 1,
      };

      nodesById[employee._id] = node;
    }
    let root = null;
    // Then, add each employee node as a child of their manager's node
    for (const employee of data) {
      if (employee.nodeFatherId) {
        const managerNode = nodesById[employee.nodeFatherId];
        const employeeNode = nodesById[employee._id];
        employeeNode.depth = managerNode.depth + 1;
        managerNode.children.push(employeeNode);
      } else {
        // If an employee doesn't have a manager, add them as the root node
        const employeeNode = nodesById[employee._id];
        employeeNode.depth = 1;
        root = employeeNode;
      }
    }

    return [root];
  };

  const nodeTemplate = (node) => {
    return (
      <div className={`node-template depth-${node.depth}`}>
        <div className="node-header">{node.name}</div>
        <div className="node-body">
          <div>Email: {node.email}</div>
          <div>Position: {node.position}</div>
          <div>
            <button
              onClick={() => {
                setShowModal(true);
                setFatherId(node.employeeData._id);
                setOperation("Create");
              }}
            >
              Add child
            </button>
            <button
              onClick={() => {
                setShowModal(true);
                setOperation("Edit");
                setCurrentEmployee(node.employeeData);
              }}
            >
              Edit
            </button>
          </div>
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
      {showModal && (
        <ModalEmployee
          setShowModal={setShowModal}
          fatherId={fatherId}
          operation={operation}
          currentEmployee={currentEmployee}
          getEmployeesData={getEmployeesData}
        />
      )}
    </>
  );
};

export default EmployeesOrg;
