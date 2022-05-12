import "./Events.css";
import { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Eventslist from "../../components/EventsList";
import EventEdit from "../../components/EventEdit";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [showAddEvent, setShowAddEvent] = useState(false);

  function handleAddButton() {
    setShowAddEvent((currentState) => !currentState);
  }

  return (
    <Container className="mt-3">
      <Row className="justify-content-center">
        <Col sm className="m-4">
          <h3>LISTE DES EVENEMENTS</h3>
        </Col>
        <Col sm className="m-4">
          <Button onClick={handleAddButton} class="button-bg-color">
            Ajouter
          </Button>
        </Col>
      </Row>
      {showAddEvent && (
        <Row className="justify-content-center">
          <Col sm>
            <EventEdit isCreate={true} title="Ajout d'un événement" />
          </Col>
        </Row>
      )}
      <hr />
      <Row className="justify-content-center">
        <Col sm>
          <Eventslist events={events} setEvents={setEvents} />
        </Col>
      </Row>
    </Container>
  );
};

export default Events;
