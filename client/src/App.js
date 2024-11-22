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


        </Routes>
    </div>
  )
}

export default App
