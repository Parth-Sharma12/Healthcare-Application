import React, { useState, useEffect } from "react";
import "../Login/Login.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { BaseUrl } from '../BaseUrl'
export default function Login({ setRole, setIsLoggedIn }) {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [userLoginDetails, setUserLoginDetails] = useState({
    email: "",
    password: "",
  });
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('selectedLanguage', lng);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!termsAccepted) {
      alert("Please accept the terms and conditions.");
      return;
    }
    try {
      const response = await axios.post(
        `${BaseUrl}/api/user/authenticate`,
        userLoginDetails
      );
      if (response.status === 200) {
        const userId = response.data.userId;
        console.log(response.data);
        const token = window.localStorage.getItem('authToken');
        const authToken = {
          accessToken: response.data.accessToken,
          tokenType: response.data.tokenType,
          userId: response.data.userId,
        };  
        const role = response.data.userRole;
        window.localStorage.setItem("userId",authToken.userId);
        window.localStorage.setItem("authToken", JSON.stringify(authToken));
        //const role = userId === 5 ? 'doctor' : userId === 1 ? 'admin' : userId === 15 ? 'moderator' :userId === 17 ? 'responder': null;
        window.localStorage.setItem("userRole", role);
        window.localStorage.setItem("isLoggedIn", true);

        setRole(role);
        setIsLoggedIn(true);
        console.log(role);

        // Fetch moderator or responder DTO based on the user role
        if (role === "MODERATOR" || role === "RESPONDER") {
          const api_role = role.toLowerCase();
          console.log(userId);
          const token = window.localStorage.getItem('authToken');
          console.log(response.data.accessToken);
          const moderatorResponderResponse = await axios.get(
            `${BaseUrl}/api/${api_role}/getbyid/${userId}`,{
              headers: {
                Authorization: `Bearer ${response.data.accessToken}` // Pass the token in the Authorization header
              }
            }

          );
          console.log(moderatorResponderResponse);
          const isFirstLogin = moderatorResponderResponse.data.firstLogin;
          window.localStorage.setItem("FirstLogin", isFirstLogin);
          console.log(isFirstLogin);
        }
        navigate("/home");
      }
    }
    catch (error) {
      console.error("Error posting data:", error.response.status);
      let errorStatus = error.response.status;
      window.localStorage.setItem("isLoggedIn", false);
      console.log(errorStatus);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserLoginDetails({ ...userLoginDetails, [name]: value });
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


  return (
    <div className="login-wrapper">
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
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <h1>{t('loginPage.title')}</h1>
          <div className="input-box">
            <input
              type="email"
              placeholder={t('loginPage.username')}
              name="email"
              value={userLoginDetails.email}
              onChange={handleChange}
              required
            />
            <FaUser className="icon" />
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder={t('loginPage.password')}
              name="password"
              value={userLoginDetails.password}
              onChange={handleChange}
              required
            />
            <FaLock className="icon" />
          </div>
          <div className="remember-forgot">
            <label>
              <input type="checkbox" onChange={() => setTermsAccepted(!termsAccepted)} />
              <span onClick={toggleTermsModal}>Accept Terms and Conditions</span>
            </label>
          </div>
          <button type="submit">{t('loginPage.loginButton')}</button>
          <div className="register-link">
            <p>
              {t('loginPage.noAccount')} <Link to="/register">{t('loginPage.registerHere')}</Link>
            </p>
          </div>
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
