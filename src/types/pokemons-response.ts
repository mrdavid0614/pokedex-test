export interface GetAllPokemonsResponse {
    count: number
    next: string
    previous: string | null
    results: Array<{ name: string, url: string }>
}