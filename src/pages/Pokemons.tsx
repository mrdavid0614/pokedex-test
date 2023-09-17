import { useQuery } from '@tanstack/react-query'
import { useStore } from "@/store"
import { getAllPokemons, mapPokemon } from '@/services'
import { PokemonsList } from "@/components";

export function Pokemons () {
    const pokemons = useStore((state) => state.pokemons)
    const isFavoritePokemon = useStore((state) => state.isFavoritePokemon)
    const addPokemons = useStore((state) => state.addPokemons)

    useQuery(["pokemons"], async () => {
        const pokemons = await getAllPokemons()

        const mappedPokemons = pokemons.map((pokemon) => mapPokemon(pokemon, isFavoritePokemon(pokemon.id)))

        addPokemons(mappedPokemons)
        return mappedPokemons
    })
    
    return <>
        <PokemonsList pokemons={pokemons} />
    </>
}