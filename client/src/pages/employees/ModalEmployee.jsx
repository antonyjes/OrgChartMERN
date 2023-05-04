import { useState } from "react";

const ModalEmployee = ({ setShowModal, fatherId }) => {
  return (
    <div>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-non">
        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-white rounded-lg shadow-lg w-96">
            <div className="bg-gray-800 text-white py-4 px-6 rounded-t-lg flex justify-between items-center">
              <h2 className="text-lg font-bold">MODAL</h2>
              <div>
                <h1>Father ID: {fatherId}</h1>
              </div>
              <button
                className="text-white hover:text-gray-400 transition duration-150"
                onClick={() => setShowModal(false)}
              >
                X
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalEmployee;
