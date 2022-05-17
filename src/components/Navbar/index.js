import { Link } from "react-router-dom";
import { Alert, Container, Row, Col, Badge, NavLink } from "react-bootstrap";
import { useAuth } from "../../AuthProvider";
import { useEvent } from "../../EventInUse";
import "./Navbar.css";

export default function NavBar() {
  const { connected, disconnect } = useAuth();
  const { eventChoice, eventSelect } = useEvent();

  return (
    <Container fluid="xl" className="p-1 navbar-perso">
      <Row className="align-items-middle justify-content-center">
        <Col className="text-left">
          <img src="../../logo192.png" className=" logo-img" />
        </Col>
        {connected === false && (
          <Col className="nav-links text-center">
            <Link className="home-link" to="/">
              BIENVENUE
            </Link>
          </Col>
        )}
        {connected && !eventChoice && (
          <Col className="nav-links text-center">
            <Link className="project-link" to="/events">
              Evénements
            </Link>
          </Col>
        )}
        {connected && eventChoice && (
          <Col className="nav-links text-center">
            <Link className="project-link" to="/events">
              <Badge bg="info">{eventSelect.event_name}</Badge>{" "}
            </Link>
          </Col>
        )}
        {connected === true && (
          <Col className="nav-links text-right">
            <a className="project-link" href="/" onClick={disconnect}>
              Se déconnecter
            </a>
          </Col>
        )}
        {connected === false && (
          <Col className="nav-links text-right" md="auto">
            <Link className="project-link" to="/login">
              Se connecter
            </Link>
          </Col>
        )}
        {connected === false && (
          <Col className="nav-links text-right" md="auto">
            <Link className="project-link" to="/signup">
              S'inscrire
            </Link>
          </Col>
        )}
      </Row>
      <Row className="justify-content-center">
        <Col md="auto">
          {connected && eventChoice && (
            <Alert variant="primary" className="m-0">
              <Container className="p-0 h5">
                <Row className="align-items-middle justify-content-center">
                  <Col className="text-center " md="auto">
                    <Link
                      className="project-link-second text-center"
                      to="/activities"
                    >
                      Activités
                    </Link>
                  </Col>
                  <Col className="text-center " md="auto">
                    <Link
                      className="project-link-second text-center"
                      to="/roles"
                    >
                      Rôles
                    </Link>
                  </Col>
                  <Col className="text-center " md="auto">
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
