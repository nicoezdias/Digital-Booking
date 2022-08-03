import App from 'App';
import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom'
import {  BrowserRouter } from "react-router-dom";
import UserProvider from "context/UserContext";

let component = null;
beforeEach(() => {
  component = render(<BrowserRouter>
    <UserProvider >
      <App />
    </UserProvider>
  </BrowserRouter>);

 expect(component.container).toBeInTheDocument()
})

describe('Test de App', () => {
   test('Debería reconocer secciones', async () => {
    expect(component.container).toHaveTextContent("Busca ofertas en hoteles, casas y mucho más")
    expect(component.container).toHaveTextContent("Buscar por tipo de alojamiento")
    expect(component.container).toHaveTextContent("Recomendaciones")
    
})

test('Debería reconocer boton Buscar', async () => {
  const botonBuscar =  screen.getByRole("button", {name: /Buscar/})

  expect(botonBuscar).toBeInTheDocument()
  
})

})