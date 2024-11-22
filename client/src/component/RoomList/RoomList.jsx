import "./roomList.styles.scss";
import { Link } from "react-router-dom";
import Carousel from "../Carousel/Carousel";


const RoomList = ({ data }) => {
    return (
        <div className="container">
            <div id="room-list">
                {data.map((item, index) => {
                    return (

                        <Link to={`/rooms/all/${item._id}`} key={item.id} className="room-unit">
                            <div className="img-wrapper">
                                <Carousel data={item.img} />
                            </div>
                            <p className="name"> {item.name}</p>
                        </Link>
                    );

                })}
            </div>
        </div>
    )
}

export default RoomList
