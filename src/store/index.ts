import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'
import { Pokemon, User, UserCredentials } from '@/types'
import { getUser, setUserToLocalStorage } from '@/services/user-local-db'

interface Store {
    pokemons: Pokemon[]
    user: User | null
    addPokemons: (pokemons: Pokemon[]) => void
    markAsFavorite: (pokemon: Pokemon) => void
    unmarkAsFavorite: (pokemon: Pokemon) => void
    isFavoritePokemon: (pokemonId: number) => boolean
    login: (userCredentials: UserCredentials) => void
    logout: () => void
}

const STORE_KEY = 'store-data'

export const useStore = create<Store>()(
    devtools(
        persist(
            (set, get) => ({
                pokemons: [],
                user: null,

                addPokemons: (pokemons) => {
                    set({ pokemons })
                },
                isFavoritePokemon: (pokemonId) => {
                    const { user } = get()
                    const favoritePokemonsIds = user?.favoritePokemons.map(favPokemon => favPokemon.id) ?? []
                    return favoritePokemonsIds.includes(pokemonId)
                },
                markAsFavorite: (pokemon) => {
                    const { pokemons, user } = get()
                    const foundPokemon = pokemons.findIndex(p => p.id === pokemon.id)
                    pokemon = {
                        ...pokemon,
                        isFavorite: true
                    };
                    pokemons[foundPokemon].isFavorite = true;
                    
                    const newFavoritePokemons = user!.favoritePokemons.concat(pokemon)
                    const updatedUser = {...user!, favoritePokemons: newFavoritePokemons}

                    setUserToLocalStorage(updatedUser)
                    set({
                        pokemons: [...pokemons],
                        user: updatedUser
                    })
                },
                unmarkAsFavorite: (pokemon) => {
                    const { pokemons, user } = get()
                    const foundPokemon = pokemons.findIndex(p => p.id === pokemon.id)
                    pokemon = {
                        ...pokemon,
                        isFavorite: false
                    };
                    pokemons[foundPokemon].isFavorite = false;

                    const newFavoritePokemons = user!.favoritePokemons.filter(favPokemon => favPokemon.id !== pokemon.id)
                    const updatedUser = {...user!, favoritePokemons: newFavoritePokemons }

                    setUserToLocalStorage(updatedUser)

                    set({
                        pokemons: [...pokemons],
                        user: updatedUser
                    })
                },
                login: (userCredentials: UserCredentials) => {
                    const user = getUser(userCredentials.email) ?? {...userCredentials, favoritePokemons: []}

                    if (user.password !== userCredentials.password)
                        throw new Error("Credenciales inválidas")

                    console.log({ user })

                    setUserToLocalStorage(user)
                    set({ user })
                },
                logout: () => {
                    set({ user: null })
                }
            }),
            { name: STORE_KEY }
        )
    )
)
