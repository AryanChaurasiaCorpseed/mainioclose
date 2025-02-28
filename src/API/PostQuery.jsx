import axios from "axios";

const localData = JSON.parse(
  JSON.parse(localStorage?.getItem("persist:root"))?.auth
);

export const postQuery = (URL, data) => {
  return axios.post(URL, data, {
    headers: {
      Authorization: `Bearer ${localData?.jwt}`,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  });
};

export const postQueryWithoutDestructure = (URL, data) => {
  return axios.post(URL, data, {
    headers: {
      Authorization: `Bearer ${localData?.jwt}`,
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  });
};
