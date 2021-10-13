import { getXMLNodeValue, getXmlNodeValueAttr } from "./xml";
import { toCurrency } from "./values";

import moment from "moment";

export function parseNfeData(XML) {
  const infNfeId = getXmlNodeValueAttr(XML, "infNFe", "Id");
  const obj = {
    // orderId: nf.orderId,
    chaveNfe:
      getXMLNodeValue(XML, ["chNFe"]) || infNfeId.substr(infNfeId.length - 44),
    nf: getXMLNodeValue(XML, ["nNF"]),
    serie: getXMLNodeValue(XML, ["serie"]),
    natureza: getXMLNodeValue(XML, ["natOp"]),
    emissao: moment(getXMLNodeValue(XML, ["dhEmi"]).slice(0, 10)).format(
      "DD/MM/YYYY"
    ),
    tipoEmissao: getXMLNodeValue(XML, ["tpNF"]),
    totalNf: +getXMLNodeValue(XML, ["vNF"]),
    protocoloAutorizacao: getXMLNodeValue(XML, ["nProt"]),
    dataAutorizacao: moment(getXMLNodeValue(XML, ["dhRecbto"])).format(
      "DD/MM/YYYY HH:mm:ss"
    ),
    dataSaida: moment(getXMLNodeValue(XML, ["dhSaiEnt"]).slice(0, 10)).format(
      "DD/MM/YYYY"
    ),
    horaSaida: moment(getXMLNodeValue(XML, ["dhSaiEnt"])).format("HH:mm:ss"),
    emissor: {
      cnpj: getXMLNodeValue(XML, ["emit", "CNPJ"]),
      razaosocial: getXMLNodeValue(XML, ["emit", "xNome"]),
      endereco: getXMLNodeValue(XML, ["emit", "enderEmit", "xLgr"]),
      num: getXMLNodeValue(XML, ["emit", "enderEmit", "nro"]),
      complemento: getXMLNodeValue(XML, ["emit", "enderEmit", "xCpl"]),
      bairro: getXMLNodeValue(XML, ["emit", "enderEmit", "xBairro"]),
      cidade: getXMLNodeValue(XML, ["emit", "enderEmit", "xMun"]),
      uf: getXMLNodeValue(XML, ["emit", "enderEmit", "UF"]),
      cep: getXMLNodeValue(XML, ["emit", "enderEmit", "CEP"]),
      pais: getXMLNodeValue(XML, ["emit", "enderEmit", "xPais"]),
      fone: getXMLNodeValue(XML, ["emit", "enderEmit", "fone"]),
      ie: getXMLNodeValue(XML, ["emit", "IE"]),
      iest: getXMLNodeValue(XML, ["emit", "IEST"]),
    },
    dest: {
      cpf: getXMLNodeValue(XML, ["dest", "CPF"]),
      nome: getXMLNodeValue(XML, ["dest", "xNome"]),
      endereco: getXMLNodeValue(XML, ["dest", "enderDest", "xLgr"]),
      num: getXMLNodeValue(XML, ["dest", "enderDest", "nro"]),
      complemento: getXMLNodeValue(XML, ["dest", "enderDest", "xCpl"]),
      bairro: getXMLNodeValue(XML, ["dest", "enderDest", "xBairro"]),
      cidade: getXMLNodeValue(XML, ["dest", "enderDest", "xMun"]),
      uf: getXMLNodeValue(XML, ["dest", "enderDest", "UF"]),
      cep: getXMLNodeValue(XML, ["dest", "enderDest", "CEP"]),
      pais: getXMLNodeValue(XML, ["dest", "enderDest", "xPais"]),
      fone: getXMLNodeValue(XML, ["dest", "enderDest", "fone"]),
    },
    total: {
      baseIcms: toCurrency(+getXMLNodeValue(XML, ["total", "ICMSTot", "vBC"])),
      icms: toCurrency(+getXMLNodeValue(XML, ["total", "ICMSTot", "vICMS"])),
      bcst: toCurrency(+getXMLNodeValue(XML, ["total", "ICMSTot", "vBCST"])),
      st: toCurrency(+getXMLNodeValue(XML, ["total", "ICMSTot", "vST"])),
      pis: toCurrency(+getXMLNodeValue(XML, ["total", "ICMSTot", "vPIS"])),
      ii: toCurrency(+getXMLNodeValue(XML, ["total", "ICMSTot", "vII"])),
      totalProd: toCurrency(
        +getXMLNodeValue(XML, ["total", "ICMSTot", "vProd"])
      ),
      frete: toCurrency(+getXMLNodeValue(XML, ["total", "ICMSTot", "vFrete"])),
      seguro: toCurrency(+getXMLNodeValue(XML, ["total", "ICMSTot", "vSeg"])),
      desconto: toCurrency(
        +getXMLNodeValue(XML, ["total", "ICMSTot", "vDesc"])
      ),
      outros: toCurrency(+getXMLNodeValue(XML, ["total", "ICMSTot", "vOutro"])),
      ipi: toCurrency(+getXMLNodeValue(XML, ["total", "ICMSTot", "vIPI"])),
      cofins: toCurrency(
        +getXMLNodeValue(XML, ["total", "ICMSTot", "vCOFINS"])
      ),
      totalNF: toCurrency(+getXMLNodeValue(XML, ["total", "ICMSTot", "vNF"])),
    },
    transp: {
      mod: getXMLNodeValue(XML, ["transp", "modFrete"]),
      cnpj: getXMLNodeValue(XML, ["transp", "transporta", "CNPJ"]),
      nome: getXMLNodeValue(XML, ["transp", "transporta", "xNome"]),
      endereco: getXMLNodeValue(XML, ["transp", "transporta", "xEnder"]),
      cidade: getXMLNodeValue(XML, ["transp", "transporta", "xMun"]),
      uf: getXMLNodeValue(XML, ["transp", "transporta", "UF"]),
      ie: getXMLNodeValue(XML, ["transp", "transporta", "IE"]),
      placa: getXMLNodeValue(XML, ["transp", "veicTransp", "placa"]),
      ufVeic: getXMLNodeValue(XML, ["transp", "veicTransp", "UF"]),
      rntc: getXMLNodeValue(XML, ["transp", "veicTransp", "RNTC"]),
    },
    volumes: {
      qtde: getXMLNodeValue(XML, ["transp", "vol", "qVol"]),
      esp: getXMLNodeValue(XML, ["transp", "vol", "esp"]),
      marca: getXMLNodeValue(XML, ["transp", "vol", "marca"]),
      nVol: getXMLNodeValue(XML, ["transp", "vol", "nVol"]),
      pesoL: getXMLNodeValue(XML, ["transp", "vol", "pesoL"]),
      pesoB: getXMLNodeValue(XML, ["transp", "vol", "pesoB"]),
    },
    info: {
      adic: getXMLNodeValue(XML, ["infAdic", "infCpl"]),
      fisco: getXMLNodeValue(XML, ["infAdic", "infAdFisco"]),
    },
    items: getNFItems(XML)?.map((item) => getNFItemNodeValue(item)),
  };

  return obj;
}

function getNFItems(XML) {
  try {
    return Array.from(XML.getElementsByTagName("det"));
  } catch (err) {
    console.log(err);
  }
}

function getNFItemNodeValue(item) {
  try {
    const cProd = item.getElementsByTagName("cProd");
    const xProd = item.getElementsByTagName("xProd");
    const ncm = item.getElementsByTagName("NCM");
    const cfop = item.getElementsByTagName("CFOP");
    const uCom = item.getElementsByTagName("uCom");
    const qCom = item.getElementsByTagName("qCom");
    const vUnCom = item.getElementsByTagName("vUnCom");
    const vProd = item.getElementsByTagName("vProd");
    const icms = item.getElementsByTagName("ICMS00");

    return Object.assign(
      {},
      {
        cProd: cProd.length ? cProd[0].childNodes[0].nodeValue : null,
        xProd: xProd.length ? xProd[0].childNodes[0].nodeValue : null,
        ncm: ncm.length ? ncm[0].childNodes[0].nodeValue : 0,
        cfop: cfop.length ? cfop[0].childNodes[0].nodeValue : 0,
        uCom: uCom.length ? uCom[0].childNodes[0].nodeValue : null,
        qCom: qCom.length ? qCom[0].childNodes[0].nodeValue : null,
        vUnCom: vUnCom.length ? vUnCom[0].childNodes[0].nodeValue : null,
        vProd: vProd.length ? vProd[0].childNodes[0].nodeValue : null,
        bcIcms: icms.length
          ? icms[0].getElementsByTagName("vBC")[0].childNodes[0].nodeValue
          : 0,
        icms: icms.length
          ? icms[0].getElementsByTagName("vICMS")[0].childNodes[0].nodeValue
          : 0,
        aliqIcms: icms.length
          ? icms[0].getElementsByTagName("pICMS")[0].childNodes[0].nodeValue
          : 0,
      }
    );
  } catch (err) {
    console.error(err);
  }
}
