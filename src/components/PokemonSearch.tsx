import { useState, ChangeEvent, useEffect } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { useStore } from "@/store"
import { searchPokemon } from "@/services/pokemons-api"
import { useDebounce } from "@/hooks/useDebounce"
import { mapPokemon } from "@/services"

export function PokemonSearch() {
    const [searchTerm, setSearchTerm] = useState("")
    const isFavoritePokemon = useStore((state) => state.isFavoritePokemon)
    const addPokemons = useStore((state) => state.addPokemons)
    const debouncedSearchTerm = useDebounce(searchTerm)
    const queryClient = useQueryClient()

    const { refetch: search } = useQuery(["pokemons", debouncedSearchTerm], async () => {
        if (!debouncedSearchTerm)
            return

        const pokemon = await searchPokemon(debouncedSearchTerm)
        const pokemonSearched = mapPokemon(pokemon, isFavoritePokemon(pokemon.id))
        addPokemons([pokemonSearched])
        return pokemonSearched
    }, { refetchOnMount: false, refetchOnWindowFocus: false })

    const handleChangeSearchTerm = (e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)

    useEffect(() => {
        if (debouncedSearchTerm)
            search()
        else 
            queryClient.invalidateQueries(["pokemons"])
    }, [debouncedSearchTerm, search, queryClient])

    return (
        <div className="form-control w-5/6">
            <input
                type="text"
                placeholder="Buscar pokemón"
                className="input input-bordered md:w-auto"
                onChange={handleChangeSearchTerm}
            />
        </div>
    )
}