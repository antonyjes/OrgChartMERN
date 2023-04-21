import Employee from "../models/Employee.js";

// READ
export const getEmployeesOrg = async (req, res) => {
  try {
    const employees = await Employee.find();

    const chartData = {
      name: "CEO",
      children: [],
    };

    employees.forEach((employee) => {
      const employeeData = {
        name: `${employee.firstName} ${employee.lastName}`,
        children: [],
      };

      if (employee.nodeFatherId === null) {
        chartData.children.push(employeeData);
      } else {
        const parentNode = findNode(chartData, employee.nodeFatherId);
        parentNode.children.push(employeeData);
      }
    });

    function findNode(node, id) {
      if (node._id === id) {
        return node;
      }

      for (let i = 0; i < node.children.length; i++) {
        const foundNode = findNode(node.children[i], id);
        if (foundNode) {
          return foundNode;
        }
      }

      return null;
    }

    res.status(200).json(chartData);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
