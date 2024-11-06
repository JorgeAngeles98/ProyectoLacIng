import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function LoginPage() {

  const { register, handleSubmit, formState: { errors }, } = useForm();

  const { signin, errors: signinErrors, isAuthenticated } = useAuth();

  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    signin(data);
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/salon");
    }
  }, [isAuthenticated]);

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        {
          signinErrors.map((error, i) => (
            <div key={i} className="bg-red-500 p-2 text-white text-center my-2">
              {error}
            </div>
          ))
        }
        <form onSubmit={onSubmit}>

          <h1 className="text-3xl font-bold my-2">Login</h1>

          <input type="email" {...register("email", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Correo electrónico"
          />
          {
            errors.email && (
              <p className="text-red-500">El email es requrido</p>
            )}
          <input type="password" {...register("password", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Contraseña"
          />
          {
            errors.password && (
              <p className="text-red-500">La contraseña es requrida</p>
            )}
          <button className="bg-sky-500 text-white px-4 py-2 rounded-md my-2" type="sumit">Ingresar</button>
        </form>

            <p className="flex gap-x-2 justify-between">
              No tienes cuenta? <Link to="/registro" className="text-sky-500">Registrate</Link>
            </p>

      </div>
    </div>

  )
}

export default LoginPage