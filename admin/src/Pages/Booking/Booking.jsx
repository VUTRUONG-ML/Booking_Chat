import "./booking.styles.scss";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { deleteBooking, reset } from "../../features/booking/bookingSlice";
import { useDispatch, useSelector } from "react-redux";

const Booking = () => {
    const { id } = useParams();
    const [booking, setBooking] = useState(null);
    const dispatch = useDispatch();
    const { isSuccess } = useSelector((state) => state.booking);
    const navigate = useNavigate();


    useEffect(() => {
        if (isSuccess) {
            //navigate to bookings
            navigate("/dashboard");
            dispatch(reset());
        }
    }, [isSuccess, navigate, dispatch]);
    useEffect(() => {
        dispatch(reset());
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
    const handleConfirm = () => {
    }
    const handleDelete = () => {
        dispatch(deleteBooking(id));

    }
    return (
        <div className="booking-container">
            <h1 className="heading">Booking Details</h1>

            {booking && (
                <div className="text-wrapper">
                    <div className="booking-info">
                        <div className="label">Name</div>
                        <div className="value">{booking.name}</div>
                    </div>

                    <div className="booking-info">
                        <div className="label">Room</div>
                        <div className="value">{booking.roomId.name}</div>
                    </div>

                    <div className="booking-info">
                        <div className="label">Email</div>
                        <div className="value">{booking.email}</div>
                    </div>

                    <div className="booking-dates">
                        <div className="date-info">
                            <div className="label">Check-In Date</div>
                            <div className="date">{booking.checkInDate}</div>
                        </div>
                        <div className="date-info">
                            <div className="label">Check-Out Date</div>
                            <div className="date">{booking.checkOutDate}</div>
                        </div>
                    </div>

                    <div className="action-buttons">
                        <button className="btn confirm-btn" onClick={handleConfirm}>
                            Confirm
                        </button>
                        <button className="btn delete-btn" onClick={handleDelete}>
                            Delete
                        </button>
                    </div>
                </div>
            )}
        </div>
    );

}

export default Booking
