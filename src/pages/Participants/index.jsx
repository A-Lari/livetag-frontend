import "./Participants.css";
import { useState } from "react";

import ParticipantEdit from "../../components/ParticipantEdit";
import ParticipantsList from "../../components/ParticipantsList";

import { Container, Row, Col, Button } from "react-bootstrap";

const Participants = () => {
  const [listParticipants, setListParticipants] = useState([]);
  const [showAddParticipant, setShowAddParticipant] = useState(false);

  function handleAddButton() {
    setShowAddParticipant((currentState) => !currentState);
  }

  return (
    <Container className="mt-3">
      <Row className="justify-content-center">
        <Col sm className="m-4">
          <h3>LISTE DES PARTICIPANTS</h3>
        </Col>
        <Col sm className="m-4">
          <Button onClick={handleAddButton} class="button-bg-color">
            Ajouter
          </Button>
        </Col>
      </Row>
      {showAddParticipant && (
        <Row className="justify-content-center">
          <Col sm>
            <ParticipantEdit isCreate={true} title="Ajout d'un participant" />
          </Col>
        </Row>
      )}
      <hr />
      <Row className="justify-content-center mt-3">
        <Col sm>
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
