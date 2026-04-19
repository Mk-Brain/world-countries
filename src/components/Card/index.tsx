import styled from "styled-components"
import type { country } from "../Countries"

const Container = styled.div`
    width: 150;
    height: 100;
`
const CountiyInfo = styled.form`
    position: absolute;
    display: flex;
    flex-direction: column;
`
const FlagCountry = styled.img`
    width: 150px;
    height: 100px;
    object-fit: contain;
`

const Card = ({country}: {country : country}) =>{
    const {fra} = country.translations
    const {svg} = country.flags
    return (
        <Container>
            <CountiyInfo>
                <p>{fra.common}</p>
                {/*country.capitale.map((item)=>(<p>{item}</p>))*/}
                <p>{country.region}</p>
            </CountiyInfo>
            <FlagCountry src={svg} alt="erreur" />
        </Container>
    )
}

export default Card