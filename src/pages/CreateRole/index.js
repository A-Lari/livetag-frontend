import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Form } from "react-bootstrap";
import services from "../../services";
import "./CreateRole.css";
export default function CreateRole() {
    const [body, setBody] = useState({
      role_name: "",
      event: "627900a483fb6b651f2ea81e"
    });
    const [activities, setActivities] = useState([]);
    const [checkActivities, setCheckActivities] = useState([]);

    const navigate = useNavigate();
   
    function updateBody(key, value) {
        // Il faut toujours faire une copie du state qu'on veut modifier si c'est un objet
        // objet = {  } ou [ ]
        setBody({ ...body, [key]: value });
    }
    
    function handleFormChange(event) {
        console.log(event);
        const name = event.target.name; // title
        const value = event.target.value; // toto@toto.com
        if (!name.startsWith('activity')) {
          updateBody(name, value);
        } else {
          console.log(event.target.checked);
          if (event.target.checked) {
            const newActivities = [...activities].concat(value);
            setActivities(newActivities);
            setBody({ ...body, activities: newActivities });
          } else {
            const newActivities = [...activities];
            var myIndex = newActivities.indexOf(value);
            if (myIndex !== -1) {
              newActivities.splice(myIndex, 1);
            }
            setActivities(newActivities);
            setBody({ ...body, activities: newActivities });
          }
          console.log(activities);
        }

        //TODO Voir pour récupérer l'id de l'event  
    }
    
    function handleSubmitSignup(event) {
        event.preventDefault();
        console.log(body);

        services
          .createRole(body)
          .then(() => navigate("/roles"))
          .catch(() => alert("Une erreur pendant la création d'un role"));
    }

    /*useEffect(() => {
        services
          .getRoles()
          .then((response) => {
            console.log(response);
            setCheckActivities(response);
          })
          .catch(console.log);
    }, []);*/

  return (
    <Container>
        <Form onSubmit={handleSubmitSignup} onChange={handleFormChange} >
            <Form.Group className="mb-3" controlId="role_name">
            <Form.Label>Nom de l'activité</Form.Label>
            <Form.Control type="text" placeholder="Nom du role" name="role_name" required/>
            </Form.Group>

            {/*<Form.Group className="mb-3" controlId="activities">
              <Form.Label>Activités utilisées</Form.Label>
              {checkActivities.map((activity) => (
                <Form.Check type="checkbox" id={activity._id} value={activity._id} name={`activity${activity._id}`} label={activity.label} />
              ))}
              </Form.Group>*/}

            <Form.Group className="mb-3" controlId="activities">
              <Form.Label>Activités</Form.Label>
              <Form.Check type="checkbox" id="activity1" value="627901fd83fb6b651f2ea837" name="activity1" label="First Trust Dorsey Wright Dynamic Focus 5 ETF" />
              <Form.Check type="checkbox" id="activity2" value="627901fd83fb6b651f2ea835" name="activity2" label="Milacron Holdings Corp." />
            </Form.Group>

            <Button variant="primary" type="submit">Enregistrer</Button>
        </Form>
    </Container>
  )
}
