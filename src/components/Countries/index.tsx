import { useEffect, useState } from 'react';

import Card from "../Card"
import styled from 'styled-components';
import colors from '../../utils/colors';
import { Loader } from '../Loader';
import type { Country } from '../../utils/type';
import axios from 'axios';


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

const SearcheBar = styled.input`
    height: 30px;
    width: 220px;
    border-radius: 50px;
    margin-bottom: 6px;
`
const SearcheBarontainer = styled.p`
    position: relative;
    height: 100%;
    margin: 6px;
`

const regions = ["Africa", "Europe", "Asia", "Americas", "Oceania"]
const url = import.meta.env.VITE_URL_RESTCOUNTRIES_API
const token = import.meta.env.VITE_API_KEY

const getCountryName = (country: Country) => {
    return country.names?.native?.fra?.common
        ?? country.names?.common
        ?? country.names?.official
        ?? "Nom inconnu"
}

type data = {
    data:{
        objects:Country[]
    }
}

const Countries = () => {
    const [allCountries, setAllCountries] = useState<Country[]>([])
    const [countries, setCountries] = useState<Country[]>([])
    const [rangeValue, setrangeValue] = useState(countries.length)
    const [selectedRadio, setselectedRadio] = useState('')
    const [sortBy, setsortBy] = useState(0)
    const [searchValue, setSearchValue] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const api = axios.create({ baseURL: url });
        api.interceptors.request.use((config) => {
            
            if (token) {
                config.headers["Authorization"] = `Bearer ${token}`;
            }
            return config;
        });

        api
            .get(`q=stan&pretty=1&limit=100`)
            .then((reponse) => {
                const data: data = reponse.data;
                setCountries(data.data.objects);
                setrangeValue(data.data.objects.length)
                console.log(reponse.data);
            })
            .catch((err) => {
                console.log(">>>>>>>>>>>>>>>>>> " + err);
            })
            .finally(() => {
                setIsLoading(false)
                console.log("fin");
            });
    }, [])

    useEffect(() => {
        function applyFilter() {
            const filtered = countries
                .filter((item: Country) => selectedRadio ? item.region === selectedRadio : true)
                .slice(0, rangeValue)
                .filter((item: Country) => searchValue ? getCountryName(item).toLowerCase().includes(searchValue.toLowerCase()) : true)
                .sort((a: Country, b: Country) => sortBy == 1 ? a.population - b.population : 0)
                .sort((a: Country, b: Country) => sortBy == 2 ? b.population - a.population : 0)
                .sort((a: Country, b: Country) => sortBy == 3 ? getCountryName(a).localeCompare(getCountryName(b)) : 0)
                .sort((a: Country, b: Country) => sortBy == 4 ? getCountryName(b).localeCompare(getCountryName(a)) : 0);
            setAllCountries(filtered)
        }
        applyFilter()
    }, [selectedRadio, sortBy, rangeValue, searchValue, countries])


    function handleClick(e: React.MouseEvent<HTMLInputElement>) {
        if (selectedRadio === e.currentTarget.value) {
            setselectedRadio("");
        }
        else {
            setselectedRadio(e.currentTarget.value);
        }
    }

    console.log(countries)

    return (
        <div>
            <Title>Filtrer</Title>
            <FilterListContaiuner>
                <p>
                    <label htmlFor="">{rangeValue}</label>
                    <input type="range" min={1} max={250} defaultValue={100} onChange={(e) => {
                        setrangeValue(Number(e.target.value))
                    }} />
                </p>
                {
                    regions.map((item) => {
                        return <p>
                            <input
                                type="radio"
                                name="contientRadio"
                                checked={selectedRadio === item}
                                value={item} id={item}
                                onClick={(e) => {
                                    handleClick(e)
                                }} />
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
                        onClick={() => {
                            if (sortBy == 1)
                                setsortBy(0)
                            else
                                setsortBy(1)
                        }} />
                    <label htmlFor="population">Population(ordre croissant)</label>
                </p>

                <p>
                    <input type="radio" name='population'
                        checked={sortBy == 2}
                        onClick={() => {
                            if (sortBy == 2)
                                setsortBy(0)
                            else
                                setsortBy(2)
                        }} />
                    <label htmlFor="population">Population(ordre dévroissant)</label>
                </p>

                <p>
                    <input type="radio" name='nom'
                        checked={sortBy == 3}
                        onClick={() => {
                            if (sortBy == 3)
                                setsortBy(0)
                            else
                                setsortBy(3)
                        }} />
                    <label htmlFor="nom">Nom(A-Z)</label>
                </p>

                <p>
                    <input type="radio" name='nom'
                        checked={sortBy == 4}
                        onClick={() => {
                            if (sortBy == 4)
                                setsortBy(0)
                            else
                                setsortBy(4)
                        }} />
                    <label htmlFor="nom">Nom(Z-A)</label>
                </p>
                <SearcheBarontainer>
                    <label htmlFor="">Rechercher</label>
                    <SearcheBar
                        type="text"
                        value={searchValue}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            console.log(e.target.value)
                            setSearchValue(e.target.value)
                        }} />
                </SearcheBarontainer>
            </FilterListContaiuner>

            <CountriesContainer>
                {isLoading ? <Loader /> :
                    allCountries.map((country: Country, index) => (
                        <Card key={index} country={country} />
                    ))
                }

            </CountriesContainer>

        </div>
    )
}

export default Countries