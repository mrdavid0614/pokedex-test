import { NavLink, useLocation, useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { useStore } from "@/store"
import { Routes } from "@/router/routes"
import { PokemonSearch } from "./PokemonSearch"

export function Header() {
    const navigate = useNavigate()
    const location = useLocation()

    const user = useStore((state) => state.user)
    const logout = useStore((state) => state.logout)

    const handleLoginBtnClick = () => navigate(Routes.LOGIN)
    const handleLogoutBtnClick = () => {
        logout()
        toast.success("Ha cerrado sesión exitosamente")
    }

    return (
        <nav className="navbar pt-3 px-10 fixed z-50 pb-4 shadow-md shadow-base-300 bg-base-100">
            <div className="flex-1">
                {
                   (location.pathname === Routes.HOME) && (
                        <PokemonSearch />
                    )
                }
            </div>
            <div className="flex-none gap-6">
                <NavLink to="/" className="btn btn-ghost normal-case text-xl">Lista de pokemones</NavLink>
                {
                    user && <NavLink to="/favorites" className="btn btn-ghost normal-case text-xl">Favoritos</NavLink>
                }
                <div className="dropdown dropdown-end">
                    {
                        user ? 
                            <button onClick={handleLogoutBtnClick} className="btn btn-error">Cerrar sesión</button>
                        :
                            <button onClick={handleLoginBtnClick} className="btn btn-primary">Iniciar sesión</button>
                    }
                  
                </div>
            </div>
        </nav>
    )
}