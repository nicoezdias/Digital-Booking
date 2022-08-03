import Categories from 'components/body/Categories'
import { CardCategories } from 'components/atoms/Card';
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom'
import {  BrowserRouter } from "react-router-dom";
import UserProvider from "context/UserContext";

let component = null;
beforeEach(() => {
  component = render(<BrowserRouter>
    <UserProvider >
      <Categories >
      <CardCategories/>
      </Categories >
    </UserProvider>
  </BrowserRouter>);

 expect(component.container).toBeInTheDocument()
})
describe('Test de Categorias', () => {
    test('Debería renderizar el container de categorias', async () => {
        expect(component.container.getElementsByClassName("categories__container").length).toBe(1);
       
 })
 })



