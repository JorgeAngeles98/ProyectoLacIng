import { useForm } from "react-hook-form"
import { useAuth } from "../context/AuthContext"
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function RegistroPage() {
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const { signup, isAuthenticated, errors: registroErrors } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) navigate("/salon");
    }, [isAuthenticated, navigate]
    );

    const onSubmit = handleSubmit(async (values) => {
        signup(values);
    });

    return (
        <div className="flex pt-44 items-center justify-center">
            <div className="bg-white max-w-md p-10 rounded-md">
                {
                    registroErrors.map((error, i) => (
                        <div key={i} className="bg-red-500 p-2 text-black">
                            {error}
                        </div>
                    ))
                }
                <form onSubmit={onSubmit}>
                    <h1 className="text-3xl font-bold my-2">Registro</h1>
                    <input type="text" {...register("username", { required: true })}
                        className="w-full bg-zinc-100 text-black px-4 py-2 rounded-md my-2"
                        placeholder="Nombre de usuario"
                    />
                    {
                        errors.username && (
                            <p className="text-red-500">El usuario es requrido</p>
                        )}
                    <input type="email" {...register("email", { required: true })}
                        className="w-full bg-zinc-100 text-black px-4 py-2 rounded-md my-2"
                        placeholder="Correo electrónico"
                    />
                    {
                        errors.email && (
                            <p className="text-red-500">El email es requrido</p>
                        )}
                    <input type="password" {...register("password", { required: true })}
                        className="w-full bg-zinc-100 text-black px-4 py-2 rounded-md my-2"
                        placeholder="Contraseña"
                    />
                    {
                        errors.password && (
                            <p className="text-red-500">La contraseña es requrida</p>
                        )}
                    <button className="bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-md my-2" type="sumit">Registrar</button>
                </form>

                <p className="flex gap-x-2 justify-between">
                Ya registrado? <Link to="/Login" className="text-emerald-700">Iniciar Sesion</Link>
            </p>

            </div>
        </div>


    )
}

export default RegistroPage