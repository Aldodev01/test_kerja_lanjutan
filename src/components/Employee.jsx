import React, { useState, useEffect } from "react";

const Employee = ({ data, dataDetail, inputOpen }) => {
  const { employeeData, setEmployeeData } = data;
  const { viewInput, setViewinput } = inputOpen;
  const { dataPicker, setDataPicker } = dataDetail;
  const [isSubmit, setIsSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [employeeRequired, setEmployeeRequired] = useState(dataPicker);

  const ValidationForm = (regx, value) => {
    if (regx.test(value)) {
      return true;
    } else {
      return false;
    }
  };

  function handleInputRequired(e) {
    setEmployeeRequired((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  /**
   * handleSubmit function for sending data
   * @param {handleSubmit} function - async
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    await setFormErrors(handleValidation(employeeRequired));
    await setIsSubmit(true);
    return;
  };

  /**
   * handleValidation function for check reqruitment input data
   * @param {handleValidaiton} function - sync
   */
  const handleValidation = (values) => {
    const errors = {};
    if (values.firstname === "") {
      errors.firstname = "Firstname is Required!";
    } else if (values.firstname.length >= 25) {
      errors.firstname = "First name cannot exceed 25 characters";
    }
    if (values.lastname === "") {
      errors.lastname = "Lastname is Required!";
    } else if (values.lastname.length >= 25) {
      errors.lastname = "Last name cannot exceed 25 characters";
    }
    if (values.email === "") {
      errors.email = "Email is Required!";
    } else if (
      ValidationForm(
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        values.email
      ) === false
    ) {
      errors.email = "Enter the correct email e.g. e***@g****.com";
    }
    if (values.position === "") {
      errors.position = "Position Number is Required!";
    }
    if (values.phone === "") {
      errors.phone = "Phone Number is Required!";
    }
    if (values.joinDate == "") {
      errors.joinDate = "Date of Birth is Required!";
    }

    return errors;
  };

  /**
   * UseEffect Worker
   * @param {useEffect} hook - useEffect
   */
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      setLoading(true);
      setTimeout(() => {
        if (viewInput.edit) {
          setEmployeeData((prev) => {
            const newData = [...prev];
            newData[viewInput.index] = employeeRequired;

            return newData;
          });
          alert("berhasil mengedit data");
        } else {
          setEmployeeData((prev) => [...prev, employeeRequired]);
          alert("berhasil menambahkan data");
        }
        setViewinput((prev) => ({ ...prev, employee: false }));
        setLoading(false);
      }, 2000);
    }

    return () => {};
  }, [formErrors, isSubmit]);
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full xl:w-10/12 mb-12 xl:mb-0 px-4 mx-auto mt-24"
    >
      <div className="flex flex-wrap items-center gap-4">
        <label
          htmlFor="firstname"
          className="w-full max-w-[100px] text-base text-zinc-800"
        >
          First Name
        </label>
        <p>:</p>
        <input
          id="firstname"
          className="outline-none border-black border-b-[.5px] b w-full max-w-[350px] px-[10px] py-[5px]"
          name="firstname"
          placeholder="First Name"
          value={employeeRequired.firstname}
          onChange={handleInputRequired}
          required
          max={25}
          type="name"
        />
        <p className="text-xs text-pink-400">{formErrors?.firstname}</p>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <label
          htmlFor="firstname"
          className="w-full max-w-[100px] text-base text-zinc-800"
        >
          Last Name
        </label>
        <p>:</p>
        <input
          id="lastname"
          className="outline-none border-black border-b-[.5px] b w-full max-w-[350px] px-[10px] py-[5px]"
          name="lastname"
          value={employeeRequired.lastname}
          onChange={handleInputRequired}
          placeholder="Last Name"
          required
          max={25}
          type="name"
        />
        <p className="text-xs text-pink-400">{formErrors?.lastname}</p>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <label
          htmlFor="email"
          className="w-full max-w-[100px] text-base text-zinc-800"
        >
          Email
        </label>
        <p>:</p>
        <input
          id="email"
          className="outline-none border-black border-b-[.5px] b w-full max-w-[350px] px-[10px] py-[5px]"
          name="email"
          value={employeeRequired.email}
          onChange={handleInputRequired}
          placeholder="Email"
          required
          type="email"
        />
        <p className="text-xs text-pink-400">{formErrors?.email}</p>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <label
          htmlFor="position"
          className="w-full max-w-[100px] text-base text-zinc-800"
        >
          Position
        </label>
        <p>:</p>
        <input
          id="position"
          className="outline-none border-black border-b-[.5px] b w-full max-w-[350px] px-[10px] py-[5px]"
          name="position"
          value={employeeRequired.position}
          onChange={handleInputRequired}
          placeholder="Position"
          required
          type="text"
        />
        <p className="text-xs text-pink-400">{formErrors?.position}</p>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <label
          htmlFor="date"
          className="w-full max-w-[100px] text-base text-zinc-800"
        >
          Join Date
        </label>
        <p>:</p>
        <input
          id="joinDate"
          className="outline-none border-black border-b-[.5px] b w-full max-w-[350px] px-[10px] py-[5px]"
          name="joinDate"
          value={employeeRequired.joinDate}
          onChange={handleInputRequired}
          placeholder="Join Date"
          required
          type="date"
        />
        <p className="text-xs text-pink-400">{formErrors?.joinDate}</p>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <label
          htmlFor="phone"
          className="w-full max-w-[100px] text-base text-zinc-800"
        >
          Phone
        </label>
        <p>:</p>
        <input
          id="phone"
          className="outline-none border-black border-b-[.5px] b w-full max-w-[350px] px-[10px] py-[5px]"
          name="phone"
          value={employeeRequired.phone}
          onChange={handleInputRequired}
          placeholder="Phone"
          required
          type="tel"
        />
        <p className="text-xs text-pink-400">{formErrors?.phone}</p>
      </div>
      <br />
      <button
        onClick={handleSubmit}
        className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        disabled={loading}
      >
        {loading ? "Processing" : "Save"}
      </button>
    </form>
  );
};

export default Employee;
