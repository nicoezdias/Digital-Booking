import { Routes, Route } from "react-router-dom";
import Footer from "components/footer/Footer";
import Header from "components/header/Header";
import HotelDetails from "pages/HotelDetails";
import Body from "components/body/Body";
import Singup from "pages/Singup";
import Login from "pages/Login";
import LoginConfirm from "pages/LoginConfirm";
import Home from "pages/Home";
import Booking from "pages/Booking";
import Admin from "pages/Admin";
import { BookingConfirm } from "pages/BookingConfirm";
import Likes from "pages/Likes";
import Bookings from "pages/Bookings";

function App() {
  return (
    <>
      <Header />
      <Body>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/likes" element={<Likes />} />
          <Route path="/login" element={<Login />} />
          <Route path="/loginconfirm" element={<LoginConfirm />} />
          <Route path="/singup" element={<Singup />} />
          <Route path="/products/:id" element={<HotelDetails />} />
          <Route path="/products/:id/reserva" element={<Booking />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/bookingconfirm" element={<BookingConfirm />} />
          <Route path="/bookings" element={<Bookings />} />
        </Routes>
        <Footer />
      </Body>
    </>
  );
}

export default App;
