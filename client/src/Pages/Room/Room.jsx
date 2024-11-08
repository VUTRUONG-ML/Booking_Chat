import "./room.styles.scss"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { reset, deleteRoom } from "../../features/room/roomSlice";
import Carousel from "../../component/Carousel/Carousel";


const Room = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [room, setRoom] = useState(null);



    useEffect(() => {
        const getRoom = async () => {
            dispatch(reset());
            try {
                const res = await fetch(`/api/rooms/${id}`);
                if (res.ok) {
                    const data = await res.json();
                    setRoom(data);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getRoom();
    }, [id, dispatch])

    const handleDelete = () => {
        dispatch(deleteRoom(id));
    }

    return (
        <div id="room">
            <div className="container">
                {room ? (
                    <div>
                        <div className="img-wrapper">
                            <Carousel data={room.img} />
                            <h1 className="heading center">Carousel</h1>
                            {/* <img src={room.img[0]} alt="" /> */}
                        </div>
                        <div className="text-wrapper">
                            <h1 className="heading center">{room.name}</h1>
                            <p>{room.desc}</p>
                            <h2> ${room.price.toFixed(2)}</h2>
                        </div>
                        <div className="cta-wrapper">
                            <Link to={`/bookings/${room._id}`}>Book Now</Link>
                        </div>
                    </div>
                ) : null}
            </div>
        </div >
    )
}

export default Room
