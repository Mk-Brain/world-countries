import styled from "styled-components"
import type { country } from "../Countries"
import colors from "../../utils/colors"
const Container = styled.div`
    height: 120px;
    width: 180px;
    position: relative;
    z-index: "1";
    margin: 1px;
    border: 1px solid #2c2c2c34;
    border-radius: 10px;
`
const CountiyInfo = styled.form`
    position: absolute;
    display: flex;
    flex-direction: column;
    padding-top: 10px;
    opacity: 0;
    font-weight: bold;
    height: 110px;
    width: 180px;
    font-size: 16px;
    background-color: ${colors.secondary};
    z-index: "10";
    transition: 0.5s;
    &>*{
        margin: 0px;
        text-align: center;
        color: ${colors.primary};
        z-index: "11";
    };
    &:hover{
         opacity: 0.8;
         font-size: 18px;
    };
    border-radius: 10px;

`
const FlagCountry = styled.img`
   height: 120px;
    width: 180px;
    object-fit: cover;
    border-radius: 10px;
`

const Card = ({country}: {country : country}) =>{
    const {fra} = country.translations
    const {svg} = country.flags
    return (
        <Container>
            <CountiyInfo>
                <p>{fra.common}</p>
               
                    {country.capital.map((item)=>{
                        return <p>{item}</p>
                    })
                }
             
                <p>{country.region}</p>
                <p>{country.population.toLocaleString()}</p>
            </CountiyInfo>
            
            <FlagCountry src={svg} alt="erreur" />
        </Container>
    )
}

export default Card