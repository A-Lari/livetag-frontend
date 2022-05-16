import React from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import services from "../../services";
import("./Role.css");

export default function Role(role) {
  const navigate = useNavigate();

  const deleteRole = (idRole) => {
    services
      .countParticipantsByRole(idRole)
      .then((count) => {
        console.log(count);
        //On supprime aucun participant utilise le role
        if (count === 0) {
          services
            .deleteRole(idRole)
            .then((response) => {
              navigate(0);
            })
            .catch(console.log);
        } else {
          alert(
            "Role utilisé par les participants, vous ne pouvez pas le supprimer"
          );
        }
      })
      .catch(console.log);
  };

  return (
    <Card className="m-1 mb-2">
      <Card.Header as="h6" className="card-bg-color text-center">
        {role.role_name}
      </Card.Header>
      <Card.Body className="text-center">
        <ul class="list-group">
          {role.activities.map((activity) => (
            <li key={activity._id} class="list-group-item">
              <Button
                className="btn btn-secondary btn-xs btn-block"
                onClick={() => navigate(`/activities/${activity._id}`)}
              >
                {activity.activity_name}
              </Button>
            </li>
          ))}
        </ul>
        <Button
          variant="outline-warning"
          onClick={() => navigate(`/roles/${role._id}`)}
        >
          Modifier
        </Button>
        <Button variant="outline-danger" onClick={() => deleteRole(role._id)}>
          Supprimer
        </Button>
      </Card.Body>
    </Card>
  );
}
