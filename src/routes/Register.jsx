import { useContext } from "react";
import { Usercontext } from "../context/UserProvider";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { erroresFirebase } from "../utils/erroresFirebase";
import { formValidate } from "../utils/formValidate";

import FormError from "../components/FormError";
import FormInput from "../components/FormInput";
import Title from "../components/Title";
import Button from "../components/Button";

const Register = () => {
  const { registerUser } = useContext(Usercontext);
  const navigate = useNavigate();

  const { required, patternEmail, minLength, validateTrim, validateEquals } =
    formValidate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm({
    defaultValues: {
      email: "test@test.com",
      password: "123123",
      repassword: "123123",
    },
  });

  const onSubmmit = async ({ email, password }) => {
    try {
      await registerUser(email, password);
      navigate("/");
    } catch (error) {
      const { code, message } = erroresFirebase(error.code);
      setError(code, {
        message,
      });
    }
  };

  return (
    <>
      <Title text="UserRegister" />
      <FormError error={errors.firebase} />

      <form onSubmit={handleSubmit(onSubmmit)}>
        <FormInput
          type="mail"
          placeholder="Ingrese email"
          {...register("email", {
            required,
            pattern: patternEmail,
          })}
          label="Ingresa tu correo"
          error={errors.email}
        >
          <FormError error={errors.email} />
        </FormInput>

        <FormInput
          type="password"
          placeholder="Ingrese Contraseña"
          {...register("password", {
            required,
            minLength,
            validate: validateTrim,
          })}
          label="Ingresa tu password"
          error={errors.password}
        >
          <FormError error={errors.password} />
        </FormInput>

        <FormInput
          type="password"
          placeholder="Ingrese Contraseña"
          {...register("repassword", {
            validate: validateEquals(getValues("password")),
          })}
          label="Repite tu contraseña"
          error={errors.repassword}
        >
          <FormError error={errors.repassword} />
        </FormInput>

        <Button text="Register" type="submit" />
      </form>
    </>
  );
};

export default Register;
