import React, { useState, useEffect } from "react";
import "../CSS/Register.css";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaPhone, FaPagelines, FaNotesMedical, FaDollarSign, FaPlus } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { GrLicense } from "react-icons/gr";
import ErrorModal from "../Modals/ErrorModal";
import axios from "axios";
import { useTranslation } from 'react-i18next';
export default function Register() {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const { t, i18n } = useTranslation();
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

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('selectedLanguage', lng);
  };

  const handleLanguageChange = (lng) => {
    setSelectedLanguage(lng);
    changeLanguage(lng);
  };

  useEffect(() => {
    const selectedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    changeLanguage(selectedLanguage);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://9e50-119-161-98-68.ngrok-free.app/api/doctor/register",
        doctorDetails
      );
      console.log(response.data);
      console.log(response.status);
      if (response.status === 200) {
        const authToken = {
          accessToken: response.data.accessToken,
          tokenType: response.data.tokenType,
          userId: response.data.userId
        };
        window.localStorage.setItem("authToken", JSON.stringify(authToken));
        navigate("/home");
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
      <div className="language-selection">
        <label>
          <input type="radio" value="hi" onChange={() => handleLanguageChange('hi')} checked={selectedLanguage === 'hi'} />
          Hindi
        </label>
        <label>
          <input type="radio" value="en" onChange={() => handleLanguageChange('en')} checked={selectedLanguage === 'en'} />
          English
        </label>
        <label>
          <input type="radio" value="ka" onChange={() => handleLanguageChange('ka')} checked={selectedLanguage === 'ka'} />
          Kannada
        </label>
      </div>
      <div className="wrapper-register">
        <h1 className="h1">{t('registerPage.title')}</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder={t('registerPage.firstName')}
                name="firstName"
                value={doctorDetails.firstName}
                onChange={handleChange}
                required
              />
              <FaUser className="icon-register" />
            </div>
            <div className="form-group col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder={t('registerPage.middleName')}
                name="middleName"
                value={doctorDetails.middleName}
                onChange={handleChange}
                required
              />
              <FaUser className="icon-register" />
            </div>
            <div className="form-group col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder={t('registerPage.lastName')}
                name="lastName"
                value={doctorDetails.lastName}
                onChange={handleChange}
                required
              />
              <FaUser className="icon-register" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <input
                type="email"
                className="form-control"
                placeholder={t('registerPage.email')}
                name="email"
                value={doctorDetails.email}
                onChange={handleChange}
                required
              />
              <MdEmail className="icon-register" />
            </div>
            <div className="form-group col-md-6">
              <input
                type="tel"
                className="form-control"
                placeholder={t('registerPage.mobileNo')}
                name="mobileNo"
                value={doctorDetails.mobileNo}
                onChange={handleChange}
                required
              />
              <FaPhone className="icon-register" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-4">
              <input
                type="password"
                className="form-control"
                placeholder={t('registerPage.password')}
                name="password"
                value={doctorDetails.password}
                onChange={handleChange}
                required
              />
              <FaLock className="icon-register" />
            </div>
            <div className="form-group col-md-4">
              <input
                type="number"
                className="form-control"
                placeholder={t('registerPage.age')}
                name="age"
                value={doctorDetails.age}
                onChange={handleChange}
                required
              />
              <FaPagelines className="icon-register" />
            </div>
            <div className="form-group col-md-4 input-box-register">
              <input
                type="text"
                className="form-control"
                placeholder={t('registerPage.licenseNumber')}
                name="licenceNo"
                value={doctorDetails.licenceNo}
                onChange={handleChange}
              />
              <GrLicense className="icon-register" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-12">
              <textarea
                className="form-control"
                rows="3"
                placeholder={t('registerPage.description')}
                name="description"
                value={doctorDetails.description}
                onChange={handleChange}
                required
              ></textarea>
              <FaNotesMedical className="icon-register" />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder={t('registerPage.consultationFee')}
                name="consultationFee"
                value={doctorDetails.consultationFee}
                onChange={handleChange}
                required
              />
              <FaDollarSign className="icon-register-disturbed" />
            </div>
            <div className="form-group col-md-4">
              <input
                type="number"
                className="form-control"
                placeholder={t('registerPage.experience')}
                name="experience"
                value={doctorDetails.experience}
                onChange={handleChange}
                required
              />
              <FaPlus className="icon-register-disturbed" />
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
                  {t('registerPage.choose')}
                </option>
                <option value="1">{t('registerPage.male')}</option>
                <option value="2">{t('registerPage.female')}</option>
                <option value="3">{t('registerPage.others')}</option>
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
                {t('registerPage.seniorDoctor')}
              </label>
            </div>
          </div>
          <button type="submit" className="btn-design">
            {t('registerPage.registerButton')}
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
