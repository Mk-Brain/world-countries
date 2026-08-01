import { useState } from "react"
import type { Country } from "../../utils/type"
import { Link } from "react-router-dom"
import * as isoCountries from "i18n-iso-countries"
import { ModalDialog } from "../Dialog"
import { BiDetail } from "react-icons/bi"
import { FaGlobeAfrica, FaUserAlt } from "react-icons/fa"
import { TiChartArea } from "react-icons/ti"
import DialogTitleSection from "../DialogTitleSection"



const Card = ({ country }: { country: Country }) => {

    const [isOpen, setIsOpen] = useState(false);

    //ouverture et fermeture du dialog
    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    // Récupération des informations du pays avec des valeurs par défaut si elles sont manquantes
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
    // Récupération des noms des pays frontaliers en français
    const bordersNames = country.borders
        ?.map(border => {
            const alpha2 = isoCountries.alpha3ToAlpha2(border);
            return alpha2 ? regionNamesFr.of(alpha2) : border;
        })
        .filter(Boolean);

    const borders = bordersNames?.length > 0 ? bordersNames.join(", ") : "N/A";
    const memberships = Object.entries(country.memberships ?? {}).filter(([, value]) => value).map(([key]) => key).join(", ") || "N/A"


    return (
        <div className="w-1/7 h-30 m-1 border rounded-lg overflow-hidden relative cursor-pointer" onClick={handleOpen}>
            <div className="w-full h-full flex flex-col items-center justify-center gap-1 bg-gray-950/0  text-sm font-semibold hover:bg-gray-950/80 text-transparent hover:text-gray-100 transition-all duration-300 absolute overflow-auto" >
                <p className="text-center ">{countryName}</p>
                <p className="text-center ">{capitalNames}</p>
                <p className="text-center ">{region}</p>
                <p className="text-center ">{population}</p>
            </div>

            {flagUrl && <img className="w-full h-full object-cover" src={flagUrl} alt={`Drapeau de ${countryName}`} />}
            <>
                <ModalDialog isOpen={isOpen} onClose={handleClose} title={"Details du pays : " + countryName}>
                    <div className="w-full flex items-center justify-center">
                        <img src={flagUrl} alt="Drapeau"
                            style={
                                {
                                    width: "120px",
                                    height: "90px",

                                }
                            }
                        />
                    </div>
                    <div className="mt-3">
                        <DialogTitleSection>
                            <BiDetail />
                            <p>Général</p>
                        </DialogTitleSection>
                        <p><strong>Nom : </strong>{countryName} </p>
                        <p><strong>Nom officiel : </strong>{officialName}</p>
                        <p><strong>Capitale : </strong>{capitalNames}</p>
                        <p><strong>Population : </strong>{population} habitants</p>
                        <p><strong>Langues officielles: </strong>{languages || "Non renseignées"}</p>
                        <p><strong>Monnaie: </strong>{currency}</p>
                    </div>

                    <div className="mt-3">
                        <DialogTitleSection>
                            <TiChartArea />
                            <p>Géographi</p>
                        </DialogTitleSection>
                        <p><strong>Continent :</strong>{region}</p>
                        <p><strong>Région: </strong>{subRegion}</p>
                        <p><strong>superficie: </strong>{area} km²</p>
                        <p><strong>Pays frontaliers: </strong>{borders}</p>
                    </div>

                    <div className="mt-3">
                        <DialogTitleSection>
                            <FaUserAlt />
                            <p>Autres</p>
                        </DialogTitleSection>
                        <p><strong>Code alpha2: </strong>{code_alpha2}</p>
                        <p><strong>Code alpha3: </strong>{code_alpha3}</p>
                        <p><strong>Code téléphonique: </strong> +{callingCodes}</p>
                        <p><strong>Habitants: </strong>{demonym}</p>
                        <p><strong>Unités: </strong>{units}</p>
                        <p><strong>Appartenance: </strong>{memberships}</p>
                    </div>
                    <Link to={link} target="_blank"><div className="flex  justify-center  mt-3justify-center mb-3 border border-gray-900 rounded-md p-1 mt-3">
                        <DialogTitleSection>
                            <FaGlobeAfrica />
                            <Link to={link} target="_blank">Regarder sur la map</Link>
                        </DialogTitleSection>
                    </div></Link>
                </ModalDialog>
            </>
        </div>
    )
}

export default Card