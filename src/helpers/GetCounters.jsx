import { Constantes } from "./Constantes";

export const GetCounters = async (userId, setCounters, token) => {
  const request = await fetch(Constantes.url_api + "user/counter/" + userId, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: JSON.stringify(token),
    },
  });

  const data = await request.json();

  if (data && data.message == Constantes.messages.contadorOk) {
    console.log("Contadores ok");
    setCounters(data);
  }
};
