import { createBrowserRouter } from 'react-router-dom'
import { Pokemons, FavoritesPokemons, Login } from '@/pages'
import { Layout } from '@/components'
import { Routes } from './routes'

export const router = createBrowserRouter([
    {
        path: Routes.HOME,
        element: <Layout />,
        children: [
            {
                path: "",
                element: <Pokemons />
            },
            {
                path: Routes.FAVORITES,
                element: <FavoritesPokemons />
            },
            {
                path: Routes.LOGIN,
                element: <Login />
            },
        ]
    }
])