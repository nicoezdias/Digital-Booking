import HotelDetails from 'pages/HotelDetails';
import { ReactComponent as Wifi } from 'assets/icon/features/wifi.svg';
import { ReactComponent as Swim } from 'assets/icon/features/swim.svg';
import { ReactComponent as Tv } from 'assets/icon/features/tv.svg';
import { ReactComponent as Pet } from 'assets/icon/features/pet.svg';
import { ReactComponent as Air } from 'assets/icon/features/air.svg';
import { ReactComponent as Car } from 'assets/icon/features/car.svg';
import { ReactComponent as Kitchen } from 'assets/icon/features/kitchen.svg';
import React from 'react';
import '@testing-library/jest-dom'
import {  BrowserRouter } from "react-router-dom";
import UserProvider from "context/UserContext";
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom'
import Features from 'components/atoms/Features';

let component = null;
beforeEach(() => {
  component = render(<BrowserRouter>
    <UserProvider >
      <HotelDetails>
          <Features>
              <Wifi></Wifi>
          </Features>
          </HotelDetails>
    </UserProvider>
  </BrowserRouter>);

 expect(component.container).toBeInTheDocument()
})
describe('Test de Hotel Details', () => {
    test('Debería reconocer el icono de volver atras', async () => {
       expect(component.getByText(/back.svg/))
 })
 test('Debería reconocer el titulo', async () => {
    //expect(component.container.getElementsByClassName("categories__container").length).toBe(1);
   expect(component.getByText(/Alójate en/))
})
test('Debería reconocer la localizacion del alojamiento', async () => {
    const localizacionAlojamiento = component.container.getElementsByClassName('hotels__details__location__name')
     expect(localizacionAlojamiento.length).toBe(1)
})
test('Debería reconocer el collage de imagenes', async () => {
    const collageAlojamiento = component.container.getElementsByClassName('hotels__details__collage')
     expect(collageAlojamiento.length).toBe(1)
})
test('Debería reconocer el bloque de fechas disponibles', async () => {
    const fechasDisponibles = component.getByText('Fechas disponibles')
     expect(fechasDisponibles).toBeInTheDocument()
})
test('Debería reconocer el container de calendario', async () => {
    const calendario = component.container.getElementsByClassName('container_calendar')
    expect(calendario.length).toBe(1)
})
test('Debería reconocer el boton de iniciar reserva', async () => {
    const botonIniciarReserva = screen.getByRole("button", {name: /Iniciar reserva/})
    expect(botonIniciarReserva).toBeInTheDocument()
})
test('Debería reconocer el titulo de agregar fechas', async () => {
    const tituloAgregarFechas = screen.getByText(/Agregá tus fechas/)
    expect(tituloAgregarFechas).toBeInTheDocument()
})
test('Debería reconocer el titulo de features', async () => {
    const tituloFeatures = screen.getByText(/¿Qué ofrece este lugar?/)
    expect(tituloFeatures).toBeInTheDocument()
})
test('Debería reconocer el titulo "como llegar"', async () => {
    const tituloComoLlegar = screen.getByText(/Cómo llegar/)
    expect(tituloComoLlegar ).toBeInTheDocument()
})
 })