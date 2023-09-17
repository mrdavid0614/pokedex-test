import { GetAllPokemonsResponse, PokemonResponse } from "@/types";

const POKEMONS_API_BASE_URL = 'https://pokeapi.co/api/v2'

interface GetAllPokemonsParams {
    limit?: number;
}

export async function getAllPokemons(params: GetAllPokemonsParams = { limit: 20 }) {
    const response = await fetch(`${POKEMONS_API_BASE_URL}/pokemon?limit=${params.limit}&offset=0`)
    const data: GetAllPokemonsResponse = await response.json()
    
    const responses: PokemonResponse[] = await Promise.all(
        data.results.map(pokemon =>
            fetch(pokemon.url)
                .then(res => res.json())
                .then((res) => res)
        )
    )
    return responses;
}

export async function searchPokemon(pokemonName: string) {
    const response = await fetch(`${POKEMONS_API_BASE_URL}/pokemon/${pokemonName}`)

    if (!response.ok && response.status === 404) throw new Error("Este pokemon no existe")
    else if (!response.ok) throw new Error("Error al obtener pokemon")

    const data: PokemonResponse = await response.json()

    return data;
}