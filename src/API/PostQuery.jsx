import axios from "axios";

const storageData = localStorage.getItem("userDetail");
let localData = null;
if (storageData) {
  try {
    localData = JSON.parse(storageData);
  } catch (error) {
    console.error("Error parsing JSON:", error);
  }
} else {
  console.warn("user detail not found in localStorage");
}

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
