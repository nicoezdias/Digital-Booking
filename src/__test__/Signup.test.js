import Singup from 'pages/Singup';
import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom'
import {  BrowserRouter } from "react-router-dom";
import UserProvider from "context/UserContext";

let component = null;
beforeEach(() => {
  component = render(<BrowserRouter>
    <UserProvider >
      <Singup />
    </UserProvider>
  </BrowserRouter>);

 expect(component.container).toBeInTheDocument()
})

describe('Test de Crear Cuenta', () => {
   test('Debería reconocer titulo "crear cuenta"', async () => {
    expect(component.container).toHaveTextContent("Crear cuenta")
})
test('Debería reconocer boton "crear cuenta"', async () => {
    const botonCrearCuenta = component.container.querySelector('button[type="submit"]')
    expect(botonCrearCuenta.textContent).toBe("Crear cuenta")
})
})
describe('Test de Formulario', () => {
test("Ingresar nombre a input", async() => {
    const nombre = component.container.querySelector('input[name="name"]');
    expect(nombre.value).toBe("");
    fireEvent.change(nombre, { target: {value: "Juan"} })
    expect(nombre.value).toMatch("Juan")
})
test("Ingresar apellido a input", async() => {
    const apellido = component.container.querySelector('input[name="lastname"]');
    expect(apellido.value).toBe("");
    fireEvent.change(apellido, { target: {value: "Perez"} })
    expect(apellido.value).toMatch("Perez")
})
test("Ingresar email a input", async() => {
    const email = component.container.querySelector('input[name="email"]');
    expect(email.value).toBe("");
    fireEvent.change(email, { target: {value: "Juan@Mailfake.com"} })
    expect(email.value).toMatch("Juan@Mailfake.com")
})
test("Ingresar contraseña a input", async() => {
    const contrasenia = component.container.querySelector('input[name="password"]');
    expect(contrasenia.value).toBe("");
    fireEvent.change(contrasenia, { target: {value: "123456"} })
    expect(contrasenia.value).toMatch("123456")
})
test("Ingresar confirmacion de contraseña a input", async() => {
    const confirmacionContrasenia = component.container.querySelector('input[name="passwordConfirm"]');
    expect(confirmacionContrasenia.value).toBe("");
    fireEvent.change(confirmacionContrasenia, { target: {value: "123456"} })
    expect(confirmacionContrasenia.value).toMatch("123456")
})
test("Ingreso email no valido y falta de campos", async () => {
    const email = component.container.querySelector('input[name="email"]')
    fireEvent.change(email, {target: { value: "emailfake"}})
    const contrasenia = component.container.querySelector('input[name="password"]')
    fireEvent.change(contrasenia, {target: { value: "123456"}})
    const botonIngresar =  screen.getByRole("button", {name: /Crear cuenta/})
    fireEvent.click(botonIngresar)
    expect(component.container.getElementsByClassName("error").length).toBe(4);
})

})
