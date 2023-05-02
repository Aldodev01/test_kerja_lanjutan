import { useState, useEffect } from "react";

import "./App.css";
import Employee from "./components/Employee";
import Address from "./components/Address";

function App() {
  const [employeeData, setEmployeeData] = useState([]);
  const [employeeDataAddress, setEmployeeDataAddress] = useState([]);
  const [dataPicker, setDataPicker] = useState({
    firstname: "",
    lastname: "",
    email: "",
    position: "",
    joinDate: "",
    phone: "",
    address: [],
  });

  const [dataPickerAddress, setDataPickerAddress] = useState({
    address: "",
    city: "",
    province: "",
    zipcode: "",
  });

  const [viewInput, setViewinput] = useState({
    employee: false,
    view: false,
    address: false,
    edit: false,
    index: 0,
    indexDetail: 0,
    loading: false,
    loading2: false,
  });
  console.log(employeeData);

  function handleViewInput(view, i) {
    setViewinput((prev) => ({ ...prev, [view]: !prev[view], index: i }));
  }
  function handleViewInputAddress(view) {
    setViewinput((prev) => ({ ...prev, [view]: !prev[view] }));
  }

  function handleUpdate(e, i) {
    setViewinput((prev) => ({ ...prev, employee: true, edit: true, index: i }));
    setDataPicker(e);
  }

  function handleDelete(e, i) {
    setViewinput((prev) => ({ ...prev, loading: true }));

    setTimeout(() => {
      setEmployeeData((prev) => {
        const newData = [...prev];
        newData.splice(i, 1);

        return newData;
      });
      setViewinput((prev) => ({ ...prev, loading: false }));

      alert("berhasil menghapus data");
    }, 1000);
  }

  function handleUpdateAddress(e, i) {
    setViewinput((prev) => ({
      ...prev,
      address: true,
      edit: true,
      indexDetail: i,
    }));
    setDataPickerAddress(e);
  }
  function handleDeleteAddress(e, i) {
    setViewinput((prev) => ({ ...prev, loading2: true }));

    setTimeout(() => {
      setEmployeeData((prev) => {
        const newData = [...prev];
        newData[i].address.splice(i, 1);

        return newData;
      });
      setViewinput((prev) => ({ ...prev, loading2: false }));

      alert("berhasil menghapus data");
    }, 1000);
  }

  return (
    <div className="w-screen h-full min-h-screen flex flex-col">
      {/* Input Employee */}
      {viewInput.employee && (
        <Employee
          data={{ employeeData, setEmployeeData }}
          dataDetail={{ dataPicker, setDataPicker }}
          inputOpen={{ viewInput, setViewinput }}
        />
      )}

      {/* Employee Table */}
      <section className="w-full h-full py-1 bg-gray-50">
        <div className="w-full xl:w-10/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-base text-blueGray-700">
                    Employee List Page
                  </h3>
                </div>
                <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                  <button
                    onClick={() => handleViewInput("employee")}
                    className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                  >
                    {viewInput.employee ? "- Close" : "+ New"}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex w-full overflow-x-auto">
              <table className="items-center bg-transparent w-full border-collapse">
                <thead>
                  <tr>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      No
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Name
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Email
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Position
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {employeeData?.map((e, i) => {
                    return (
                      <tr key={i}>
                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
                          {i + 1}
                        </th>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {e?.firstname + e?.lastname}
                        </td>
                        <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          {e?.email}
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          <i className="fas fa-arrow-up text-emerald-500 mr-4"></i>
                          {e?.position}
                        </td>
                        <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          <button
                            className="bg-green-500 text-white active:bg-green-700 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => handleViewInput("view", i)}
                          >
                            View
                          </button>
                          <button
                            className="bg-indigo-500 text-white active:bg-indigo-700 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => handleUpdate(e, i)}
                          >
                            Update
                          </button>
                          <button
                            className="bg-pink-500 text-white active:bg-pink-700 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => handleDelete(e, i)}
                          >
                            {viewInput.loading ? "Processing" : "Delete"}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Employee Address Table */}
      <br />
      {viewInput.address && (
        <Address
          data={{ employeeData, setEmployeeData }}
          dataDetail={{ dataPickerAddress, setDataPickerAddress }}
          inputOpen={{ viewInput, setViewinput }}
        />
      )}

      {viewInput.view && (
        <section className="w-full h-full py-1 bg-gray-50">
          <div className="w-full xl:w-10/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
              <div className="rounded-t mb-0 px-4 py-3 border-0">
                <div className="flex flex-wrap items-center">
                  <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                    <h3 className="font-semibold text-base text-blueGray-700">
                      Employee Detail Page
                    </h3>
                  </div>
                  <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                    <button
                      onClick={() => handleViewInputAddress("address")}
                      className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                    >
                      {viewInput.address ? "- Close" : "+ New"}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex w-full overflow-x-auto">
                <table className="items-center bg-transparent w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        No
                      </th>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Address
                      </th>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        City
                      </th>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Province
                      </th>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Zipcode
                      </th>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {employeeData[viewInput.index]?.address.map((e, i) => {
                      return (
                        <tr key={i}>
                          <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
                            {i + 1}
                          </th>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {e?.address}
                          </td>
                          <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {e?.city}
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            <i className="fas fa-arrow-up text-emerald-500 mr-4"></i>
                            {e?.province}
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            <i className="fas fa-arrow-up text-emerald-500 mr-4"></i>
                            {e?.zipcode}
                          </td>
                          <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            <button
                              className="bg-indigo-500 text-white active:bg-indigo-700 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                              type="button"
                              onClick={() => handleUpdateAddress(e, i)}
                            >
                              Update
                            </button>
                            <button
                              className="bg-pink-500 text-white active:bg-pink-700 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                              type="button"
                              onClick={() => handleDeleteAddress(e, i)}
                            >
                              {viewInput.loading2 ? "Processing" : "Delete"}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default App;
