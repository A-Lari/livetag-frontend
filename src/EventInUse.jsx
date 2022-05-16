import { createContext, useEffect, useState, useContext } from "react";
import services from "./services";

const EventCtxt = createContext(null);

export default function EventInuse({ children }) {
  const [eventChoice, setEventChoice] = useState(false);
  const [event, setEvent] = useState("");

  useEffect(() => {
    const idEvent = localStorage.getItem("idEvent");
    services.getEventById(idEvent).then((event) => {
      setEvent(event);
      setEventChoice(true);
    });
  }, []);

  const value = { eventChoice, setEventChoice, event, setEvent };

  return <EventCtxt.Provider value={value}>{children}</EventCtxt.Provider>;
}

export function useEvent() {
  const context = useContext(EventCtxt);
  return context;
}
