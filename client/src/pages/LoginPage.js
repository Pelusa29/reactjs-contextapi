import { useForm } from "react-hook-form"
import { Button, Label } from "flowbite-react"
import { useAuth } from "../context/AuthContext"
import { useEffect } from "react"
//Import navigation and link from react-router-dom
import { useNavigate, Link } from 'react-router-dom'
import { Alert } from "flowbite-react"


export function LoginPage() {

    const { register, handleSubmit } = useForm()

    const {
        logUser,
        isAuthenticated,
        errors: loginErrors } = useAuth()
    const navigation = useNavigate()

    useEffect(() => {
        console.log('Accediendo loggin:' + isAuthenticated)
        if (isAuthenticated) {
            navigation("/")
        }
    }, [isAuthenticated, navigation])


    return (
        <div className="center mx-auto max-w-md p-10 rounded-md bg-slate-600">
            <form onSubmit={handleSubmit(async (user) => {
                await logUser(user)
            })}
                className="flex max-w-md flex-col gap-4 center">
                <div>
                    <input type="text" className="w-full bg-zinc-200 text-red px-4 py-2 rounded-md" {...register("username", { required: true })} placeholder="Username" />
                </div>
                <div>
                    <input type="password" className="w-full bg-zinc-200 text-red px-4 py-2 rounded-md" {...register("password", { required: true })} placeholder="Password" />
                </div>
                <Button type="submit">Acceder</Button>
            </form>
            {loginErrors.map((error, index) => (
                <Alert key={index} color="red" className="mb-2 py-2 m-4 text-center">
                    {error}
                </Alert>
            ))}
        </div>
    )
}