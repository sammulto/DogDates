import React from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";

import MainNavigation from "./shared/components/Navigation/MainNavigation";

import Home from "./home/pages/Home";
import Login from "./login/pages/Login";
import Signup from "./signup/pages/Signup";
import Account from "./user/pages/Account";
import InfoUpdated from './user/pages/InfoUpdated'
import UpdateAccInfo from './user/pages/UpdateAccInfo';
import DeleteAccountWarning from './user/pages/DeleteAccountWarning';
import AccountDeleted from './user/pages/AccountDelected';
import PlayDates from './user/pages/PlayDates';
import Matches from './user/pages/Matches'
import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hook";

function App() {
  //////////////////// Change here for API SERVER URL ///////////////
  const API_URL = "http://localhost:5000";
  const API_URL_IMAGES = "http://www.sammul.live";
  //////////////////////////////////////////////////////////////////
  const { token, login, logout, userId, userInfo } = useAuth();
  let routes;

  if (token) {
    //routes for logged in user
    routes = (
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/playDates" element={<PlayDates API_URL={API_URL} API_URL_IMAGES={API_URL_IMAGES}/>}/>
        <Route path="/account" element={<Account API_URL={API_URL} API_URL_IMAGES={API_URL_IMAGES}/>}/>
        <Route path="/updateAccInfo" element={<UpdateAccInfo API_URL={API_URL}/>}/>
        <Route path="/matches" element={<Matches API_URL={API_URL}/>}/>
        <Route path="/deleteaccountwarning" element={<DeleteAccountWarning API_URL={API_URL}/>}/>
        <Route path="/" element={<Home/>}/>
      </Routes>
    );
  } else {
    //routes for public
    routes = (
      <Routes>
        <Route path="/"element={<Home/>}/>
        <Route path="/login" element={<Login API_URL={API_URL}/>}/>
        <Route path="/signup" element={<Signup API_URL={API_URL}/>}/> 
        <Route path="/profileupdated" element={<InfoUpdated/>}/>
        <Route path="/accountdeleted" element={<AccountDeleted/>}/>
        <Route path="/*" element={<Home/>}/>
      </Routes>
    );
  }
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        userInfo: userInfo,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
