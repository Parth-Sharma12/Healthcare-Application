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
        `${BaseUrl}/api/user/authenticate`,
        userLoginDetails
      );
      if (response.status === 200) {
        const userId = response.data.userId;
        const authToken = {
          accessToken: response.data.accessToken,
          tokenType: response.data.tokenType,
          userId: response.data.userId,
        };
        const role = response.data.userRole;
        window.localStorage.setItem("userId", authToken.userId);
        window.localStorage.setItem("authToken", JSON.stringify(authToken));
        window.localStorage.setItem("userRole", role);
        window.localStorage.setItem("isLoggedIn", true);
        console.log(role)
        setRole(role);
        setIsLoggedIn(true);
        if (role === "DOCTOR") {
          try {
            const token = response.data.accessToken;
            const seniorStatusResponse = await axios.get(`${BaseUrl}/api/doctor/is-senior/${userId}`, {
              headers: {
                Authorization: `Bearer ${token}` // Pass the token in the Authorization header
              }
            });
            console.log(seniorStatusResponse.data)
            const isSenior = seniorStatusResponse.data;
            console.log(isSenior)
            window.localStorage.setItem("IsSenior", isSenior);
          } catch (error) {
            console.error("Error fetching senior status:", error);
          }
        }
        // Fetch moderator or responder DTO based on the user role
        if (role === "MODERATOR" || role === "RESPONDER") {
          const api_role = role.toLowerCase();
          const moderatorResponderResponse = await axios.get(
            `${BaseUrl}/api/${api_role}/getbyid/${userId}`, {
            headers: {
              Authorization: `Bearer ${response.data.accessToken}` // Pass the token in the Authorization header
            }
          });
  
          const isFirstLogin = moderatorResponderResponse.data.firstLogin;
          window.localStorage.setItem("FirstLogin", isFirstLogin);
        }
  
       
        console.log("Done");
        navigate("/home");
      }
    } catch (error) {
      console.error("Error posting data:", error.response.status);
      window.localStorage.setItem("isLoggedIn", false);
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
            <Link to="/chatroom">{t('loginPage.forgotPassword')}</Link>
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
