import { useContext } from "react";
import { Usercontext } from "../context/UserProvider";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const Register = () => {
  const { registerUser } = useContext(Usercontext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError
  } = useForm({
    defaultValues: {
      email: "test@test.com",
    },
  });

  const onSubmmit = async ({ email, password }) => {
    console.log("Procesando form", email, password);

    try {
      await registerUser(email, password);
      navigate("/");
    } catch (error) {
      console.log(error.code);
      switch (error.code) {
        
        case "auth/email-already-in-use":
            console.log("Usuario ya registrado")
            setError("email", {
              message: "Usuario ya registrado."
            })
          break;
        case "auth/invalid-email":
          setError("email", {
            message: "Formato Email no valido."
          })
          break;
        default:
          console.log("Ocurrio un error en el server")
          break;
      }
    }
  };

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={handleSubmit(onSubmmit)}>
        <input
          type="email"
          placeholder="Ingrese email"
          {...register("email", {
            required: {
              value: true,
              message: "Campo Obligatorio",
            },
            pattern: {
              value:
                /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/,
              message: "Formato de Email incorrecto.",
            },
          })}
        />
        {errors.email && <p>{errors.email.message}</p>}
        <input
          type="password"
          placeholder="Ingrese Contraseña"
          {...register("password", {
            required: {
              value: true,
              message: "Campo Obligatorio",
            },
            minLength: {
              value: 6,
              message: "Se necesitan más de 6 caracteres",
            },
            validate: {
              trim: (v) => {
                if (!v.trim()) return "No seas pendejo🤡, escribe algo";
                true;
              },
            },
          })}
        />
        {errors.password && <p>{errors.password.message}</p>}
        <input
          type="password"
          placeholder="Ingrese Contraseña"
          {...register("repassword", {
            setValueAs: (v) => v.trim(),
            validate: {
              equals: (v) =>
                v === getValues("password") || "No coinciden las contraseñas",
            },
          })}
        />
        {errors.repassword && <p>{errors.repassword.message}</p>}
        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default Register;
