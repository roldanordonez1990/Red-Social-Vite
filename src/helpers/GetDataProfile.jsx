import { Constantes } from "./Constantes";

export const GetDataProfile = async(userId, setUserDataProfile, token) => {
  const request = await fetch(Constantes.url_api+"user/getDataUserProfile/"+userId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: JSON.stringify(token),
      }
  })

  const data = await request.json()
  setUserDataProfile(data.user_finded);

}
