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
      navigate("/dashboard");
    }
  }, [isAuthenticated]);

  return (
    <div className="flex pt-52 items-center justify-center">
      <div className="bg-white max-w-md w-full p-10 rounded-md">
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
          <button className="bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-md my-2" type="sumit">Ingresar</button>
        </form>

            <p className="flex gap-x-2 justify-between">
              No tienes cuenta? <Link to="/registro" className="text-emerald-700">Registrate</Link>
            </p>

      </div>
    </div>

  )
}

export default LoginPage