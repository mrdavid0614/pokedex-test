import { useEffect, useState } from "react"

export function useDebounce<T>(value: T, delay?: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value)

    useEffect(() => {
        const timerId = setTimeout(() => setDebouncedValue(value), delay || 500)

        return () => {
            clearTimeout(timerId)
        }
    }, [value, delay])

    return debouncedValue
}