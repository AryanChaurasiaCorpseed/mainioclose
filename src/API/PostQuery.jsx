import axios from "axios"

export const postQuery = (URL, data) => {
  return axios.post(URL, {
    ...data,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  })
}

export const postQueryWithoutDestructure = (URL, data) => {
  return axios.post(URL,data, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  })
}
