import Login from 'pages/Login';
import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom'
import {  BrowserRouter } from "react-router-dom";
import UserProvider from "context/UserContext";

let component = null;
beforeEach(() => {
  component = render(<BrowserRouter>
    <UserProvider >
      <Login />
    </UserProvider>
  </BrowserRouter>);

 expect(component.container).toBeInTheDocument()
})

describe('Test de formulario de Iniciar Sesion', () => {
    test("Debería reconocer el titulo de Iniciar sesion", async () => {
        expect(component.getByText("Iniciar sesión")).toBeInTheDocument()
    })
    test("Debería reconocer los labels de Iniciar sesion", async () => {
        expect(component.getByText("Correo electrónico")).toBeInTheDocument()
        expect(component.getByText("Contraseña")).toBeInTheDocument()
    })
    test("Ingreso de correo electronico", async () => {
        const email = component.container.querySelector('input[name="email"]')
        expect(email.value).toBe("")
        fireEvent.change(email, {target: { value: "emailfake@mail.com"}})
        expect(email.value).toMatch('emailfake@mail.com');
    
    })
    test("Ingreso de contraseña ", async () => {
        const contrasenia = component.container.querySelector('input[name="password"]')
        expect(contrasenia.value).toBe("")
        fireEvent.change(contrasenia, {target: { value: "123456"}})
        expect(contrasenia.value).toMatch('123456');
    
    })
    test("Ingreso email no valido", async () => {
        const email = component.container.querySelector('input[name="email"]')
        fireEvent.change(email, {target: { value: "emailfake"}})
        const contrasenia = component.container.querySelector('input[name="password"]')
        fireEvent.change(contrasenia, {target: { value: "123456"}})
        const botonIngresar =  screen.getByRole("button", {name: /Ingresar/})
        fireEvent.click(botonIngresar)
        expect(component.container.getElementsByClassName("error").length).toBe(1);
    })
    test("Ingreso contraseña no valida", async () => {
        const email = component.container.querySelector('input[name="email"]')
        fireEvent.change(email, {target: { value: "emailfake@mail.com"}})
        const contrasenia = component.container.querySelector('input[name="password"]')
        fireEvent.change(contrasenia, {target: { value: "1"}})
        const botonIngresar =  screen.getByRole("button", {name: /Ingresar/})
        fireEvent.click(botonIngresar)
        expect(component.container.getElementsByClassName("error").length).toBe(1);
    })


 })