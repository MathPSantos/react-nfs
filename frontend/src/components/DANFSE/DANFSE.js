import { XMLProvider } from "../../contexts/useXML";

export function DANFSE({ children, xml }) {
  return <XMLProvider receivedXML={xml}>{children}</XMLProvider>;
}
