import { useState } from "react";

import ParticipantEdit from "../../components/ParticipantEdit";
import ParticipantsList from "../../components/ParticipantsList";

import { Container, Row, Col } from "react-bootstrap";

const Participants = () => {
  const [listParticipants, setListParticipants] = useState([]);

  return (
    <Container>
      <Row className="justify-content-center mt-3">
        <Col sm>
          <ParticipantEdit isCreate={true} title="Ajoute d'un participant" />
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
