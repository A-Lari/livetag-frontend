import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import services from "../../services";
import "./Inscription.css";

function Inscription() {
  const [body, setBody] = useState({
    firstname: "",
    lastname: "",
    email: "",
    telephone: "",
    event: null,
    role: null,
    optional_activities: [{}],
  });
  const [role, setRole] = useState({
    event: {},
    role: {},
  });
  const [checkActivities, setCheckActivities] = useState([{}]);

  const navigate = useNavigate();
  let { idLink } = useParams();
  console.log(idLink);

  /* Effet de bord au premier rendu du composant */
  useEffect(() => {
    services
      .searchRoleByLink(idLink)
      .then((response) => {
        console.log(response);
        setRole(response);

        services.getOptionalActivities(response._id)
        .then((activities) => {
          console.log(activities);
          setCheckActivities(activities);

          const newActivities = activities.map((activity) => {
            activity.checked = false;
            return activity;
          });
  
          setBody({
            ...body,
            optional_activities: newActivities,
          });
        })
        .catch(console.log);
        
      })
      .catch(console.log);
  }, []);

  function updateBody(key, value) {
    setBody({ ...body, [key]: value });
  }

  function handleFormChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    if (!name.startsWith("activity")) {
      updateBody(name, value);
    } else {
      const newOptionalActivities = body.optional_activities.map((activity) => {
        if (activity._id === value) {
          activity.checked = !activity.checked;
        }
        return activity;
      });
      setBody({ ...body, optional_activities: newOptionalActivities });
    }
  }

  function handleCreate(event) {
    event.preventDefault();
    console.log("handleCreate");

    const { optional_activities } = body;

    const updatedOptionalActivities = optional_activities
      .filter((activity) => activity.checked)
      .map((activity) => activity._id);

    const inscriptionBody = { ...body, optional_activities: updatedOptionalActivities }
    console.log(inscriptionBody);
    services
      .createInscriptionFromLink(idLink, inscriptionBody)
      .then((response) => {
        console.log(response);
        //TODO aller sur une page de confirmation
        //navigate(`/confirm/${response._id});
      })
      .catch(() => alert("Une erreur pendant l'inscription d'un participant"));
  }

  // #endregion
  return (
    <Card className="m-1 mb-2">
      <Card.Header as="h5" className="card-bg-color text-center">
        INSCRIPTION {role.event.event_name} : {role.role_name}
      </Card.Header>
      <Card.Body>
        <Form onChange={handleFormChange}>
          <Container>
            <Row>
              <Col sm>
                <Form.Group className="mb-2" controlId="formFirstname">
                  <Form.Label>Prénom</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Prénom"
                    name="firstname"
                    required
                  />
                </Form.Group>
              </Col>
              <Col sm>
                <Form.Group className="mb-2" controlId="formLastname">
                  <Form.Label>Nom</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nom"
                    name="lastname"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col sm>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    name="email"
                    required
                  />
                </Form.Group>
              </Col>
              <Col sm>
                <Form.Group className="mb-3" controlId="formTelephone">
                  <Form.Label>Téléphone</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Téléphone"
                    name="telephone"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col sm>
                <Form.Group className="mb-3" controlId="activities">
                  <Form.Label>Activités accessibles hors-rôle</Form.Label>
                  {body.optional_activities.map((activity) => (
                    <Form.Check
                      type="checkbox"
                      id={activity._id}
                      value={activity._id}
                      checked={activity.checked}
                      name={`activity${activity._id}`}
                      label={`${activity.activity_name} à ${activity.price} €`}
                    />
                  ))}
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col sm className="text-center">
                <Button
                  variant="success"
                  type="submit"
                  className="mt-3"
                  onClick={handleCreate}
                >
                  Enregistrer
                </Button>
              </Col>
            </Row>

          </Container>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default Inscription;
