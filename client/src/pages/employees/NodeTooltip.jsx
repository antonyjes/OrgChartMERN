import "./styles/EmployeesOrg.css";

const NodeTooltip = ({ node }) => {
    return (
      <div className="flex items-center">
        <div className="flex-shrink-0 mr-4">
          <img
            src={`http://localhost:3003/assets/employees/${node.employeeData.picturePath}`}
            alt={`${node.employeeData.firstName}-pic`}
            className="w-24 h-24 rounded-lg object-cover"
          />
        </div>
        <div>
          <div className="mb-2">Area: {node.employeeData.areaName}</div>
          <div className="mb-2">Status: {node.employeeData.status}</div>
          <div className="mb-2">Email: {node.employeeData.email}</div>
          <div className="mb-2">Project: {node.employeeData.proyectName}</div>
        </div>
      </div>
    );
  };
  
  export default NodeTooltip;