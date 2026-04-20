import React, { useState } from 'react';
import useFetch from "../../utils/useFetch"
import Card from "../Card"
import styled from 'styled-components';
import colors from '../../utils/colors';


export type country = {
    translations: object
    flags: object
    population: number
    capital: []
    region: string
}

const FilterListContaiuner = styled.ul`
    display: flex;
    justify-content: space-around;
    background-color: ${colors.secondary};
    border-radius: 12px;
    color: ${colors.primary};
    & input{
        cursor: pointer;
    }
`

const CountriesContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
`

const regions = ["Africa", "Europe", "Asia", "Americas", "Oceania"]

const Countries = () =>{
    const {isLoading, countries} = useFetch(`https://restcountries.com/v3.1/all?fields=idd,translations,capital,flags,region,population`)
    const [rangeValue, setrangeValue] = useState(250)
    const [selectedRadio, setselectedRadio] = useState('')
    const [filterByPopulation, setfilterByPopulation] = useState(false)
    //console.log(countries)
    return (
        <div>
            <FilterListContaiuner>
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
                
                
            </FilterListContaiuner>
            
            <CountriesContainer>
                {
                countries
                .slice(0, rangeValue)
                .filter((item : country)=>selectedRadio ? item.region === selectedRadio : true)
                .sort((a : country, b : country)=>filterByPopulation ? a.population - b.population : 0)
                .map((country : country, index)=>(
                    <Card key={index} country={country}/>
                ))
            }
            </CountriesContainer>
            
        </div>
    )
}

export default Countries