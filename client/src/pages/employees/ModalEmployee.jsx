import { useState } from "react";

const ModalEmployee = ({setShowModal, operation, fatherId, currentEmployee, getEmployees}) => {
    const [firstName, setFirstName] = useState(currentEmployee.firstName || "");
    const [lastName, setLastName] = useState(currentEmployee.lastName || "");
    const [email, setEmail] = useState(currentEmployee.email || "");
    const [status, setStatus] = useState(currentEmployee.status || "");
    const [phoneNumber, setPhoneNumber] = useState(currentEmployee.phoneNumber || "");

    return(
        <div>
            Modal
        </div>
    )
}

export default ModalEmployee;