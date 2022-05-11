import React from "react";
import { useParams } from "react-router-dom";
import EventsAdd from "../EventsAdd";

function EventEdit() {
  const { idEvent } = useParams();

  return (
    <div>
      <EventsAdd idEvent={idEvent}></EventsAdd>
    </div>
  );
}

export default EventEdit;
