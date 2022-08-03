import Footer from 'components/footer/Footer';
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import { ThemeProvider } from '../context/UserContext'

describe('Footer', () => {
   test('Should find watermark', async () => {
      render(<Footer/>);
  const watermarkElement = screen.getByText(/Digital Booking/i);
  expect(watermarkElement).toBeInTheDocument();

   })
})
