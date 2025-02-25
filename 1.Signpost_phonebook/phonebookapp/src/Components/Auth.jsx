import PropTypes from "prop-types";
import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Authcontext = React.createContext();

export default function Auth({ children }) {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  // Persist user data in localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedUserData = localStorage.getItem("userData");
    if (storedUser && storedUserData) {
      setUser(JSON.parse(storedUser));
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const Login = async (username, password) => {
    if (!username) {
      alert("Please Enter your Mobile Registered number");
      return;
    }
    if (password !== "signpost") {
      alert("Invalid Password");
      return;
    }
    try {
      const response = await axios.post(
        "https://signpostphonebook.in/test_auth_for_new_database.php",
        { mobileno: username }
      );

      if (response.data.valid) {
        setUser(response.data.businessname || response.data.person);
        setUserData(response.data);
        localStorage.setItem(
          "user",
          JSON.stringify(response.data.businessname || response.data.person)
        );
        localStorage.setItem("userData", JSON.stringify(response.data));
        navigate("/");
      } else {
        alert("Error: User Not Found, Please Sign Up");
        navigate("/signup");
      }
    } catch (error) {
      alert("Error: Unable to Login. Please Try Again Later");
      console.log(error);
    }
  };

  const Logout = () => {
    setUser(null);
    setUserData(null);
    localStorage.removeItem("user");
    localStorage.removeItem("userData");
    navigate("/login");
  };

  return (
    <Authcontext.Provider
      value={{ user, userData, setUserData, Login, Logout }}
    >
      {children}
    </Authcontext.Provider>
  );
}

Auth.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useAuth() {
  return useContext(Authcontext);
}
