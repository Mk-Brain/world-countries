import React, { useState } from 'react';
import useFetch from "../../utils/useFetch"
import Card from "../Card"

export type country = {
    translations: object
    flags: object
    population: number
    capital: []
    region: string
}

const regions = ["Africa", "Europe", "Asia", "Americas", "Oceania"]

const Countries = () =>{
    const {isLoading, countries} = useFetch(`https://restcountries.com/v3.1/all?fields=idd,translations,capital,flags,region,population`)
    const [rangeValue, setrangeValue] = useState(250)
    const [selectedRadio, setselectedRadio] = useState('')
    //console.log(countries)
    return (
        <div>
            <ul>
                <input type="range" min={1} max={250} defaultValue={100} onChange={(e)=>{
                    setrangeValue(Number(e.target.value))
                }}/>
                {
                    regions.map((item)=>{
                        return <p>
                            <input 
                            type="radio" 
                            name="contientRadio" 
                            checked={selectedRadio === item} 
                            value={item} id={item} 
                            onClick={(e)=>{
                                if(selectedRadio === e.target.value){ 
                                    setselectedRadio("") 
                                }
                                else {
                                    setselectedRadio(e.target.value) 
                                }
                                
                                
                            }}/>
                            <label htmlFor={item}>{item}</label>
                        </p>
                    })
                }
            </ul>
            {
                countries
                .filter((item : country)=>selectedRadio ? item.region === selectedRadio : true)
                .slice(0, rangeValue)
                .map((country : country, index)=>(
                    <Card key={index} country={country}/>
                ))
            }
        </div>
    )
}

export default Countries