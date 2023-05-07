import { useEffect, useState } from "react";
import Aside from "../../components/Aside";
import Sidebar from "../../components/Sidebar";
import { useSelector } from "react-redux";
import { OrganizationChart } from "primereact/organizationchart";
import "./styles/EmployeesOrg.css";
import ModalEmployee from "./ModalEmployee";
import { toast } from "react-toastify";
import {Tooltip} from "react-tooltip";
import NodeTooltip from "./NodeTooltip";
import 'react-tooltip/dist/react-tooltip.css'

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

  const handleDelete = async (employeeId) => {
    const response = await fetch(
      `http://localhost:3003/employees/${employeeId}/delete`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response);
    toast.success("Employee deleted!");
    getEmployeesData();
  };

  const nodeTemplate = (node) => {
    return (
      <div className={`node-template depth-${node.depth}`} data-tooltip-id={`node-${node.employeeData._id}`}>
        <div className="node-header text-xl">{node.name}</div>
        <div className="node-body mt-2">
          <div className="text-sm mb-1">Email: {node.email}</div>
          <div className="text-sm mb-1">Position: {node.position}</div>
          <div className="flex gap-1 flex-row justify-center">
            <button
              className="px-2 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              onClick={() => {
                setShowModal(true);
                setFatherId(node.employeeData._id);
                setOperation("Create");
              }}
            >
              Add
            </button>
            <button
              className="px-2 py-1 rounded bg-yellow-500 text-white hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
              onClick={() => {
                setShowModal(true);
                setOperation("Edit");
                setCurrentEmployee(node.employeeData);
              }}
            >
              Edit
            </button>
            {node.depth !== 1 && (
              <button
                className="px-2 py-1 rounded bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                onClick={() => handleDelete(node.employeeData._id)}
              >
                Delete
              </button>
            )}
          </div>
        </div>
        <Tooltip id={`node-${node.employeeData._id}`} place="right" effect="solid">
          <NodeTooltip node={node}/>
        </Tooltip>
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
        <div
          className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14"
          style={{ height: "calc(100vh - 24rem)" }}
        >
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
