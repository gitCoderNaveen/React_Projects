// import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const Authcontext = React.createContext();
export default function Auth({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const Login = async (username, password) => {
    if (!username) {
      alert("Please Enter your Mobile Registered number");
      return;
    }
    if (password !== "Signpost") {
      alert("Invalid Password");
      return;
    }
    try {
      const response = await axios.post(
        "https://signpostphonebook.in/client_login.php",
        { mobileno: username }
      );

      if (response.data.valid) {
        setUser(response.data.businessname);
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
    navigate("/login");
  };
  return (
    <div>
      <Authcontext.Provider value={{ user, Login, Logout }}>
        {children}
      </Authcontext.Provider>
    </div>
  );
}

Auth.propTypes = {
  children: PropTypes.node.isRequired,
};
export function useAuth() {
  return useContext(Authcontext);
}
