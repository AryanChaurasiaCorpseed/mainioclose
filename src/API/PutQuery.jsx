import axios from "axios"

export const putQuery = (URL,data) =>{
    return(
        axios.put(URL, {
            ...data,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
              },
        })
    )
}