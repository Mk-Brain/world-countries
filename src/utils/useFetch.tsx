import { useEffect, useState } from "react";

function useFetch(url : string){
    const [countries, setCountries] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(()=>{
        function getCountries(url : string){
            fetch(url).then(
                (response)=>{
                    return response.json().then(
                        (data)=>setCountries(data)
                    )
                }
            )
        }
        async function changeState(){
            setIsLoading(false)
        }

        try {
                getCountries(url)
            } catch (error) {
                alert(error)
            }finally{
                changeState()
            }
        
        
    },[url])

    return { countries, isLoading }

}

export default useFetch