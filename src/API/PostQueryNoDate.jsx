import axios from "axios"
const localData = JSON.parse(JSON.parse(localStorage?.getItem("persist:root")).auth);

export const postQueryNoData = (URL) => {
  return axios.post(URL, {
    headers: {
      "Authorization": `Bearer ${localData?.jwt}`,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  })
}
