import { useEffect, useState } from "react";
import Aside from "../../components/Aside";
import Sidebar from "../../components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { OrganizationChart } from "primereact/organizationchart";
import "./styles/EmployeesOrg.css";
import { setEmployees } from "../../state";
import ModalEmployee from "./ModalEmployee";

const EmployeesOrg = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const employees = useSelector((state) => state.employees);
  const [showModal, setShowModal] = useState(false);
  const [operation, setOperation] = useState("");
  const [fatherId, setFatherId] = useState("");
  const [currentEmployee, setCurrentEmployee] = useState([]);

  const getEmployeesData = async () => {
    const response = await fetch("http://localhost:3003/employees", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });

    const dataEmployees = await response.json();
    dispatch(setEmployees({ employees: dataEmployees }));
  };

  const createTreeData = (data) => {
    const nodesById = {};

    // First, create a node for each employee and save it by ID
    for (const employee of data) {
      const node = {
        id: employee._id,
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
        status: employee.status,
        phoneNumber: employee.phoneNumber,
        proyectId: employee.proyectId,
        proyectName: employee.proyectName,
        areaId: employee.areaId,
        areaName: employee.areaName,
        position: employee.position,
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
          <div>Status: {node.status}</div>
        </div>
        <div className="flex flex-row">
          <ul>
            <li>
              <button
                onClick={() => {
                  setShowModal(true);
                  setOperation("Create");
                  setFatherId(node.id);
                }}
              >
                Add child
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setShowModal(true);
                  setOperation("Edit");
                  setCurrentEmployee(node);
                }}
              >
                Edit
              </button>
            </li>
            <li>
              <button>Delete</button>
            </li>
          </ul>
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
            {employees && (
              <OrganizationChart
                value={createTreeData(employees)}
                nodeTemplate={nodeTemplate}
              />
            )}
          </div>
        </div>
      </div>
      {showModal && (
        <ModalEmployee
          setShowModal={setShowModal}
          operation={operation}
          fatherId={fatherId}
          currentEmployee={currentEmployee}
          getEmployees={getEmployeesData}
        />
      )}
    </>
  );
};

export default EmployeesOrg;
