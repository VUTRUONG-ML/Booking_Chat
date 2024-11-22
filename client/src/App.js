import "./styles/App.styles.scss"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Rooms from "./Pages/Rooms/Rooms";
import Room from "./Pages/Room/Room";
import Header from "./component/Header/Header";
import Booking from "./Pages/Booking/Booking";
import Chat from "./Pages/Chat/Chat";
import Login from "./Pages/Login/Login";
import Success from "./Pages/Success/Success";
import Footer from "./component/Footer/Footer";
import AboutBKHotel from "./component/AboutBKHotel/AboutBKHotel";
import ContactBKHotel from "./component/ContactBKHotel/ContactBKHotel";
import PrivacyPolicy from "./component/PrivacyPolicy/PrivacyPolicy";

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/rooms/all/:id" element={<Room />} />
        <Route path="/bookings/:id" element={<Booking />} />
        <Route path="/bookings/:id" element={<Booking />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/login" element={<Login />} />
        <Route path="/success" element={<Success />} />
        <Route path="/aboutus" element={<AboutBKHotel />} />
        <Route path="/contact" element={<ContactBKHotel />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />

      </Routes>
      <Footer />
    </div>
  )
}

export default App
