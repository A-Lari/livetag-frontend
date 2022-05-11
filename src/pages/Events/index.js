import "./Events.css";
import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Eventslist from "../../components/EventsList";
import EventsAdd from "../../components/EventsAdd";

const Events = () => {
  const [events, setEvents] = useState([]);

  return (
    <Container>
      <Row className="justify-content-center">
        <Col sm>
          <p className="h5 m-4">Ajouter un évènnement</p>
          <EventsAdd isCreate={true} />
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col sm>
          <p className="h5 m-4">Liste des évènnement</p>
          <Eventslist events={events} setEvents={setEvents} />
        </Col>
      </Row>
    </Container>
  );
};

export default Events;
