import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;
// const baseURL = "http://localhost:3001";

const base = axios.create({ baseURL });

const services = {
  /**
   * SERVICES USERS
   */
  // #region
  login(body) {
    // email, password
    return base.post("/auth/login", body).then((res) => res.data);
  },

  signup(body) {
    // email, password, confirmPassword
    return base.post("/auth/signup", body);
  },
  // #endregion

  /**
   * SERVICES PARTICIPANTS
   */
  // #region
  getAllParticipants() {
    return base.get(`/participants`).then((res) => res.data);
  },

  getParticipantById(idParticipant) {
    return base.get(`participants/${idParticipant}`).then((res) => res.data);
  },

  getParticipantByEvent(idEvent) {
    return base.get(`participants/byevent/${idEvent}`).then((res) => res.data);
  },

  deleteParticipant(idParticipant) {
    return base
      .delete(`/participants/${idParticipant}`)
      .then((res) => res.data);
  },

  createParticipant(body) {
    return base.post(`/participants`, body).then((res) => res.data);
  },

  updateParticipant(idParticipant, body) {
    return base
      .put(`/participants/${idParticipant}`, body)
      .then((res) => res.data);
  },

  countParticipantsByRole(id) {
    const token = localStorage.getItem("jwt");
    return base
      .get(`/participants/roles/${id}/count`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data);
  },

  // #endregion

  /**
   * SERVICES EVENEMENTS
   */
  // #region
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
    const token = localStorage.getItem("jwt");
    return base
      .delete(`/events/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data)
      .catch((err) => {
        console.log("erreur deleteEventByID", err);
        const { data, status } = err.response;
        const response = { data, status };
        return response;
      });
  },

  getEventById(idEvent) {
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
  // #endregion

  /**
   * SERVICES ROLES
   */
  // #region
  getRoles(idEvent) {
    const token = localStorage.getItem("jwt");

    return base
      .get(`/roles?idEvent=${idEvent}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data);
  },

  getRole(id) {
    const token = localStorage.getItem("jwt");

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
      .then((res) => res.data)
      .catch((err) => {
        console.log("erreur deleteRole", err);
        const { data, status } = err.response;
        const response = { data, status };
        return response;
      });
  },

  updateRole(idRole, body) {
    const token = localStorage.getItem("jwt");
    return base
      .post(`/roles/${idRole}`, body, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data);
  },

  generateInscriptionLink(idRole, body) {
    const token = localStorage.getItem("jwt");
    return base
      .post(`/roles/${idRole}/link`, body, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data);
  },
  // #endregion

  /**
   * SERVICES ACTIVITIES
   */
  // #region
  getActivities(idEvent) {
    const token = localStorage.getItem("jwt");
    return base
      .get(`/activities?idEvent=${idEvent}`, {
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
      .then((res) => res.data)
      .catch((err) => {
        console.log("erreur deleteActivity", err);
        const { data, status } = err.response;
        const response = { data, status };
        return response;
      });
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

  countActivityByRole(id) {
    const token = localStorage.getItem("jwt");
    return base
      .get(`/roles/activities/${id}/count`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data);
  },

  // #endregion

  /**
   * SERVICES QRCODE
   */
  // #region
  generateQRCode(idParticipant, body) {
    const token = localStorage.getItem("jwt");
    console.log("generateQRCode");
    return base
      .post(`/qrcode/${idParticipant}`, body, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data);
  },
  // #endregion
};

export default services;
