import { Pokemon } from "@/types"
import { useStore } from "@/store"
import { POKEMONS_TYPE_COLOR } from "@/constants"
import { capitalize } from "@/utils/strings"
import { FavoriteIcon } from "./FavoriteIcon"
import { Loader } from "./Loader"

interface PokemonCardProps {
    pokemon: Pokemon
}

function getPokemonTypeColor(type: string) {
    return POKEMONS_TYPE_COLOR[type as keyof typeof POKEMONS_TYPE_COLOR] ||
        POKEMONS_TYPE_COLOR.default
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
    const user = useStore((state) => state.user)
    const markAsFavorite = useStore((state) => state.markAsFavorite)
    const unmarkAsFavorite = useStore((state) => state.unmarkAsFavorite)

    const handleFavoriteClick = () => {
        pokemon.isFavorite ? unmarkAsFavorite(pokemon) : markAsFavorite(pokemon)
    }

    if (!pokemon)
        return <Loader />

    return (
        <article
            className="card w-96 bg-base-100 shadow-xl transition-all duration-300 bg-gradient-to-b hover:-translate-y-3 hover:scale-105 relative"
        >
            
            { user && <FavoriteIcon isFavorite={pokemon.isFavorite} onClick={handleFavoriteClick} /> }
            <figure><img src={pokemon.image} alt={pokemon.name} /></figure>
            <div className="card-body gap-3">
                <h2 className="card-title text-2xl">
                    <span className="font-bold">#{`${pokemon.id}`.padStart(3, '0')}</span> - {capitalize(pokemon.name)}
                </h2>
                <p>{capitalize(pokemon.types[0])} pokemon</p>
                <div className="card-actions justify-end">
                    {pokemon.types.map(type => (
                        <div
                            className="badge badge-outline p-4 gap-2 text-black font-bold"
                            style={{ 
                                backgroundColor: getPokemonTypeColor(type)
                            }}
                        >
                            <img src={`/${type}.png`} alt={type} className="w-6 filter grayscale" />
                            {capitalize(type)}
                        </div>
                    ))}
                </div>
            </div>
        </article>
    )
}
