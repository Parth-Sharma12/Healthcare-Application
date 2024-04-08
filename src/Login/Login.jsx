import React, { useState, useEffect } from "react";
import "../Login/Login.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
export default function Login({ setRole,setIsLoggedIn }) {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
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
    try {
      const response = await axios.post(
        "http://localhost:8082/api/user/authenticate",
        userLoginDetails
      );
      if (response.status === 200) {
        const userId=response.data.userId;
        console.log(response.data);
        const authToken = {
          accessToken: response.data.accessToken,
          tokenType: response.data.tokenType,
          userId: response.data.userId
        };
        window.localStorage.setItem("authToken", JSON.stringify(authToken));
        const role = userId === 5 ? 'doctor' : userId === 1 ? 'admin' : userId === 15 ? 'moderator' :userId === 16 ? 'responder': null;
        window.localStorage.setItem("userRole", role);
        window.localStorage.setItem("isLoggedIn",true);
        setRole(role);
        setIsLoggedIn(true);
        console.log(role);
        navigate("/home");
      }
    }
    catch (error) {
      console.error("Error posting data:", error.response.status);
      let errorStatus = error.response.status;
      window.localStorage.setItem("isLoggedIn",false);
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
              <input type="checkbox" />
              {t('loginPage.acceptTerms')}
            </label>
            <Link to="/home">{t('loginPage.forgotPassword')}</Link>
          </div>
          <button type="submit">{t('loginPage.loginButton')}</button>
          <div className="register-link">
            <p>
              {t('loginPage.noAccount')} <Link to="/register">{t('loginPage.registerHere')}</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
