import React, { useState, useEffect } from "react";
import "../Register/Register.css";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaPhone, FaPagelines, FaNotesMedical, FaDollarSign, FaPlus } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { GrLicense } from "react-icons/gr";
import ErrorModal from "../../Modals/ErrorModal/ErrorModal";
import axios from "axios";
import { BaseUrl } from '../../../BaseUrl'
import { useTranslation } from 'react-i18next';
export default function Register({ setRole, setIsLoggedIn }) {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
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
    image: null
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

  const toggleTermsModal = () => {
    setShowTermsModal(!showTermsModal);
  };

  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setDoctorDetails((prevDetails) => ({
      ...prevDetails,
      image: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!termsAccepted) {
      alert("Please accept the terms and conditions.");
      return;
    }
    try {
      let imageData = null;

      if (doctorDetails.image) {
        imageData = await convertImageToBase64(doctorDetails.image);
      }

      const formData = {
        ...doctorDetails,
        image: imageData,
      };
      const response = await axios.post(
        `${BaseUrl}/api/doctor/register`,
        formData
      );
      console.log(response.data);
      console.log(response.status);
      if (response.status === 200) {
        const role = response.data.userRole;
        setRole(role);
        setIsLoggedIn(true);
        const authToken = {
          accessToken: response.data.accessToken,
          tokenType: response.data.tokenType,
          userId: response.data.userId,
        };
        window.localStorage.setItem("authToken", JSON.stringify(authToken));
        window.localStorage.setItem("userRole", role);
        window.localStorage.setItem("isLoggedIn", true);
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
                <option value="MALE">{t('registerPage.male')}</option>
                <option value="FEMALE">{t('registerPage.female')}</option>
                <option value="OTHERS">{t('registerPage.others')}</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <input
                type="file"
                className="form-control"
                accept="image/*"
                name="image"
                onChange={handleFileChange}
                required
              />
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
          </div>
          <div className="form-row">
            <div>
              <div className="form-check-terms">
                <label
                  className="form-check-label"
                >
                  <input type="checkbox" onChange={() => setTermsAccepted(!termsAccepted)} />
                  <span onClick={toggleTermsModal}>Accept Terms and Conditions</span>
                </label>
              </div>
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
      {showTermsModal && (
        <div className="modal-terms">
          <div className="modal-content-terms">
            <span className="close-terms" onClick={toggleTermsModal}>&times;</span>
            <h2>Terms and Conditions</h2>
            <p>
              Welcome to ,<b>Tranquil Mind!</b> These <b>Terms and Conditions</b> govern your access to and use of Tranquil Mind, including any content, functionality, and services offered through the App. By accessing or using the App, you agree to be bound by these Terms. If you do not agree to these Terms, please do not access or use the App.
            </p>
            <ol>
              <li>
                <strong>Accuracy of Materials</strong>
                <p>
                  <strong>1.1. Errors:</strong> The materials appearing on Tranquil Mind may include technical, typographical, or photographic errors. We do not warrant that any of the materials on its app are accurate, complete, or current.
                </p>
                <p>
                  <strong>1.2. Changes:</strong> We may make changes to the materials contained on the app at any time without notice. However, We do not make any commitment to update the materials.
                </p>
              </li>
              <li>
                <strong>Links</strong>
                <p>
                  <strong>2.1. External Sites:</strong> We have not reviewed all of the sites linked to our app and are not responsible for the contents of any such linked site.
                </p>
                <p>
                  <strong>2.2. Endorsement:</strong> The inclusion of any link does not imply endorsement by Tranquil Mind of the site. Use of any such linked website is at the user's own risk.
                </p>
              </li>
              <li>
                <strong>Prohibited Conduct</strong>
                <p>
                  <strong>3.1. Violate any applicable laws, regulations, or third-party rights.</strong>
                </p>
                <p>
                  <strong>3.2. Use the App for any unlawful or fraudulent purpose.</strong>
                </p>
              </li>
              <li>
                <strong>Contact Information</strong>
                <p>
                  <strong>4.1. Questions:</strong> If you have any questions about these Terms, please contact us at [Contact Information].
                </p>
              </li>
              <li>
                <strong>Data Collection and Privacy</strong>
                <p>
                  <strong>5.1. Consent:</strong> By using the App, you consent to the collection, processing, and use of your personal data as described in our Privacy Policy.
                </p>
                <p>
                  <strong>5.2. Data Security:</strong> We implement reasonable security measures to protect your personal data from unauthorized access, use, or disclosure. However, please note that no method of transmission over the internet or method of electronic storage is 100% secure.
                </p>
              </li>
              <li>
                <strong>Intellectual Property</strong>
                <p>
                  <strong>6.1. Ownership:</strong> All content, features, and functionality available through the App are owned by or licensed to us and are protected by copyright, trademark, and other intellectual property laws.
                </p>
              </li>
              <li>
                <strong>Disclaimer of Warranties</strong>
                <p>
                  <strong>7.1. No Warranty:</strong> The App is provided "as is" and "as available" without warranties of any kind, either express or implied. We do not warrant that the App will be error-free or uninterrupted, or that defects will be corrected.
                </p>
              </li>
              <li>
                <strong>Limitation of Liability</strong>
                <p>
                  <strong>8.1. Exclusion of Damages:</strong> In no event shall we be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, arising out of or in connection with your use of the App.
                </p>
              </li>
              <li>
                <strong>Governing Law</strong>
                <p>
                  <strong>9.1. Jurisdiction:</strong> These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.
                </p>
              </li>
              <li>
                <strong>Changes to Terms</strong>
                <p>
                  <strong>10.1. Modification:</strong> We reserve the right to modify these Terms at any time. Any changes will be effective immediately upon posting the revised Terms on the App. Your continued use of the App after the posting of the revised Terms constitutes your agreement to the revised Terms.
                </p>
              </li>
            </ol>
            <hr />
            <h3>Consent Form</h3>
            <p>
              I acknowledge that I have read and understood the Terms and Conditions of Tranquil Mind, and I consent to the collection, processing, and use of my personal data as described in the Privacy Policy. I understand that by using the App, I am agreeing to abide by the Terms and Conditions set forth by Tranquil Mind and that failure to comply with these terms may result in the termination of my access to the App. By providing my consent, I affirm that I am at least 18 years old and have the legal capacity to enter into these Terms.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
