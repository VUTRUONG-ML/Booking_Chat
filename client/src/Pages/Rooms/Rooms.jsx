import { getRooms, reset } from "../../features/room/roomSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import RoomList from "../../component/RoomList/RoomList";
import './Rooms.styles.scss';
const Rooms = () => {
    const dispatch = useDispatch();
    const { rooms } = useSelector((state) => state.room);
    useEffect(() => {
        dispatch(getRooms());
        dispatch(reset());
    }, [dispatch])

    console.log("check:", rooms);
    return (
        <div>
            <div className="background">
                <h1 className="heading center">Rooms</h1>
            </div>
            <hr />
            <div className="container">
                {rooms.length > 0 ? <RoomList data={rooms} /> : null}
            </div>
        </div>
    )
}

export default Rooms