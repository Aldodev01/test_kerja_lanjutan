import React, { useState, useEffect } from "react";

const Address = ({ data, dataDetail, inputOpen }) => {
  const { employeeData, setEmployeeData } = data;
  const { viewInput, setViewinput } = inputOpen;
  console.log(
    employeeData[viewInput.index]?.address,
    viewInput.index,
    employeeData[viewInput.index],
    "test"
  );
  const { dataPickerAddress, setDataPickerAddress } = dataDetail;
  const [isSubmit, setIsSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [addressRequired, setAddressRequired] = useState(dataPickerAddress);

  function handleInputRequired(e) {
    setAddressRequired((prev) => ({
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
    await setFormErrors(handleValidation(addressRequired));
    await setIsSubmit(true);
    return;
  };

  /**
   * handleValidation function for check reqruitment input data
   * @param {handleValidaiton} function - sync
   */
  const handleValidation = (values) => {
    const errors = {};
    if (values.address === "") {
      errors.address = "Address is Required!";
    } else if (values.address.length >= 255) {
      errors.address = "Address cannot exceed 255 characters";
    }
    if (values.city === "") {
      errors.city = "City is Required!";
    } else if (values.city.length >= 100) {
      errors.city = "City cannot exceed 100 characters";
    }
    if (values.province === "") {
      errors.province = "Province is Required!";
    }
    if (values.zipcode === "") {
      errors.zipcode = "Zipcode Number is Required!";
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
            newData[viewInput.index].address[viewInput.indexDetail] =
              addressRequired;

            return newData;
          });
          alert("berhasil mengedit data");
        } else {
          setEmployeeData((prev) => {
            const newData = [...prev];
            newData[viewInput.index].address.push(addressRequired);

            return newData;
          });
          alert("berhasil menambahkan data");
        }
        setViewinput((prev) => ({ ...prev, address: false }));
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
          htmlFor="address"
          className="w-full max-w-[100px] text-base text-zinc-800"
        >
          Address
        </label>
        <p>:</p>
        <textarea
          id="address"
          className="outline-none border-black border-b-[.5px] b w-full max-w-[350px] px-[10px] py-[5px]"
          name="address"
          placeholder="Address"
          value={addressRequired.address}
          onChange={handleInputRequired}
          required
          max={255}
          type="name"
        />
        <p className="text-xs text-pink-400">{formErrors?.address}</p>
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
          id="city"
          className="outline-none border-black border-b-[.5px] b w-full max-w-[350px] px-[10px] py-[5px]"
          name="city"
          value={addressRequired.city}
          onChange={handleInputRequired}
          placeholder="City"
          required
          max={25}
          type="city"
        />
        <p className="text-xs text-pink-400">{formErrors?.city}</p>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <label
          htmlFor="province"
          className="w-full max-w-[100px] text-base text-zinc-800"
        >
          Province
        </label>
        <p>:</p>
        <input
          id="province"
          className="outline-none border-black border-b-[.5px] b w-full max-w-[350px] px-[10px] py-[5px]"
          name="province"
          value={addressRequired.province}
          onChange={handleInputRequired}
          placeholder="Province"
          required
          type="province"
        />
        <p className="text-xs text-pink-400">{formErrors?.province}</p>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <label
          htmlFor="zipcode"
          className="w-full max-w-[100px] text-base text-zinc-800"
        >
          zipcode
        </label>
        <p>:</p>
        <input
          id="zipcode"
          className="outline-none border-black border-b-[.5px] b w-full max-w-[350px] px-[10px] py-[5px]"
          name="zipcode"
          value={addressRequired.zipcode}
          onChange={handleInputRequired}
          placeholder="Zipcode"
          required
          type="text"
        />
        <p className="text-xs text-pink-400">{formErrors?.zipcode}</p>
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

export default Address;
