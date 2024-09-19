import axios from "axios"

export const deleteQueryWithData = (URL,data) =>{
    return(
        axios.delete(URL, {
            data,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
              },
        })
    )
}

