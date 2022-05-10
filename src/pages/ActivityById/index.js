import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import services from "../../services";

function ActivityById() {
  const [activity, setActivity] = useState({});
  let { idActivity } = useParams();

  useEffect(() => {
    services
      .getActivitiesById(idActivity)
      .then((response) => {
        console.log(response);
        setActivity(response);
      })
      .catch(console.log);
  }, []);

  return (
    <div>
      {" "}
      {idActivity} {activity.activity_name}
    </div>
  );
}

export default ActivityById;
