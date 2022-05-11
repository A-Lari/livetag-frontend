import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Container, Form } from "react-bootstrap";
import services from "../../services";
import "./EditRole.css";
export default function EditRole() {
  const [body, setBody] = useState({
    role_name: "",
    activities: [],
    event: "627900a483fb6b651f2ea81e",
  });
  const [role, setRole] = useState({});
  const [activities, setActivities] = useState([]);
  const [checkActivities, setCheckActivities] = useState([]);

  const navigate = useNavigate();
  let { idRole } = useParams();

  function updateBody(key, value) {
    setBody({ ...body, [key]: value });
  }

  function handleFormChange(event) {
    console.log(event);
    const name = event.target.name;
    const value = event.target.value;
    if (!name.startsWith("activity")) {
      updateBody(name, value);
    } else {
      console.log(event.target.checked);

      const newActivities = body.activities.map((activity, index) => {
        console.log(activity._id);
        if (activity._id === value) {
          activity.checked = !activity.checked;
        }
        return activity;
      });
      console.log(newActivities);
      setBody({ ...body, activities: newActivities });

      console.log(activities);
    }
  }

  function handleSubmitSignup(event) {
    event.preventDefault();
    console.log(body);

    //Traitement pour la mise à jour du role
    const { activities } = body;
    console.log(activities);
    const updatedActivities = activities
      .map((activity) => {
        if (activity.checked === true) return activity._id;
      })
      .filter((element) => {
        return element != undefined;
      });

    console.log(updatedActivities);
    const updatedRole = {
      role_name: body.role_name,
      activities: updatedActivities,
      event: body.event,
    };
    console.log(updatedRole);

    services
      .updateRole(idRole, updatedRole)
      .then(() => navigate("/roles"))
      .catch(() => alert("Une erreur pendant la mise à jour d'un role"));
  }

  /* Effet de bord au premier rendu du composant */
  useEffect(() => {
    Promise.all([
      services.getActivitiesid("627900a483fb6b651f2ea81e"),
      services.getRole(idRole),
    ])
      .then((values) => {
        console.log(values);
        const dbActivities = values[0];
        const dbRole = values[1];
        setCheckActivities(dbActivities);
        setRole(dbRole);
        setBody(dbRole);

        // Ajout checked dans l'objet
        // Parcourir les activités et vérifier que l'id est dans le tableau d'activité du role
        // Ajouter un nouveau champ checked à true ou false pour l'utiliser dans la vue
        const tabActivitiesForCheck = [];
        dbRole.activities.forEach((element) => {
          tabActivitiesForCheck.push(element._id);
        });
        console.log(tabActivitiesForCheck);

        const newActivities = dbActivities.map((activity, index) => {
          console.log(activity._id);
          const trouve = tabActivitiesForCheck.indexOf(activity._id);
          console.log(trouve);
          if (trouve !== -1) {
            activity.checked = true;
          } else {
            activity.checked = false;
          }
          return activity;
        });
        console.log(newActivities);
        setBody({
          ...body,
          activities: newActivities,
          role_name: dbRole.role_name,
        });
        console.log(body);
      })
      .catch((reason) => {
        console.log(reason);
      });
  }, []);

  return (
    <Container>
      <Form onSubmit={handleSubmitSignup} onChange={handleFormChange}>
        <Form.Group className="mb-3" controlId="role_name">
          <Form.Label>Nom du role</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nom du role"
            name="role_name"
            value={body.role_name}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="activities">
          <Form.Label>Activités utilisées</Form.Label>
          {body.activities.map((activity) => (
            <Form.Check
              type="checkbox"
              id={activity._id}
              value={activity._id}
              checked={activity.checked}
              name={`activity${activity._id}`}
              label={activity.activity_name}
            />
          ))}
        </Form.Group>

        <Button variant="primary" type="submit">
          Enregistrer
        </Button>
      </Form>
    </Container>
  );
}
