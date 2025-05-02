import React, { Suspense, lazy } from "react";
import Navigationpage from "./Components/Navigationpage";
import { Routes, Route } from "react-router-dom";
import "../src/App.css";
import Auth, { useAuth, Authcontext } from "./Components/Auth"; // Uncomment and ensure Auth is imported

import { Provider } from "react-redux";
import { store } from "./redux/store";
import BookLoader from "./Components/BookLoader";
import Buyer from "./Components/Buyer";
import Shopkeeper from "./Components/Shopkeeper";
import Transactions from "./Components/Transactions";

const Login = lazy(() => import("./Components/Login"));
const Aboutpage = lazy(() => import("./Components/Aboutpage"));
const Contactus = lazy(() => import("./Components/Contactus"));
const Signup = lazy(() => import("./Components/Signup"));
const MediaPartner = lazy(() => import("./Components/MediaPartner"));
const UserProfile = lazy(() => import("./Components/UserProfile "));
const NearbyPromotion = lazy(() => import("./Components/Nearbypromotion"));
const SearchAndSendSMS = lazy(() => import("./Components/SearchAndSendSMS"));
const Favourite = lazy(() => import("./Components/Favourite"));
const Card = lazy(() => import("./Components/Card"));
const Subscription = lazy(() => import("./Components/Subscription"));
const Landingpage = lazy(() => import("./Components/Landingpage"));
const Admin = lazy(() => import("./Components/Admin"));
const DashBoard = lazy(() => import("./Components/Dashboard"));
const Edit = lazy(() => import("./Components/Edit"));
const Counttable = lazy(() => import("./Components/Counttable"));
const ErrorPage = lazy(() => import("./Components/ErrorPage"));
const Homepage = lazy(() => import("./Components/Homepage"));
// Import the Icecream component using lazy
const Icecream = lazy(() => import("./Components/Icecream"));

export default function App() {
  return (
    <div>
      <div>
        <Provider store={store}>
          <Auth>
            <Navigationpage />
            <Suspense
              fallback={
                <div>
                  <BookLoader />
                </div>
              }
            >
              <Routes>
                <Route path="/" element={<Landingpage />} />
                <Route path="/home" element={<Homepage />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/dashboard" element={<DashBoard />} />
                <Route path="/edit" element={<Edit />} />
                <Route path="/counts" element={<Counttable />} />
                <Route path="/NearbyPromotion" element={<NearbyPromotion />} />
                <Route path="/favourite" element={<Favourite />} />
                <Route
                  path="/SearchandSendSms"
                  element={<SearchAndSendSMS />}
                />
                {/* Add the new route for Icecream below SearchAndSendSms */}
                <Route path="/icecream" element={<Icecream />} />
                <Route path="/buyer" element={<Buyer />} />
                <Route path="/shopkeeper" element={<Shopkeeper />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/reference" element={<Card />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/profilePage" element={<UserProfile />} />
                <Route path="/about" element={<Aboutpage />} />
                <Route path="/contactus" element={<Contactus />} />
                <Route path="/MediaPartner" element={<MediaPartner />} />
                <Route path="/subscriptionpage" element={<Subscription />} />
                <Route path="*" element={<ErrorPage />} />
              </Routes>
            </Suspense>
          </Auth>
        </Provider>
      </div>
    </div>
  );
}
