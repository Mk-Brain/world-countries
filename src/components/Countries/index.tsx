import useFetch from "../../utils/useFetch"
import Card from "../Card"

export type country = {
    translations: object
    flags: object
    population: number
    capitale: []
    region: string
}

const Countries = () =>{
    const {isLoading, countries} = useFetch(`https://restcountries.com/v3.1/all?fields=translations,capital,flags,region,population`)
    console.log(countries)
    return (
        <div>
            {
                countries.map((country)=>(
                    <Card country={country}/>
                ))
            }
        </div>
    )
}

export default Countries