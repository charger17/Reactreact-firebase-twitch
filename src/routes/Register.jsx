import { useContext } from "react";
import { Usercontext } from "../context/UserProvider";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { erroresFirebase } from "../utils/erroresFirebase";
import { formValidate } from "../utils/formValidate";

import FormError from "../components/FormError";
import FormInput from "../components/FormInput";

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
      setError("firebase", {
        message: erroresFirebase(error.code),
      });
    }
  };

  return (
    <>
      <h1>Register</h1>

      <FormError error={errors.firebase} />

      <form onSubmit={handleSubmit(onSubmmit)}>
        <FormInput
          type="mail"
          placeholder="Ingrese email"
          {...register("email", {
            required,
            pattern: patternEmail,
          })}
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
        >
          <FormError error={errors.password} />
        </FormInput>

        <FormInput
          type="password"
          placeholder="Ingrese Contraseña"
          {...register("repassword", {
            validate: validateEquals(getValues),
          })}
        >
          <FormError error={errors.repassword} />
        </FormInput>

        <button type="submit">Register</button>
      </form>
    </>
  );
};

export default Register;
