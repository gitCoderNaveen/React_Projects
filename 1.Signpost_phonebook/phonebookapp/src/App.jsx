import React from "react";
import Homepage from "./Components/Homepage";
import Navigationpage from "./Components/Navigationpage";
import { Routes, Route } from "react-router-dom";
import Login from "./Components/Login";
import Aboutpage from "./Components/Aboutpage";
import Contactus from "./Components/Contactus";
import "../src/App.css";
import Signup from "./Components/Signup";
import Auth from "./Components/Auth";
import MediaPartner from "./Components/MediaPartner";
import UserProfile from "./Components/UserProfile ";
import NearbyPromotion from "./Components/Nearbypromotion";
import SearchAndSendSMS from "./Components/SearchAndSendSMS";

import Card from "./Components/Card";
import Subscription from "./Components/Subscription";
import Landingpage from "./Components/Landingpage";
export default function App() {
  return (
    <div>
      <div>
        <Auth>
          <Navigationpage />

          <Routes>
            <Route path="/" element={<Landingpage />} />
            <Route path="/home" element={<Homepage />} />
            <Route path="/NearbyPromotion" element={<NearbyPromotion />} />
            <Route path="/SearchandSendSms" element={<SearchAndSendSMS />} />
            <Route path="/reference" element={<Card />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profilePage" element={<UserProfile />} />
            <Route path="/about" element={<Aboutpage />} />
            <Route path="/contactus" element={<Contactus />} />
            <Route path="/MediaPartner" element={<MediaPartner />} />
            <Route path="/subscriptionpage" element={<Subscription />} />
          </Routes>
        </Auth>
      </div>
    </div>
  );
}
