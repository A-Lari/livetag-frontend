import { Link } from "react-router-dom";
import { useAuth } from "../../AuthProvider";
import { useEvent } from "../../EventInUse";
import "./Navbar.css";

export default function NavBar() {
  const { connected, disconnect } = useAuth();
  const { eventChoice, event } = useEvent();

  return (
    <div className="navbar-perso">
      <img src="../../logo192.png" className=" logo logo-img" />
      <div className="nav-links">
        <Link className="home-link" to="/">
          Accueil
        </Link>
        {connected && (
          <Link className="project-link" to="/events">
            Evénements
          </Link>
        )}
        {connected && eventChoice && (
          <span class="badge badge-secondary"> : {event.event_name} </span>
        )}
        {connected && eventChoice && (
          <Link className="project-link-second" to="/activities">
            Activités
          </Link>
        )}

        {connected && eventChoice && (
          <Link className="project-link-second" to="/roles">
            Rôles
          </Link>
        )}

        {connected && eventChoice && (
          <Link className="project-link-second" to="/participants">
            Participants
          </Link>
        )}
        {connected === true && (
          <a className="project-link" href="/" onClick={disconnect}>
            Se déconnecter
          </a>
        )}
        {connected === false && (
          <Link className="project-link" to="/login">
            Se connecter
          </Link>
        )}
        {connected === false && (
          <Link className="project-link" to="/signup">
            S'inscrire
          </Link>
        )}
      </div>
    </div>
  );
}
