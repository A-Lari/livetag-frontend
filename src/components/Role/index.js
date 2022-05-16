import React from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import services from "../../services";
import("./Role.css");

export default function Role({ role, isFromParticipant = false }) {
  const navigate = useNavigate();

  const deleteRole = (idRole) => {
    services
      .deleteRole(idRole)
      .then((response) => {
        if (response.status === 401) {
          alert(response.data);
        }
        navigate(0);
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
        {!isFromParticipant && (
          <div>
            <Button
              variant="outline-warning"
              onClick={() => navigate(`/roles/${role._id}`)}
            >
              Modifier
            </Button>
            <Button
              variant="outline-danger"
              onClick={() => deleteRole(role._id)}
            >
              Supprimer
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}
