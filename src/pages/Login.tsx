import { ChangeEvent, FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { useStore } from "@/store"
import { User } from "@/types"
import { Routes } from "@/router/routes"

export function Login() {
    const [user, setUser] = useState<Partial<User> | null>(null)
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate()
    const loggedUser = useStore((state) => state.user)
    const login = useStore((state) => state.login)

    if (loggedUser) {
        navigate(Routes.HOME)
        return null
    }

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        setUser((prevUser) => ({
            ...prevUser,
            [name]: value
        }))
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (user && user.email && user.password) {
            try {
                login(user as User)
                setError(null)
                toast.success("Ha iniciado sesión exitosamente")
            } catch (error) {
                setError((error as Error).message)
                toast.error("Error al intentar iniciar sesión")
            }
            
            return
        }
        
        return setError("Error al tratar de iniciar")
    }

    return (
        <section>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="card w-4/12 bg-base-200 shadow-lg relative">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-2xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-3xl dark:text-white">
                            Iniciar sesión
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="input input-bordered w-full placeholder:text-gray-600"
                                    placeholder="email@example.com"
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Contraseña</label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    className="input input-bordered w-full placeholder:text-gray-600"
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            {
                                error && <p className="text-error">{error}</p>
                            }
                            <button
                                type="submit"
                                className="btn btn-accent w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                            >
                                Iniciar
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}