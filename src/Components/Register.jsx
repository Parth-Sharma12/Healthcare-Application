import React, { useState } from "react";
import "../CSS/Register.css";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaPhone, FaPagelines, FaNotesMedical, FaDollarSign, FaPlus} from "react-icons/fa";
import { MdEmail} from "react-icons/md";
import { GrLicense } from "react-icons/gr";
import ErrorModal from "../Modals/ErrorModal";
import axios from "axios";
export default function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [doctorDetails, setDoctorDetails] = useState({
    email: "",
    password: "",
    firstName: "",
    middleName: "",
    lastName: "",
    age: null,
    gender: "",
    mobileNo: "",
    licenceNo: "",
    description: "",
    consultationFee: null,
    experience: null,
    isSenior: false,
    isDisabled: false,
  });
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue =
      type === "checkbox" || type === "radio" ? checked : value;
    setDoctorDetails({ ...doctorDetails, [name]: inputValue });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://192.168.0.109:8082/api/doctor/register",
        doctorDetails
      );
      console.log(response.data);
      console.log(response.status);
      if (response.status === 200) {
        window.localStorage.setItem("authToken", response.data.accessToken);
        navigate("/DoctorHome");
      }
    } catch (error) {
      if (error.response.status === 409) {
        console.log(error.response.status);
        setError({ title: "Error", message: " Email already exist." });
      } else {
        console.error("Error posting data:", error);
      }
    }
  };
  const closeModal = () => {
    setError(null);
  };
  return (
    <div className="wrapper-register-main">
      <div className="wrapper-register">
        <h1 className="h1">Start Transforming Today!!</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="First Name"
                name="firstName"
                value={doctorDetails.firstName}
                onChange={handleChange}
                required
              />
              <FaUser className="icon-register"/>
            </div>
            <div className="form-group col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Middle Name"
                name="middleName"
                value={doctorDetails.middleName}
                onChange={handleChange}
                required
              />
              <FaUser className="icon-register"/>
            </div>
            <div className="form-group col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Last Name"
                name="lastName"
                value={doctorDetails.lastName}
                onChange={handleChange}
                required
              />
              <FaUser className="icon-register"/>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                name="email"
                value={doctorDetails.email}
                onChange={handleChange}
                required
              />
              <MdEmail className="icon-register"/>
            </div>
            <div className="form-group col-md-6">
              <input
                type="tel"
                className="form-control"
                placeholder="Mobile No."
                name="mobileNo"
                value={doctorDetails.mobileNo}
                onChange={handleChange}
                required
              />
              <FaPhone className="icon-register"/>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-4">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name="password"
                value={doctorDetails.password}
                onChange={handleChange}
                required
              />
              <FaLock className="icon-register"/>
            </div>
            <div className="form-group col-md-4">
              <input
                type="number"
                className="form-control"
                placeholder="Age"
                name="age"
                value={doctorDetails.age}
                onChange={handleChange}
                required
              />
              <FaPagelines className="icon-register"/>
            </div>
            <div className="form-group col-md-4 input-box-register">
              <input
                type="text"
                className="form-control"
                placeholder="Licence Number"
                name="licenceNo"
                value={doctorDetails.licenceNo}
                onChange={handleChange}
              />
              <GrLicense className="icon-register"/>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-12">
              <textarea
                className="form-control"
                rows="3"
                placeholder="Description"
                name="description"
                value={doctorDetails.description}
                onChange={handleChange}
                required
              ></textarea>
              <FaNotesMedical className="icon-register"/>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Consultation Fee"
                name="consultationFee"
                value={doctorDetails.consultationFee}
                onChange={handleChange}
                required
              />
              <FaDollarSign className="icon-register-disturbed"/>
            </div>
            <div className="form-group col-md-4">
              <input
                type="number"
                className="form-control"
                placeholder="Experience"
                name="experience"
                value={doctorDetails.experience}
                onChange={handleChange}
                required
              />
              <FaPlus className="icon-register-disturbed"/>
            </div>
            <div className="form-group col-md-4">
              <select
                className="form-select"
                aria-label="Default select example"
                name="gender"
                value={doctorDetails.gender}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Choose
                </option>
                <option value="1">Male</option>
                <option value="2">Female</option>
                <option value="3">Others</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <div className="form-check">
            <label
                className="form-check-label"
                htmlFor="applySeniorDoctorCheck"
              >
              <input
                type="checkbox"
                className="form-check-input"
                id="applySeniorDoctorCheck"
                name="isSenior"
                checked={doctorDetails.isSenior}
                onChange={handleChange}
              />
              Applying as Senior Doctor
            </label>
            </div>
          </div>
          <button type="submit" className="btn-design">
            Register
          </button>
          {error && (
            <ErrorModal
              title={error.title}
              message={error.message}
              onClose={closeModal}
            />
          )}
        </form>
      </div>
      </div>
  );
}
