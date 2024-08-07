import { useForm } from "react-hook-form"
import { Button, Label } from "flowbite-react"
import { useAuth } from "../context/AuthContext"
import { useEffect } from "react"
//Import navigation and link from react-router-dom
import { useNavigate, Link } from 'react-router-dom'
import { Alert } from "flowbite-react"


export const RegisterPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const {
        regUser,
        isAuthenticated,
        errors: registerErrors } = useAuth()
    const navigation = useNavigate()

    useEffect(() => {
        console.log(`${isAuthenticated}`)
        if (isAuthenticated) {
            navigation("/")
        }
    }, [isAuthenticated])

    return (
        <div className="center mx-auto max-w-md p-10 rounded-md bg-slate-600">
            <form onSubmit={handleSubmit(async (values) => {
                await regUser(values)
                // submit to your server here
            })}
                className="flex max-w-md flex-col gap-4 center py-4">
                <div>
                    <input type="text" className="w-full bg-zinc-200 text-black px-4 py-2 rounded-md" {...register("username", { required: true })} placeholder="Username" />
                </div>
                <div>
                    <input type="email" className="w-full bg-zinc-200 text-red px-4 py-2 rounded-md" {...register("email", { required: true })} placeholder="Email" />
                </div>
                <div>
                    <input type="password" className="w-full bg-zinc-200 text-red px-4 py-2 rounded-md" {...register("password", { required: true })} placeholder="Password" />
                </div>
                <Button type="submit">Registrar</Button>
            </form>
            {registerErrors.map((error, index) => (
                <Alert key={index} color="red" className="mb-2 py-2 m-4 text-center">
                    {error}
                </Alert>
            ))}
        </div>
    )
}