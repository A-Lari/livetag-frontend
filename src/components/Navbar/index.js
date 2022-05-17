import { Link } from "react-router-dom";
import { Alert, Container, Row, Col, Badge } from "react-bootstrap";
import { useAuth } from "../../AuthProvider";
import { useEvent } from "../../EventInUse";
import "./Navbar.css";

export default function NavBar() {
  const { connected, disconnect } = useAuth();
  const { eventChoice, eventSelect } = useEvent();

  return (
    <Container fluid="xl" className="p-1 navbar-perso">
      <Row className="align-items-middle ">
        <Col xs={3} className="text-center">
          <img src="../../logo192.png" className=" logo-img" />
        </Col>
        <Col className="nav-links text-center">
          <Link className="home-link" to="/">
            Accueil
          </Link>
        </Col>
        <Col className="nav-links text-center">
          {connected && (
            <Link className="project-link" to="/events">
              Evénements
            </Link>
          )}
        </Col>
        <Col className="nav-links text-center">
          {connected === true && (
            <a className="project-link" href="/" onClick={disconnect}>
              Se déconnecter
            </a>
          )}
        </Col>
        <Col className="nav-links text-center">
          {connected === false && (
            <Link className="project-link" to="/login">
              Se connecter
            </Link>
          )}
        </Col>
        <Col className="nav-links text-center">
          {connected === false && (
            <Link className="project-link" to="/signup">
              S'inscrire
            </Link>
          )}
        </Col>
      </Row>
      <Row>
        <Col>
          {connected && eventChoice && (
            <Alert variant="primary" className="m-0">
              <Container className="p-0 h5">
                <Row className="align-items-middle">
                  <Col className="text-center">
                    <Link className="project-link" to="/events">
                      <Badge bg="info">{eventSelect.event_name}</Badge>{" "}
                    </Link>
                  </Col>
                  <Col>
                    <Link
                      className="project-link-second text-center"
                      to="/activities"
                    >
                      Activités
                    </Link>
                  </Col>
                  <Col>
                    <Link
                      className="project-link-second text-center"
                      to="/roles"
                    >
                      Rôles
                    </Link>
                  </Col>
                  <Col>
                    <Link
                      className="project-link-second text-center"
                      to="/participants"
                    >
                      Participants
                    </Link>
                  </Col>
                </Row>
              </Container>{" "}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
}
