import { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer";

import SignupPage from "./pages/Auth/Signup";
import LoginPage from "./pages/Auth/Login";
import NavBar from "./components/Navbar";

import Eventslist from "./pages/EventsList";
import Participants from "./pages/Participants";

import { useAuth } from "./AuthProvider";
import Inscription from "./pages/Inscription";

function App() {
  const { connected } = useAuth();

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        {connected && <Route path="/events" element={<Eventslist />} />}
        {connected && <Route path="/participants" element={<Participants />} />}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/inscription/:id" element={<Inscription />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
