import Header from 'components/header/Header';
import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom'
import {  BrowserRouter } from "react-router-dom";
import UserProvider from "context/UserContext";

let component = null;
beforeEach(() => {
   component = render(<BrowserRouter>
    <UserProvider >
      <Header />
    </UserProvider>
  </BrowserRouter>);

  expect(component.container).toBeInTheDocument()
})

describe('Test de Header', () => {
   test('Click iniciar sesion', async () => {
      const botonIniciarSesion = screen.getAllByRole("link", {name: /Iniciar sesión/})
    
      act(()=> {
        fireEvent.click(botonIniciarSesion[0])
      })
      
      expect(component.container).not.toHaveTextContent('Iniciar sesión')
      expect(component.container).toHaveTextContent('Crear cuenta')

   })
   test('Click Crear cuenta', async () => {
    const botonCrearCuenta = screen.getAllByRole("link", {name: /Crear cuenta/})
     
    act(()=> {
      fireEvent.click(botonCrearCuenta[0])
    })
    
    expect(component.container).not.toHaveTextContent('Crear cuenta')
    expect(component.container).toHaveTextContent('Iniciar sesión')

   })
   test("Renderiza logo", async() => {
      expect(screen.getByRole("link", {name: /logo.svg Sentite como en tu hogar/}))
   })
})