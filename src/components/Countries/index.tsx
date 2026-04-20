import React, { useState } from 'react';
import useFetch from "../../utils/useFetch"
import Card from "../Card"
import styled from 'styled-components';
import colors from '../../utils/colors';


export type country = {
    translations: {
        fra: {
            common: string
        }
    }
    flags: object
    population: number
    capital: []
    region: string
}

const FilterListContaiuner = styled.ul`
    display: flex;
    flex-direction: raw;
    justify-content: space-around;
    background-color: ${colors.secondary};
    border-radius: 12px;
    color: ${colors.primary};
    & input{
        cursor: pointer;
    };
    height: 50px;
`

const CountriesContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
`
const Title = styled.h2`
    margin: 0px;
    padding: 0px;
`

const regions = ["Africa", "Europe", "Asia", "Americas", "Oceania"]

const Countries = () =>{
    const {isLoading, countries} = useFetch(`https://restcountries.com/v3.1/all?fields=idd,translations,capital,flags,region,population`)
    const [rangeValue, setrangeValue] = useState(250)
    const [selectedRadio, setselectedRadio] = useState('')
    const [sortBy, setsortBy] = useState(0)
    //console.log(countries)
    console.log(sortBy);
    
    return (
        <div>
            <Title>Filtrer</Title>
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

            <Title>Tier par</Title>
            <FilterListContaiuner>
                <p>
                    <input type="radio" name='population' 
                    checked={sortBy == 1}
                    onClick={()=>{
                        if (sortBy == 1)
                            setsortBy(0)
                        else
                            setsortBy(1)
                    }}/>
                    <label htmlFor="population">Population(ordre croissant)</label>
                </p>
                
                <p>
                    <input type="radio" name='population' 
                    checked={sortBy == 2}
                    onClick={()=>{
                        if (sortBy == 2)
                            setsortBy(0)
                        else
                            setsortBy(2)
                    }}/>
                    <label htmlFor="population">Population(ordre dévroissant)</label>
                </p>
                
                <p>
                    <input type="radio" name='nom' 
                    checked={sortBy == 3}
                    onClick={()=>{
                        if (sortBy == 3)
                            setsortBy(0)
                        else
                            setsortBy(3)
                    }}/>
                    <label htmlFor="nom">Nom(A-Z)</label>
                </p>
                
                <p>
                    <input type="radio" name='nom' 
                    checked={sortBy == 4}
                    onClick={()=>{
                        if (sortBy == 4)
                            setsortBy(0)
                        else
                            setsortBy(4)
                    }}/>
                    <label htmlFor="nom">Nom(Z-A)</label>
                </p>
                
            </FilterListContaiuner>
            
            <CountriesContainer>
                {
                countries
                .slice(0, rangeValue)
                .filter((item : country)=>selectedRadio ? item.region === selectedRadio : true)
                .sort((a : country, b : country)=>sortBy == 1 ? a.population - b.population : 0)
                .sort((a : country, b : country)=>sortBy == 2 ? b.population - a.population : 0)
                .sort((a : country, b : country)=>sortBy == 3 ? a.translations.fra.common.localeCompare(b.translations.fra.common)  : 0)
                .sort((a : country, b : country)=>sortBy == 4 ? b.translations.fra.common.localeCompare(a.translations.fra.common)  : 0)
                .map((country : country, index)=>(
                    <Card key={index} country={country}/>
                ))
            }
            </CountriesContainer>
            
        </div>
    )
}

export default Countries