import { useEffect, useState } from "react";

import Card from "../Card";
import { Loader } from "../Loader";
import type { Country } from "../../utils/type";
import axios from "axios";
import { IoSearchSharp } from "react-icons/io5";

const regions = ["Africa", "Europe", "Asia", "Americas", "Oceania"];
const url = import.meta.env.VITE_URL_RESTCOUNTRIES_API;
const token = import.meta.env.VITE_API_KEY;

// Fonction pour obtenir le nom du pays en français, avec des valeurs par défaut si elles sont manquantes
const getCountryName = (country: Country) => {
  return (
    country.names?.native?.fra?.common ??
    country.names?.common ??
    country.names?.official ??
    "Nom inconnu"
  );
};

// Définition du type pour la réponse de l'API
type data = {
  data: {
    objects: Country[];
  };
};

const Countries = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [finalListCountries, setfinalListCountries] = useState<Country[]>([]);
  const [rangeValue, setrangeValue] = useState(countries.length);
  const [selectedRadio, setselectedRadio] = useState("");
  const [sortBy, setsortBy] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Récupération des données de l'API REST Countries
  useEffect(() => {
    function fetchData() {
      setIsLoading(true);
      const api = axios.create({ baseURL: url });
      api.interceptors.request.use((config) => {
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      });

      api.interceptors.request.use((config) => {
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      });

      api
        .get(`q=stan&pretty=1&limit=100`) //limite pour le plan gratuit de l'API REST Countries
        .then((reponse) => {
          const data: data = reponse.data;
          setCountries(data.data.objects);
          setrangeValue(data.data.objects.length);
          console.log(reponse.data);
        })
        .catch((err) => {
          console.log(">>>>>>>>>>>>>>>>>> " + err);
        })
        .finally(() => {
          setIsLoading(false);
          console.log("fin");
        });
    }
    fetchData();
  }, []);

  // Application des filtres, du tri et de la recherche sur la liste des pays
  useEffect(() => {
    function applyFilter() {
      const filtered = countries
        .filter((item: Country) =>
          selectedRadio ? item.region === selectedRadio : true,
        )
        .slice(0, rangeValue)
        .filter((item: Country) =>
          searchValue
            ? getCountryName(item)
              .toLowerCase()
              .includes(searchValue.toLowerCase())
            : true,
        )
        .sort((a: Country, b: Country) =>
          sortBy == 1 ? a.population - b.population : 0,
        )
        .sort((a: Country, b: Country) =>
          sortBy == 2 ? b.population - a.population : 0,
        )
        .sort((a: Country, b: Country) =>
          sortBy == 3 ? getCountryName(a).localeCompare(getCountryName(b)) : 0,
        )
        .sort((a: Country, b: Country) =>
          sortBy == 4 ? getCountryName(b).localeCompare(getCountryName(a)) : 0,
        );
      setfinalListCountries(filtered);
    }
    applyFilter();
  }, [selectedRadio, sortBy, rangeValue, searchValue, countries]);

  // Gestion du choix du filtre par région
  function handleClick(e: React.MouseEvent<HTMLInputElement>) {
    if (selectedRadio === e.currentTarget.value) {
      setselectedRadio("");
    } else {
      setselectedRadio(e.currentTarget.value);
    }
  }

  //console.log(countries);

  return (
    <div className="block h-full w-full">
      <h2>Filtrer</h2>
      <ul className="flex flex-row items-center justify-around bg-gray-900 rounded-2xl text-white h-12 cursor-pointer">
        <p className="flex flex-row items-center justify-center gap-2">
          <label htmlFor="">{rangeValue}</label>
          <input
            type="range"
            min={1}
            max={250}
            defaultValue={100}
            onChange={(e) => {
              setrangeValue(Number(e.target.value));
            }}
          />
        </p>
        {regions.map((item) => {
          return (
            <p
              key={item}
              className="flex flex-row items-center justify-center gap-2"
            >
              <input
                type="radio"
                name="contientRadio"
                checked={selectedRadio === item}
                value={item}
                id={item}
                onClick={(e) => {
                  handleClick(e);
                }}
              />
              <label htmlFor={item}>{item}</label>
            </p>
          );
        })}
      </ul>

      <h2>Tier par</h2>
      <ul className="flex flex-row items-center justify-around bg-gray-900 rounded-2xl text-white h-12 cursor-pointer">
        <p className="flex flex-row items-center justify-center gap-2">
          <input
            type="radio"
            name="population"
            checked={sortBy == 1}
            onClick={() => {
              if (sortBy == 1) setsortBy(0);
              else setsortBy(1);
            }}
          />
          <label htmlFor="population">Population(ordre croissant)</label>
        </p>

        <p className="flex flex-row items-center justify-center gap-2">
          <input
            type="radio"
            name="population"
            checked={sortBy == 2}
            onClick={() => {
              if (sortBy == 2) setsortBy(0);
              else setsortBy(2);
            }}
          />
          <label htmlFor="population">Population(ordre décroissant)</label>
        </p>

        <p className="flex flex-row items-center justify-center gap-2">
          <input
            type="radio"
            name="nom"
            checked={sortBy == 3}
            onClick={() => {
              if (sortBy == 3) setsortBy(0);
              else setsortBy(3);
            }}
          />
          <label htmlFor="nom">Nom(A-Z)</label>
        </p>

        <p className="flex flex-row items-center justify-center gap-2">
          <input
            type="radio"
            name="nom"
            checked={sortBy == 4}
            onClick={() => {
              if (sortBy == 4) setsortBy(0);
              else setsortBy(4);
            }}
          />
          <label htmlFor="nom">Nom(Z-A)</label>
        </p>
      </ul>
      <form
        action=""
        className="my-4 p-3 items-center rounded-xl  bg-gray-900 justify-start flex flex-row gap-2 w-1/2 h-12 shadow-md shadow-black/50"
      >
        <IoSearchSharp color="#ffffff" size={25} />
        <input
          name="search"
          className="appearance-none bg-transparent border-none outline-none focus:outline-none flex w-full text-white px-2 "
          type="text"
          placeholder="Rechercher un pays"
          value={searchValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            console.log(e.target.value);
            setSearchValue(e.target.value);
          }}
        />
      </form>
      {isLoading ? (
        <div className="flex items-center justify-center h-full w-screen">
          <Loader />
        </div>
      ) : (
        <div className="flex flex-row items-center justify-center gap-2 flex-wrap">
          {finalListCountries.map((country: Country, index) => (
            <Card key={index} country={country} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Countries;
