import { RouterProvider } from "react-router-dom"
import { Toaster } from "sonner"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { router } from "@/router"

const queryClient = new QueryClient()

function App() {

  return (
    <QueryClientProvider client={queryClient}>
        <Toaster richColors />
        <ReactQueryDevtools />
        <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App
