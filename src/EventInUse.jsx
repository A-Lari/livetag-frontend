import { createContext, useEffect, useState, useContext } from "react";

const EventCtxt = createContext(null);

export default function EventInuse({ children }) {
  const [eventChoice, setEventChoice] = useState(false);
  const [event, setEvent] = useState("");

  useEffect(() => {
    setEventChoice(Boolean(event));
  }, []);

  const value = { eventChoice, setEventChoice, event, setEvent };

  return <EventCtxt.Provider value={value}>{children}</EventCtxt.Provider>;
}

export function useEvent() {
  const context = useContext(EventCtxt);
  return context;
}
