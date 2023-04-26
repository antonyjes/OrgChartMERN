import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import Areas from "./pages/areas/Areas";
import Users from "./pages/users/Users";
import NewUser from "./pages/users/NewUser";
import EditUser from "./pages/users/EditUser";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EmployeesOrg from "./pages/employees/EmployeesOrg";

function App() {
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/home"
            element={isAuth ? <HomePage /> : <Navigate to="/" />}
          />
          <Route
            path="/areas"
            element={isAuth ? <Areas /> : <Navigate to="/" />}
          />
          <Route
            path="/users"
            element={isAuth ? <Users /> : <Navigate to="/" />}
          />
          <Route
            path="/newUser"
            element={isAuth ? <NewUser /> : <Navigate to="/" />}
          />
          <Route
            path="/editUser/:userId"
            element={isAuth ? <EditUser /> : <Navigate to="/" />}
          />
          <Route
            path="/organigrama"
            element={isAuth ? <EmployeesOrg /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
