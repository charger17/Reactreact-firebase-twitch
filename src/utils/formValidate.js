export const formValidate = () => {
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
    patternURL: {
      value:
      /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi,
      message: "Formato de URL incorrecto.",
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
    validateEquals(value) {
      return {
        equals: (v) => v === value || "No coinciden las contraseñas",
      };
    },
  };
};
