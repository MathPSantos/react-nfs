import axios from "axios";

export async function getLocalXML(xml) {
  try {
    const response = await axios.get(xml, {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
      },
    });

    return response.data;
  } catch (err) {
    console.log(err);
  }
}
