import { useEffect, useState } from "react";
import Aside from "../../components/Aside";
import Sidebar from "../../components/Sidebar";
import { useSelector } from "react-redux";
import Tree from "react-d3-tree";

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
    const root = {
      name: "CEO",
      attributes: { status: "CEO" },
      children: [],
    };

    const nodesById = {};

    // First, create a node for each employee and save it by ID
    for (const employee of data) {
      const node = {
        name: `${employee.firstName} ${employee.lastName}`,
        attributes: {
          email: employee.email,
          status: employee.status,
        },
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
      } else {
        // If an employee doesn't have a manager, add them as a child of the root node
        const employeeNode = nodesById[employee._id];
        root.children.push(employeeNode);
      }
    }
    console.log(root);
    return root;
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
          <div id="treeWrapper" style={{ width: '50em', height: '20em' }}>
            {data && (
              <Tree
                data={createTreeData(data)}
                orientation="vertical"
                translate={{ x: 200, y: 200 }}
                nodeSize={{ x: 200, y: 200 }}
                collapsible={false}
                separation={{ siblings: 1, nonSiblings: 1 }}
                renderCustomNodeElement={(rd3tProps) => (
                  <div>
                    <p>
                      {rd3tProps.nodeDatum.firstName}{" "}
                      {rd3tProps.nodeDatum.lastName}
                    </p>
                    <p>{rd3tProps.nodeDatum.email}</p>
                  </div>
                )}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeesOrg;
