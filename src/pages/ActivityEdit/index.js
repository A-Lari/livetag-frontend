import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import services from "../../services";
import { Button, Card, Form } from "react-bootstrap";
import moment from "moment";

function ActivityEdit() {
  const [body, setBody] = useState({
    activity_name: "",
    activity_date: "",
    description: "",
    price: "",
  });

  const navigate = useNavigate();

  let { idActivity } = useParams();

  function updateBody(key, value) {
    setBody({ ...body, [key]: value });
  }

  function handleFormChange(event) {
    const name = event.target.name; // activity_name
    const value = event.target.value;
    updateBody(name, value);
  }

  function handleSubmitActivity(event) {
    event.preventDefault();
    console.log(body);
    services
      .updateActivity(idActivity, body)
      .then(() => navigate("/activities"))
      .catch(() => alert("Une erreur a eu lieu pendant l'ajout"));
  }

  useEffect(() => {
    console.log("in use effect");
    services
      .getActivitiesById(idActivity)
      .then((response) => {
        console.log(response);
        setBody(response);
      })
      .catch(console.log);
  }, []);

  return (
    <div>
      <h1>Modifier une Activité</h1>

      <Card className="itemActivities">
        <Form onSubmit={handleSubmitActivity} onChange={handleFormChange}>
          <Form.Group className="mb-3" controlId="activity_name">
            <Form.Label>Nom</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nom de l'activité"
              name="activity_name"
              value={body.activity_name}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="activity_date">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              name="activity_date"
              value={moment(body.activity_date).format("YYYY-MM-DD")}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="description de l'activité"
              name="description"
              value={body.description}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="price">
            <Form.Label>Prix</Form.Label>
            <Form.Control
              type="text"
              placeholder="prix"
              name="price"
              value={body.price}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            MODIFIER
          </Button>
        </Form>
      </Card>
    </div>
  );
}

export default ActivityEdit;
