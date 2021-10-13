import { useEffect, useState } from "react";

import { DANFE, DANFSE } from "./components";
import { NFSeField } from "./components/DANFSE/NFSeField";

import { getLocalXML } from "./service/api";

import nfseXML from "./assets/nfse.xml";

import "./styles/index.scss";

function App() {
  const [nfse, setNfse] = useState();

  useEffect(() => {
    (async () => {
      const NFSeData = await getLocalXML(nfseXML);
      setNfse(NFSeData);
    })();
  }, []);

  return (
    <>
      <DANFE />

      <DANFSE xml={nfse}>
        <NFSeField label="" accessor={["Tomador", "RazaoSocial"]} />
      </DANFSE>
    </>
  );
}

export default App;
