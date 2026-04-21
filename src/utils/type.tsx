export type country = {
    translations: {
        fra: {
            common: string
        }
    }
    flags: {
        svg: string
    }
    population: number
    capital: []
    region: string
    demonyms : {
        fra : {
            f: string
        }
    }
    idd : {
        root: string
        suffixes: []
    }
    area: number
    maps : {
        googleMaps: string
    }
    languages : object
}