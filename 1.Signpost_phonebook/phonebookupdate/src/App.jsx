import React from "react";
import Signup from "../src/Components/Signup";
import Home from "./Components/Home";
import Animation from "./Components/Animation";
import Card from "./Components/Cards";
import { Route, Routes } from "react-router-dom";
import NavigationPage from "./Components/NavigationPage";
import Carousel from "./Components/Carousel";

export default function App() {
  return (
    <div>
      <Carousel />
      <NavigationPage />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}
