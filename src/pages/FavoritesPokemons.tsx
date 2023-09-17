import { useNavigate } from "react-router-dom";
import { useStore } from "@/store";
import { PokemonsList } from "@/components";
import { Routes } from "@/router/routes";

export function FavoritesPokemons () {
    const navigate = useNavigate()
    const user = useStore((state) => state.user)

    if (!user) {
        navigate(Routes.HOME)
        return null;
    }

    return <>
        <PokemonsList pokemons={user.favoritePokemons} />
    </>
}