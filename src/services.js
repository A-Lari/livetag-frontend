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

  deleteEventByID(id) {
    console.log(id);
    const token = localStorage.getItem("jwt");
    return base
      .delete(`/events/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data);
  },

  getEventById(idEvent) {
    console.log("Yo", idEvent);
    const token = localStorage.getItem("jwt");
    return base
      .get(`/events/${idEvent}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data);
  },

  updateEvent(id, body) {
    const token = localStorage.getItem("jwt");
    return base
      .post(`/events/${id}`, body, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data);
  },

  getRoles(idEvent) {
    const token = localStorage.getItem("jwt");
    console.log("getRoles");
    return base
      .get(`/roles?idEvent=${idEvent}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data);
  },

  getRole(id) {
    const token = localStorage.getItem("jwt");
    console.log("getRoles");
    return base
      .get(`/roles/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data);
  },

  createRole(body) {
    const token = localStorage.getItem("jwt");
    return base
      .post("/roles", body, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data);
  },

  deleteRole(idRole) {
    const token = localStorage.getItem("jwt");
    return base
      .delete(`/roles/${idRole}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data);
  },

  updateRole(idRole, body) {
    const token = localStorage.getItem("jwt");
    return base
      .post(`/roles/${idRole}`, body, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data);
  },

  getActivities() {
    const token = localStorage.getItem("jwt");
    return base
      .get("/activities", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data);
  },

  getActivitiesById(idActivity) {
    const token = localStorage.getItem("jwt");
    return base
      .get(`/activities/${idActivity}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data);
  },

  deleteActivity(idActivity) {
    const token = localStorage.getItem("jwt");
    return base
      .delete(`/activities/${idActivity}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data);
  },

  addActivity(body) {
    const token = localStorage.getItem("jwt");
    // code, event_name, start_date, end_date, place, description
    return base.post("/activities", body, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  updateActivity(idActivity, body) {
    const token = localStorage.getItem("jwt");
    return base
      .post(`/activities/${idActivity}`, body, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data);
  },
};

export default services;
