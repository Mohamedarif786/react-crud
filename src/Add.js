import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function Add() {
  const [inputData, setInputData] = useState({ name: "", email: "" });
  const [errors, setErrors] = useState({ name: false, email: false });
  const navigate = useNavigate();

  const handleChange = useCallback(
    (field, value) => {
      setInputData((prevInputData) => ({ ...prevInputData, [field]: value }));

      // Real-time validation and error handling
      if (field === "name") {
        setErrors((prevErrors) => ({ ...prevErrors, name: !value.trim() }));
      } else if (field === "email") {
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        setErrors((prevErrors) => ({ ...prevErrors, email: !isValidEmail }));
      }
    },
    [] // No dependencies needed for handleChange
  );

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();

      // Validate inputs
      const newErrors = {
        name: !inputData.name.trim(),
        email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputData.email),
      };

      // Update errors
      setErrors(newErrors);

      // Display warning toast if errors exist
      if (newErrors.name || newErrors.email) {
        toast.warning("All fields are required");
      } else {
        // Make API call if no errors
        axios
          .post("http://localhost:3030/users", inputData)
          .then((res) => {
            toast.success("Data Added Successfully");
            setTimeout(() => navigate("/"), 2000);
          })
          .catch((err) => console.log(err));
      }
    },
    [inputData, navigate]
  );


  return (
    <>
     <ToastContainer />
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
      <div className="w-50 border bg-light p-5">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={inputData.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
            {errors.name && (
              <span className="text-danger">Name is required</span>
            )}
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={inputData.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
            {errors.email && (
              <span className="text-danger">Invalid email format</span>
            )}
          </div>
          <br />
          <button type="submit" className="btn btn-info">
            Submit
          </button>
        </form>
      </div>
    </div>
    </>
  );
}

export default Add;
