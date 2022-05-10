import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;
// const baseURL = "http://localhost:3001";

const base = axios.create({ baseURL });

const services = {
  /**
   * SERVICES USERS
   */

  login(body) {
    // email, password
    return base.post("/auth/login", body).then((res) => res.data);
  },

  signup(body) {
    // email, password, confirmPassword
    return base.post("/auth/signup", body);
  },

  /**
   * SERVICES PARTICIPANTS
   */
  getAllParticipants() {
    const token = localStorage.getItem("jwt");
    return base.get(`/participants`).then((res) => res.data);
  },

  /**
   * SERVICES EVENEMENTS
   */
  addEvents(body) {
    const token = localStorage.getItem("jwt");
    // code, event_name, start_date, end_date, place, description
    return base.post("/events", body, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  getEventFromDB() {
    const token = localStorage.getItem("jwt");
    return base
      .get("/events", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data);
  },
};

export default services;
