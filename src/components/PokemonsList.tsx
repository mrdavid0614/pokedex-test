import { Pokemon } from '@/types'
import { PokemonCard } from './PokemonCard'

interface PokemonsListProps {
    pokemons: Pokemon[]
}

export function PokemonsList({ pokemons }: PokemonsListProps) {
    return (
        <section className="pt-28 flex flex-wrap gap-7 gap-x-10 justify-center items-center">
            {pokemons.map((pokemon) => (
                <PokemonCard key={`${pokemon.id}-${pokemon.name}`} pokemon={pokemon} />
            ))}
        </section>
    )
}