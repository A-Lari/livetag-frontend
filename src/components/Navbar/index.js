import { Link } from "react-router-dom";
import { useAuth } from "../../AuthProvider";
import "./Navbar.css";

export default function NavBar() {
  const { connected, disconnect } = useAuth();

  return (
    <div className="navbar-perso">
      <div className="nav-links">
        <Link className="home-link" to="/">
          Home
        </Link>
        {connected === true && (
          <Link className="project-link" to="/events">
            Events
          </Link>
        )}

        {connected === true && (
          <Link className="project-link" to="/activities">
            Activities
          </Link>
        )}

        {connected === true && (
          <Link className="project-link" to="/participants">
            Participants
          </Link>
        )}
        {connected === true && (
          <a className="project-link" href="#" onClick={disconnect}>
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
