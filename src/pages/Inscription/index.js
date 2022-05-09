import { useParams } from "react-router-dom";
import "./Inscription.css";

const Inscription = () => {

  let { id } = useParams();
  console.log(id);

  return (
    <div className="inscription">
      <p>INSCRIPTION PAGE</p>
    </div>
  );
};

export default Inscription;
