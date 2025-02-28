import axios from "axios"
const localData = JSON.parse(localStorage?.getItem("userDetails"));

export const getQueryWithBody = (URL, data) => {
  return axios.get(URL, {
    ...data,
    headers: {
      "Authorization": `Bearer ${localData?.token}`,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  })
}
