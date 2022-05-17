import "./Activities.css";
import { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

import ActivityAdd from "../../components/ActivityAdd";
import ActivitiesList from "../../components/ActivitiesList";

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [showAddActivite, setShowAddActivite] = useState(false);

  function handleAddButton() {
    setShowAddActivite((currentState) => !currentState);
  }

  return (
    <Container className="m-5" fluid="xl">
      <Row className="justify-content-center">
        <Col sm>
          <h3>LISTE DES ACTIVITES</h3>
        </Col>
        <Col sm className="text-right">
          <Button onClick={handleAddButton} className="btn-success">
            Ajouter
          </Button>
        </Col>
      </Row>
      {showAddActivite && (
        <Row className="justify-content-center">
          <Col sm>
            <ActivityAdd />
          </Col>
        </Row>
      )}
      <hr />
      <Row className="justify-content-center mt-3">
        <Col>
          <ActivitiesList
            activities={activities}
            setActivities={setActivities}
          />
        </Col>
      </Row>
    </Container>
  );
}
