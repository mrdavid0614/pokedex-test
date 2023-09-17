import { Pokemon, PokemonResponse } from "@/types";

export function mapPokemon(pokemon: PokemonResponse, isFavorite: boolean): Pokemon {
    return {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites?.other?.["official-artwork"].front_default || pokemon.sprites?.front_default,
        isFavorite,
        types: pokemon?.types?.map(typeObj => typeObj.type.name) || []
    }
}