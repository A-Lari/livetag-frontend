import "./Participants.css";
import { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

import ParticipantEdit from "../../components/ParticipantEdit";
import ParticipantsList from "../../components/ParticipantsList";

const Participants = () => {
  const [listParticipants, setListParticipants] = useState([]);
  const [showAddParticipant, setShowAddParticipant] = useState(false);

  function handleAddButton() {
    setShowAddParticipant((currentState) => !currentState);
  }

  return (
    <Container className="m-5" fluid="xl">
      <Row className="justify-content-center">
        <Col sm>
          <h3>LISTE DES PARTICIPANTS</h3>
        </Col>
        <Col sm className="text-right">
          <Button onClick={handleAddButton} class="button-bg-color">
            Ajouter
          </Button>
        </Col>
      </Row>
      {showAddParticipant && (
        <Container>
          <Row className="justify-content-center">
            <Col sm>
              <ParticipantEdit isCreate={true} title="Ajout d'un participant" />
            </Col>
          </Row>
        </Container>
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
