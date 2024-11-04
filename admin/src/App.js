import "./app.styles.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Header from "./component/Header/Header";
import Dashboard from "./Pages/Dashboard/Dashboard";
import CreateRoom from "./Pages/CreateRoom";
import Room from "./Pages/Room/Room";
import Rooms from "./Pages/Rooms/Rooms";
import EditRoom from "./Pages/EditRoom/EditRoom";


function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/rooms/create" element={<CreateRoom />} />
          <Route path="/rooms/all/:id" element={<Room />} />
          <Route path="/rooms/edit/:id" element={<EditRoom />} />




        </Routes>
      </Router>
    </div>
  );
}

export default App
