import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Row, Col, Form, Card } from "react-bootstrap";
import services from "../../services";
import "./CreateRole.css";
import { useEvent } from "../../EventInUse";

export default function CreateRole() {
  const { eventSelect } = useEvent();
  const [body, setBody] = useState({
    role_name: "",
    activities: [],
    event: eventSelect._id,
  });
  const [activities, setActivities] = useState([]);
  const [checkActivities, setCheckActivities] = useState([]);
  const [formIsCompleted, setFormIsCompleted] = useState(false);

  const navigate = useNavigate();

  function updateBody(key, value) {
    setBody({ ...body, [key]: value });
  }

  function handleFormChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    if (!name.startsWith("activity")) {
      if (body.role_name !== "" && value !== "") {
        setFormIsCompleted(true);
      } else {
        setFormIsCompleted(false);
      }
      updateBody(name, value);
    } else {
      console.log(event.target.checked);
      if (event.target.checked) {
        const newActivities = [...activities].concat(value);
        setActivities(newActivities);
        setBody({ ...body, activities: newActivities });
      } else {
        const newActivities = [...activities];
        const myIndex = newActivities.indexOf(value);
        if (myIndex !== -1) {
          newActivities.splice(myIndex, 1);
        }
        setActivities(newActivities);
        setBody({ ...body, activities: newActivities });
      }
    }
  }

  function handleSubmitSignup(event) {
    event.preventDefault();
    console.log(body);

    services
      .createRole(body)
      .then(() => navigate(0))
      .catch(() => alert("Une erreur pendant la création d'un role"));
  }

  /* Effet de bord au premier rendu du composant */
  useEffect(() => {
    services
      .getActivities(eventSelect._id)
      .then((response) => {
        console.log(response);
        setCheckActivities(response);
      })
      .catch(console.log);
  }, []);

  return (
    <Card className="m-1 mb-2">
      <Card.Header as="h5" className="card-bg-color text-center">
        Ajouter un rôle
      </Card.Header>
      <Card.Body>
        <Form onChange={handleFormChange}>
          <Container>
            <Row>
              <Col sm>
                <Form.Group className="mb-3" controlId="role_name">
                  <Form.Label>Nom du role</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nom du role"
                    name="role_name"
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="activities">
                  <Form.Label>Activités utilisées</Form.Label>
                  {checkActivities.map((activity) => (
                    <Form.Check
                      type="checkbox"
                      id={activity._id}
                      value={activity._id}
                      name={`activity${activity._id}`}
                      label={activity.activity_name}
                    />
                  ))}
                </Form.Group>
              </Col>
            </Row>
            {!formIsCompleted && (
              <Row>
                <Col sm className="text-center">
                  <Button
                    variant="success"
                    type="submit"
                    className="mt-3"
                    onClick={handleSubmitSignup}
                    disabled
                  >
                    Enregistrer
                  </Button>
                </Col>
              </Row>
            )}
            {formIsCompleted && (
              <Row>
                <Col sm className="text-center">
                  <Button
                    variant="success"
                    type="submit"
                    className="mt-3"
                    onClick={handleSubmitSignup}
                  >
                    Enregistrer
                  </Button>
                </Col>
              </Row>
            )}
          </Container>
        </Form>
      </Card.Body>
    </Card>
  );
}
