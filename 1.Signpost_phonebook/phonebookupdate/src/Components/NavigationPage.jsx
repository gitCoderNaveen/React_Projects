import React from "react";
import { NavLink } from "react-router-dom";

export default function NavigationPage() {
  return (
    <div>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/signup">Signup</NavLink>
    </div>
  );
}
