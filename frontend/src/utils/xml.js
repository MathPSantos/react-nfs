export function getXMLNodeValue(XML, tags) {
  try {
    const elements = XML.getElementsByTagName(tags[0])[0];

    if (tags.length > 1) {
      const doc = new DOMParser().parseFromString(
        elements.outerHTML,
        "application/xml"
      );

      return getXMLNodeValue(doc, tags.splice(1));
    }

    const value = getElementNodeValue(elements);

    return value;
  } catch (err) {
    console.error(err);
    return "";
  }
}

export function getElementNodeValue(element) {
  return element.childNodes[0].nodeValue || "";
}

export function getXmlNodeValueAttr(XML, tag, attr) {
  try {
    const element = XML.getElementsByTagName(tag)[0];
    return getAttrNodeValue(element, attr);
  } catch (err) {
    console.error(err);
    return "";
  }
}

export function getAttrNodeValue(element, attr) {
  return element.getAttributeNode(attr)?.nodeValue || "";
}
