import { useRef } from "react"
import type { Country } from "../../utils/type"
import styled from "styled-components"
import colors from "../../utils/colors"
import { Link } from "react-router-dom"
import * as isoCountries from "i18n-iso-countries"

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

const Card = ({ country }: { country: Country }) => {
    const dialog = useRef<HTMLDialogElement>(null)

    const openHandler = () => {
        dialog.current?.showModal()
    }

    const closeHandler = () => {
        dialog.current?.close()
    }

    const countryName = country.names?.native?.fra?.common
        ?? country.names?.official
        ?? "Nom inconnu"

    const officialName = country.names?.native?.fra?.official
        ?? country.names?.official
        ?? "Nom inconnu"

    const capitalNames = country.capitals?.map((capital) => capital.name).filter(Boolean).join(", ") ?? "Non renseignée"
    const flagUrl = country.flag?.url_svg ?? ""
    const region = country.region ?? "Non renseigné"
    const population = country.population?.toLocaleString() ?? "N/A"
    const area = country.area.kilometers
    const demonym = (country.demonyms?.fra?.m ?? country.demonyms?.eng?.m ?? "N/A") + " / " + (country.demonyms?.fra?.f ?? country.demonyms?.eng?.f ?? "N/A")
    const languages = Array.isArray(country.languages)
        ? country.languages.map((language) => language?.name).filter((name): name is string => Boolean(name)).join(", ")
        : Object.values(country.languages ?? {}).filter((value): value is string => typeof value === "string").join(", ")
    const callingCodes = country.calling_codes?.length > 0 ? country.calling_codes.join(", ") : "N/A"
    const subRegion = country.subregion ?? "Non renseigné"
    const units = (country.units.measurement_system ?? "N/A") + " / " + (country.units.temperature_scale ?? "N/A")
    const currency = country.currencies?.map((currency) => currency.name).filter(Boolean).join(", ") ?? "Non renseignée"
    const code_alpha2 = country.codes?.alpha2 ?? "N/A"
    const code_alpha3 = country.codes?.alpha3 ?? "N/A"
    const link = `https://www.google.com/maps/search/?api=1&query=${countryName}`
    const regionNamesFr = new Intl.DisplayNames(['fr'], { type: 'region' });
    const bordersNames = country.borders
        ?.map(border => {
            const alpha2 = isoCountries.alpha3ToAlpha2(border);
            return alpha2 ? regionNamesFr.of(alpha2) : border;
        })
        .filter(Boolean);

    const borders = bordersNames?.length > 0 ? bordersNames.join(", ") : "N/A";
    const memberships = Object.entries(country.memberships ?? {}).filter(([, value]) => value).map(([key]) => key).join(", ") || "N/A"
    return (
        <Container onClick={openHandler}>
            <CountryInfo>
                <p>{countryName}</p>

                <p>{capitalNames}</p>

                <p>{region}</p>
                <p>{population}</p>
            </CountryInfo>

            {flagUrl && <FlagCountry src={flagUrl} alt={`Drapeau de ${countryName}`} />}
            <>
                <Dialogontainer ref={dialog} onBlur={closeHandler}>
                    <img src={flagUrl} alt="Drapeau"
                        style={
                            {
                                width: "120px",
                                height: "90px",
                                marginLeft: "90px"
                            }
                        }
                    />
                    <p><strong>Nom : </strong>{countryName} </p>
                    <p><strong>Nom officiel : </strong>{officialName}</p>
                    <p><strong>Capital : </strong>{capitalNames}</p>
                    <p><strong>Population : </strong>{population} habitants</p>
                    <p><strong>Continent :</strong>{region}</p>
                    <p><strong>Habitants: </strong>{demonym}</p>
                    <p><strong>superficie: </strong>{area} km²</p>
                    <p><strong>Code téléphonique: </strong> +{callingCodes}</p>
                    <p><strong>Langues officielles: </strong>{languages || "Non renseignées"}</p>
                    <Link style={
                        {
                            all: 'unset',
                            fontSize: "18px",
                            color: colors.logo,
                            textDecoration: "underline",
                            cursor: "pointer"
                        }
                    } to={link} target="_blank">Regarder sur la map</Link><br /><br />
                    <p><strong>Monnaie: </strong>{currency}</p>
                    <p><strong>Code alpha2: </strong>{code_alpha2}</p>
                    <p><strong>Code alpha3: </strong>{code_alpha3}</p>
                    <p><strong>Région: </strong>{subRegion}</p>
                    <p><strong>Unités: </strong>{units}</p>
                    <p><strong>Pays frontaliers: </strong>{borders}</p>
                    <p><strong>Appartenance: </strong>{memberships}</p>

                    <ClosedModalButton onClick={closeHandler} type="button">
                        Fermer
                    </ClosedModalButton>
                </Dialogontainer>
            </>
        </Container>
    )
}

export default Card