import React from "react";
import { Link } from "react-router-dom";
import { Badge, Button, Card, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import services from "../../services";
import("./Role.css");

export default function Role(role) {
  const navigate = useNavigate();

  const deleteRole = (idRole) => {
    console.log("==> deleteRole", idRole);
    services
      .countParticipantsByRole(idRole)
      .then((count) => {
        console.log(count);
        //On supprime aucun participant utilise le role
        if(count === 0) {
          services
          .deleteRole(idRole)
          .then((response) => {
            console.log(response);
            navigate(0);
          })
          .catch(console.log);
        } else {
          alert("Role utilisé par les participants, vous ne pouvez pas le supprimer");
        }
      })
      .catch(console.log);
  };

  return (
    <Col>
      <Card style={{ width: "20rem" }}>
        <Card.Body>
          <Card.Title>{role.role_name}</Card.Title>
          <ul class="list-group">
            {role.activities.map((activity) => (
              <li key={activity._id} class="list-group-item">
                <Badge bg="secondary">
                  <Link className="bouton" to={`/activities/${activity._id}`}>
                    {activity.activity_name}
                  </Link>
                </Badge>
              </li>
            ))}
          </ul>          
          <Button variant="primary">
            <Link className="bouton" to={`/roles/${role._id}`}>
              Editer
            </Link>
          </Button>
          <Button onClick={() => deleteRole(role._id)} variant="success">
            Supprimer
          </Button>   
        </Card.Body>
      </Card>
    </Col>
  );
}
