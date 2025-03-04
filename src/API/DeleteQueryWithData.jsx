import axios from "axios"
const persistRoot = localStorage.getItem("persist:root");
let localData = null;
if (persistRoot) {
  try {
    localData = JSON.parse(JSON.parse(persistRoot)?.auth);
  } catch (error) {
    console.error("Error parsing JSON:", error);
  }
} else {
  console.warn("persist:root not found in localStorage");
}

export const deleteQueryWithData = (URL,data) =>{
    return(
        axios.delete(URL, {
            data,
            headers: {
               "Authorization": `Bearer ${localData?.jwt}`,
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
              },
        })
    )
}

