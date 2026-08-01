import axios from "axios";
import { useEffect, useState } from "react";


function useFetch(url: string) {
    const [countries, setCountries] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const api = axios.create({ baseURL: url });

        api.interceptors.request.use((config) => {
            const token = import.meta.env.VITE_API_KEY
            if (token) {
                config.headers.set("Authorization", `Bearer ${token}`);
            }
            return config;
        });
        async function changeState() {
            setIsLoading(false)
        }
        api
      .get(`q=stan&limit=5&pretty=1response_fields=name,capital,area,flags,region,languages,population,idd,demonyms`)
      .then((reponse) => {
        setCountries(reponse.data);
      })
      .catch((err) => {
        console.log(">>>>>>>>>>>>>>>>>> " + err);
      })
      .finally(() => {
        console.log("fin");
      });
        


    }, [url])

    return { countries, isLoading }

}

export default useFetch