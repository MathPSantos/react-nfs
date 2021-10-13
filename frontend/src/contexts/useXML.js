import { createContext, useContext, useEffect, useState } from "react";

const XMLContext = createContext({});

export function XMLProvider({ children, receivedXML }) {
  const [parsedXML, setParsedXML] = useState();

  function parseReceivedXML(receivedXML) {
    const parser = new DOMParser();
    return parser.parseFromString(receivedXML, "application/xml");
  }

  useEffect(() => {
    if (receivedXML) setParsedXML(parseReceivedXML(receivedXML));
  }, [receivedXML]);

  return (
    <XMLContext.Provider value={{ xml: parsedXML }}>
      {children}
    </XMLContext.Provider>
  );
}

export function useXML() {
  return useContext(XMLContext);
}
