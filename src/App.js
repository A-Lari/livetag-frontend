import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer";

import SignupPage from "./pages/Auth/Signup";
import LoginPage from "./pages/Auth/Login";
import NavBar from "./components/Navbar";

import Participants from "./pages/Participants";

import { useAuth } from "./AuthProvider";
import Inscription from "./pages/Inscription";
import EventsAdd from "./pages/EventsAdd";
import Events from "./pages/EventsList";

function App() {
  const { connected } = useAuth();

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />

        {connected && <Route path="/participants" element={<Participants />} />}

        {connected && <Route path="/events" element={<Events />} />}
        {connected && (
          <Route path="/events/add-events" element={<EventsAdd />} />
        )}

        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/inscription/:id" element={<Inscription />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
