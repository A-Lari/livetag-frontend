import React from "react";
import { useState } from "react";
import { Button, Card, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import services from "../../services";
import("./Role.css");

export default function Role({
  role,
  fecthAndSetListRoles,
  isFromParticipant = false,
}) {
  const [open, setOpen] = useState(false);
  const [response, setResponse] = useState({});
  const navigate = useNavigate();

  const deleteRole = (idRole) => {
    services
      .deleteRole(idRole)
      .then((response) => {
        if (response.status === 401) {
          setResponse(response);
          setOpen(true);
        }
        fecthAndSetListRoles();
      })
      .catch(console.log);
  };

  const generateInscriptionLink = (idRole) => {
    services
      .generateInscriptionLink(idRole)
      .then((response) => {
        alert("lien généré");
        fecthAndSetListRoles();
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
              {!isFromParticipant && (
                <Button
                  className="btn btn-secondary btn-xs btn-block"
                  onClick={() => navigate(`/activities/${activity._id}`)}
                >
                  {activity.activity_name}
                </Button>
              )}
              {isFromParticipant && (
                <Badge bg="secondary">{activity.activity_name}</Badge>
              )}
            </li>
          ))}
        </ul>
        {!isFromParticipant && role.link && (
          <div className="m-2">
            <Card.Link href={role.link} target="_blank">
              lien d'inscription
            </Card.Link>
            <CopyToClipboard text={role.link}>
              <Button variant="outline-info" size="sm">
                Copier lien
              </Button>
            </CopyToClipboard>
          </div>
        )}
        {!isFromParticipant && (
          <div>
            <Button
              variant="outline-warning"
              onClick={() => navigate(`/roles/${role._id}`)}
            >
              Modifier
            </Button>
            <Button
              variant="outline-success"
              onClick={() => generateInscriptionLink(role._id)}
            >
              Générer le lien
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
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
      >
        <Alert variant="filled" severity="warning">
          {response.data}
        </Alert>
      </Snackbar>
    </Card>
  );
}
