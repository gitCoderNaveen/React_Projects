import React from "react";
import Signup from "../src/Components/Signup";
import Home from "./Components/Home";
import Animation from "./Components/Animation";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AboutPage from "./Components/About";

export default function App() {
  return (
    <div>
      <Animation />
      <AboutPage />
    </div>
  );
}
