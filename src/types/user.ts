import { Pokemon } from "./pokemon"

export interface User {
    email: string
    password: string
    favoritePokemons: Pokemon[]
}

export interface UserCredentials extends Pick<User, 'email' | 'password'> {}