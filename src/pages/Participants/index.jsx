import { useState } from "react";

import ParticipantCreate from "../../components/ParticipantCreate";
import ParticipantsList from "../../components/ParticipantsList";

import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "./Participants.css";

const Participants = () => {
  const [listParticipants, setListParticipants] = useState([]);

  return (
    <Container>
      <Row className="justify-content-center mt-3">
        <Col sm>
          <ParticipantCreate />
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col sm>
          <p class="h5 m-4">LISTE DES PARTICIPANTS</p>
          <ParticipantsList
            listParticipants={listParticipants}
            setListParticipants={setListParticipants}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Participants;
