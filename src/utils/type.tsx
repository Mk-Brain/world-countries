// --- Types de base & Utilitaires ---
export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Translation {
  common: string;
  official: string;
}

// --- Sous-structures ---
export interface CountryNames {
  common: string;
  official: string;
  native: {fra: Translation};
}

export interface CountryCodes {
  alpha_2: string;
  alpha_3: string;
  ccn3: string;
  fifa?: string;
  cioc?: string;
  [key: string]: string | undefined; // Capture d'autres codes potentiels
}

export interface Capital {
  name: string;
  primary: boolean;
  coordinates: Coordinates;
}

export interface Flag {
  emoji: string;
  url_svg: string;
  url_png: string;
  [key: string]: unknown;
}

export interface Area {
  kilometers: number;
  miles: number;
}

export interface Currency {
  code: string;
  name: string;
  symbol: string;
}

export interface Language {
  name: string;
  bcp47: string;
  [key: string]: unknown; // Pour capturer les sous-champs masqués dans l'exemple
}

export interface Leader {
  name: string;
  title: string;
  attributes: {
    head_of_government: boolean;
    head_of_state: boolean;
    [key: string]: boolean | unknown;
  };
  links: {
    wikipedia?: string;
    [key: string]: string | undefined;
  };
  assets: unknown[];
  [key: string]: unknown;
}

export interface Memberships {
  un?: boolean;
  nato?: boolean;
  g7?: boolean;
  g20?: boolean;
  commonwealth?: boolean;
  oecd?: boolean;
  [key: string]: boolean | undefined; // Permet de recevoir d'autres organisations
}

// --- Type Principal ---
export interface Country {
  uuid: string;
  names: CountryNames;
  codes: CountryCodes;
  capitals: Capital[];
  flag: Flag;
  region: string;
  subregion: string;
  area: Area;
  borders: string[];
  calling_codes: string[];
  currencies: Currency[];
  languages: Language[];
  leaders: Leader[];
  memberships: Memberships;
  population: number;
  timezones: string[];
  tlds: string[];

  // --- Groupes optionnels / masqués ---
  cars?: Record<string, unknown>;
  classification?: Record<string, unknown>;
  continents?: string[];
  coordinates?: Coordinates;
  date?: Record<string, unknown>;
  demonyms?: {
    fra: {
      f: string;
      m: string;
    };
    eng: {
      f: string;
      m: string;
    };
  };
  economy?: Record<string, unknown>;
  government_type?: Record<string, unknown>;
  landlocked?: boolean;
  links?: Record<string, string>;
  number_format?: Record<string, unknown>;
  parent?: Record<string, unknown>;
  postal_code?: Record<string, unknown>;
  units: {
    measurement_system: string, temperature_scale: string}
  // Flexibilité pour les 51 autres champs potentiels non listés
  [key: string]: unknown;
}
  