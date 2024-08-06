import { useForm } from "react-hook-form"
import { Button, Label } from "flowbite-react"
import { registerUserRequestAPI } from "../api/auth"

export const RegisterPage = () => {
    const { register, handleSubmit } = useForm()
    return (
        <div className="center mx-auto max-w-md p-10 rounded-md bg-slate-600">
            <form onSubmit={handleSubmit((values) => {
                console.log(values)
                // submit to your server here
            })}
                className="flex max-w-md flex-col gap-4 center">
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
            </form >
        </div >
    )
}