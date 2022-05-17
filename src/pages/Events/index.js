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
    <Container className="m-5" fluid="xl">
      <Row className="justify-content-center">
        <Col sm>
          <h3>LISTE DES EVENEMENTS</h3>
        </Col>
        <Col sm className=" text-right">
          <Button onClick={handleAddButton} className=" btn btn-success">
            Ajouter
          </Button>
        </Col>
      </Row>
      {showAddEvent && (
        <Container>
          <Row className="justify-content-center">
            <Col sm>
              <EventEdit isCreate={true} title="Ajout d'un événement" />
            </Col>
          </Row>
        </Container>
      )}
      <hr />
      <Row className="justify-content-center">
        <Col>
          <Eventslist events={events} setEvents={setEvents} />
        </Col>
      </Row>
    </Container>
  );
};

export default Events;
