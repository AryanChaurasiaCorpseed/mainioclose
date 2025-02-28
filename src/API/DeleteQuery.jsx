import axios from "axios"
const localData = JSON.parse(JSON.parse(localStorage?.getItem("persist:root")).auth);

export const deleteQuery = (URL) =>{
    return(
        axios.delete(URL, {
            headers: {
                "Authorization": `Bearer ${localData?.jwt}`,
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
              },
        })
    )
}

