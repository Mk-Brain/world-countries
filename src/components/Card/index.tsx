import { useRef } from "react"
import type { country } from "../Countries"
import styled from "styled-components"
import colors from "../../utils/colors"
import { Link } from "react-router-dom"
const Container = styled.div`
    height: 120px;
    width: 180px;
    position: relative;
    z-index: "1";
    margin: 1px;
    border: 1px solid #2c2c2c34;
    border-radius: 10px;
`
const CountryInfo = styled.form`
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

  const Dialogontainer = styled.dialog`
    padding: 16px;
    border: 1px solid #000;
    width: 300px;
    background-color: #fdfdfd;
    border-radius: 24px;
    &>*{
      font-size: 18px;
    }
  
  `

  const ClosedModalButton = styled.button`
      width: 120px;
      height: 40px;
      font-size: 18px;
      background-color: ${colors.secondary};
      color: ${colors.primary};
      font-weight: bold;
      border-radius: 16px;
      border: none;
      margin-left: 170px;
  `

const Card = ({country}: {country : country}) =>{
      const dialog = useRef<HTMLDialogElement>(null)
    
      const openHandler = () => {
        dialog.current?.showModal()
      }
    
      const closeHandler = () => {
        dialog.current?.close()
      }
    const {fra} = country.translations
    const {svg} = country.flags
    return (
        <Container onClick={openHandler}>
            <CountryInfo>
                <p>{fra.common}</p>
               
                    {country.capital.map((item)=>{
                        return <p>{item}</p>
                    })
                }
             
                <p>{country.region}</p>
                <p>{country.population.toLocaleString()}</p>
            </CountryInfo>
            
            <FlagCountry src={svg} alt="erreur" />
            <>
            <Dialogontainer ref={dialog} onBlur={closeHandler}>
                <img src={country.flags.svg} alt="Drapeau"
                    style={
                        {
                            width: "120px",
                            height: "90px",
                            marginLeft: "90px"
                        }
                    }
                />
                <p><strong>Nom : </strong>{country.translations.fra.common} </p>
                <p><strong>Capital : </strong>{country.capital?.join(", ")}</p>
                <p><strong>Population : </strong>{country.population.toLocaleString()} habitants</p>
                <p><strong>Continent :</strong>{country.region}</p>
                <p><strong>Habitants: </strong>{country.demonyms.fra.f}</p>
                <p><strong>superficie: </strong>{country.area } km²</p>
                <p><strong>Code téléphonique: </strong>{country.idd.root}</p>
                <p><strong>Langues officielles: </strong>{Object.values(country.languages).join(',')}</p>
                <Link style={
                    {
                        all: 'unset',
                        fontSize: "18px",
                        color: colors.logo,
                        textDecoration: "underline",
                        cursor: "pointer"
                    }
                } to={country.maps.googleMaps} target="blanc">Regarder sur la map</Link><br /><br />
                <ClosedModalButton onClick={closeHandler} type="button">
                Fermer
                </ClosedModalButton>
            </Dialogontainer>
        </>
        </Container>
    )
}

export default Card