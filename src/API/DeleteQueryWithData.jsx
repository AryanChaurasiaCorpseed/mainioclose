import axios from "axios"
const localData = JSON.parse(JSON.parse(localStorage?.getItem("persist:root")).auth);

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

