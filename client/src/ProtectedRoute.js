import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "./context/AuthContext"

export function ProtectedRoute() {
    const { loading, isAuthenticated } = useAuth()

    console.log("Protected Route")
    console.log(`Auth:${isAuthenticated}`)
    console.log(`${loading}`)
    console.log("Paso")
    /*console.log(loading, isAuthenticated) */
    if (loading) {
        return <h1>Loading</h1>
    }
    if (!loading && !isAuthenticated) {
        return <Navigate to="/" replace />
    }

    return <Outlet />
}