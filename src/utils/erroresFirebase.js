export const erroresFirebase = (codigo) => {
  switch (codigo) {
    case "auth/email-already-in-use":
      return "Usuario ya registrado.";
    case "auth/invalid-email":
      return "Formato Email no valido.";
    case "auth/user-not-found":
      return "Usuario no registrado.";
    case "auth/invalid-password":
      return "Contraseña invalida.";
    case "auth/wrong-password":
      return "Contraseña incorrecta.";
    default:
      return "Ocurrio un error en el server";
  }
};
