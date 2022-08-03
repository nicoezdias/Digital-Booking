import { createElement } from "react";

export const validationLogin = (login) => {
  const errors = {};
  if (!login.email) {
      errors.email = 'El correo es requerido';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(login.email)) {
      errors.email = 'El correo no es válido';
  }
  if (!login.password) {
      errors.password = 'La contraseña es requerida';
  } else if (login.password.length < 6) {
      errors.password = 'La contraseña debe tener al menos 6 caracteres';
  }
  return errors;
}

export const validationSignup = (signup) => {
  const errors = {};
  if (!signup.name) {
      errors.name = 'El nombre es requerido';
  } else if(!/^[a-zA-Z]+$/.test(signup.name)) {
      errors.name = 'El nombre no es válido';
  }
  if (!signup.surname) {
      errors.surname = 'El apellido es requerido';
  } else if(!/^[a-zA-Z]+$/.test(signup.name)) {
      errors.surname = 'El apellido no es válido';
  }
  if (!signup.email) {
      errors.email = 'El correo es requerido';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(signup.email)) {
      errors.email = 'El correo no es válido';
  }
  if (!signup.password) {
      errors.password = 'La contraseña es requerida';
  } else if (signup.password.length < 6) {
      errors.password = 'La contraseña debe tener al menos 6 caracteres';
  }
  if(!signup.passwordConfirm) {
      errors.passwordConfirm = 'La confirmación de la contraseña es requerida';
  } else if(signup.passwordConfirm !== signup.password) {
      errors.passwordConfirm = 'Las contraseñas no coinciden';
  }
  return errors;
}

export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const abreviate = (string) => {
    return string.split('-').map(word => word.charAt(0).toUpperCase()).join('');
}

export const nameAndLastname = (string) => {
    return string.split('-').map(word => capitalize(word)).join(' ');
}

export function formatParagraph(string) {
    const result = []
    const p = string.split('.');
    p.forEach((sentence,i) => {
        result.push(createElement('p', {key:i, className: "hotels__details__description__p"}, sentence))
    })
  return result;
}

export function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }

export function stringByRank(rank) {
    if(rank >= 1 && rank <= 4){
        return 'Malo'
    }
    if(rank >= 5 && rank <= 6){
        return 'Regular'
    }
    if(rank >= 7 && rank <= 8){
        return 'Bueno'
    }
    if(rank >= 9 && rank <= 10){
        return 'Muy Bueno'
    }
    return ' - '
}