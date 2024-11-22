import "./room.styles.scss";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
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
    }, [id, dispatch]);

    const handleDelete = () => {
        dispatch(deleteRoom(id));
        navigate('/rooms');
    };

    return (
        <div className="background">
            <div id="room">
                <div className="container">
                    {room ? (
                        <div className="room-content">
                            <div className="img-wrapper">
                                <Carousel data={room.img} />
                            </div>
                            <div className="text-wrapper">
                                <h1 className="heading center">{room.name}</h1>
                                <p>{room.desc}</p>
                                <h2>${room.price.toFixed(2)}</h2>
                            </div>
                            <div className="cta-wrapper">
                                <Link to={`/bookings/${room._id}`} className="btn">Book Now</Link>
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default Room;