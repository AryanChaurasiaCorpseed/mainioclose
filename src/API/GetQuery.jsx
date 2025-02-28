import axios from "axios"
const localData = JSON.parse(JSON.parse(localStorage?.getItem("persist:root")).auth);

console.log('dlksjvhlaskdjhflaksdj',localData)


export const getQuery = (URL) =>{
    return(
        axios.get(URL, {
            headers: {
                "Authorization": `Bearer ${localData?.jwt}`,
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json",
              },
        })
    )
    
}
