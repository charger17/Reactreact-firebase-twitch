export const formValidate = (getValues) => {
  return {
    required: {
      value: true,
      message: "Campo Obligatorio",
    },
    patternEmail: {
      value:
        /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/,
      message: "Formato de Email incorrecto.",
    },
    minLength: {
      value: 6,
      message: "Se necesitan más de 6 caracteres",
    },
    validateTrim: {
        trim: (v) => {
            if (!v.trim()) return "No seas pendejo🤡, escribe algo";
            true;
          },
    },
    validateEquals(getValues) {
        return{
            equals: (v) =>
          v === getValues("password") || "No coinciden las contraseñas",
        }
    },
  };
};
