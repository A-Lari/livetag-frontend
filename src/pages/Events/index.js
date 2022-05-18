import "./Events.css";
import { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Eventslist from "../../components/EventsList";
import EventEdit from "../../components/EventEdit";
import services from "../../services";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [showAddEvent, setShowAddEvent] = useState(false);

  function handleAddButton() {
    setShowAddEvent((currentState) => !currentState);
  }

  function fetchEventData() {
    services
      .getEventFromDB()
      .then((list) => {
        setEvents(list);
      })
      .catch((error) => {
        console.log("Error list events", error);
        alert("La liste des events ne peut être à affichée");
      });
  }

  return (
    <Container className="m-4" fluid="xl">
      <hr />
      <Container>
        <Row className="justify-content-center">
          <Col sm>
            <Row className="justify-content-center">
              <Col sm>
                <h3 className="text-center">EVENEMENTS</h3>
              </Col>
              <Col sm className="text-center">
                <Button
                  onClick={handleAddButton}
                  className="btn-success btn-xs"
                >
                  +
                </Button>
              </Col>
            </Row>
          </Col>{" "}
        </Row>
      </Container>
      {showAddEvent && (
        <Container>
          <Row className="justify-content-center">
            <Col sm>
              <EventEdit
                isCreate={true}
                fecthAndSetListEvent={fetchEventData}
                title="Ajout d'un événement"
              />
            </Col>
          </Row>
        </Container>
      )}
      <hr />
      <Row className="justify-content-center">
        <Col>
          <Eventslist events={events} fecthAndSetListEvent={fetchEventData} />
        </Col>
      </Row>
    </Container>
  );
};

export default Events;
