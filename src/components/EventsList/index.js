import "./EventsList.css";
import services from "../../services";
import { useEffect } from "react";
import { Table, Button, NavItem, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

function Eventslist({ events, setEvents }) {
  const navigate = useNavigate();

  function fetchEventData() {
    services
      .getEventFromDB()
      .then((list) => {
        console.log("list", list);
        setEvents(list);
      })
      .catch((error) => {
        console.log("Error list events", error);
        alert("La liste des events ne peut êtrea affichée");
      });
  }

  useEffect(() => {
    fetchEventData();
  }, []);

  function deleteEvent(id) {
    services
      .deleteEventByID(id)
      .then((response) => {
        console.log(response);
        navigate(0);
      })
      .catch(console.log);
  }

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>Nom</th>
          <th>Description</th>
          <th>Lieu</th>
          <th>Date de début</th>
          <th>Date de fin</th>
          <th>Code</th>
          <th>Etat</th>
        </tr>
      </thead>
      <tbody>
        {events.map((event) => (
          <tr key={event._id}>
            <td>{event.event_name}</td>
            <td>{event.description}</td>
            <td>{event.place}</td>
            <td>{dayjs(event.start_date).format("DD/MM/YY")}</td>
            <td>{dayjs(event.end_date).format("DD/MM/YY")}</td>
            <td>{event.code}</td>
            <td>
              <Nav>
                <Nav.Item>
                  <Nav.Link href={`/events/${event._id}`}>
                    <Button variant="outline-warning">Modifier</Button>
                  </Nav.Link>
                </Nav.Item>
              </Nav>
              <Button
                variant="outline-danger"
                onClick={() => deleteEvent(event._id)}
              >
                Supprimer
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default Eventslist;
