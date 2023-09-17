export interface PokemonResponse {
    id:                       number;
    name:                     string;
    sprites:                  Sprites;
    types:                    Type[];
}
   
interface Species {
    name: string;
    url:  string;
}

interface Sprites {
    animated?:          Sprites;
    back_default:       string;
    back_female:        null;
    back_shiny:         string;
    back_shiny_female:  null;
    front_default:      string;
    front_female:       null;
    front_shiny:        string;
    front_shiny_female: null;
    other?:             Other;
}

interface OfficialArtwork {
    front_default: string;
    front_shiny:   string;
}

interface Home {
    front_default:      string;
    front_female:       null;
    front_shiny:        string;
    front_shiny_female: null;
}

interface DreamWorld {
    front_default: string;
    front_female:  null;
}

interface Other {
    dream_world:        DreamWorld;
    home:               Home;
    "official-artwork": OfficialArtwork;
}

interface Type {
    slot: number;
    type: Species;
}