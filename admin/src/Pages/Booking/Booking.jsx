import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const Booking = () => {
    const { id } = useParams();
    const [booking, setBooking] = useState(null);
    useEffect(() => {
        const getBooking = async () => {
            try {
                const res = await fetch(`/api/bookings/${id}`)
                const data = await res.json();
                setBooking(data);
            } catch (error) {
                console.log(error.message);
            }
        }
        getBooking();
    }, [])
    console.log(booking);
    return (
        <div>
            <h1 className="heading center">Booking</h1>

            {booking && <div>
                <div className="text-wrapper">
                    <div className="heading">{booking.name}</div>
                    <p className="email">{booking.roomId.name}</p>
                    <p className="email">{booking.email}</p>
                    <p className="checkInDate">checkin: {booking.checkInDate}</p>
                    <p className="checkOutDate">checkout: {booking.checkOutDate}</p>

                </div>
            </div>}
        </div>
    )
}

export default Booking
