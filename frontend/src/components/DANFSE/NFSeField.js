import { useEffect, useState } from "react";

import { Cell } from "..";

import { useXML } from "../../contexts/useXML";

import { getXMLNodeValue } from "../../utils/xml";

export function NFSeField({ accessor, label = "" }) {
  const { xml } = useXML();
  const [value, setValue] = useState("");

  useEffect(() => {
    if (!accessor || !xml) return;

    const XMLValue = getXMLNodeValue(xml, accessor);

    setValue(XMLValue);
  }, [accessor, xml]);

  return <Cell value={value} label={label} />;
}
