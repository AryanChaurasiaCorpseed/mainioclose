import axios from "axios"

export const getQueryWithBody = (URL, data) => {
  return axios.get(URL, {
    ...data,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  })
}
