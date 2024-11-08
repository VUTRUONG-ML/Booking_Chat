import "./styles/App.styles.scss"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Rooms from "./Pages/Rooms/Rooms";
import Room from "./Pages/Room/Room";
import Header from "./component/Header/Header";
import Booking from "./Pages/Booking/Booking";
const App = () => {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/rooms/all/:id" element={<Room />} />
          <Route path="/bookings/:id" element={<Booking />} />

        </Routes>
      </Router>
    </div>
  )
}

export default App
