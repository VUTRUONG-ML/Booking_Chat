import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getBookings, reset } from "../../features/booking/bookingSlice";
import BookingList from "../../component/BookingList/BookingList";
import "./Dashboard.styles.scss";

const Dashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);
    const { bookings, isSuccess } = useSelector((state) => state.booking);

    useEffect(() => {
        if (isSuccess) {
            dispatch(reset());
        }
    }, [isSuccess, dispatch]);

    useEffect(() => {
        if (!user) {
            navigate("/login");
        } else {
            dispatch(getBookings());
        }
    }, [user, navigate, dispatch]);

    return (
        <div className="dashboard-container">
            <h1 className="heading center">Dashboard</h1>
            {bookings.length > 0 ? (
                <div className="booking-list">
                    <BookingList data={bookings} />
                </div>
            ) : (
                <p className="center">No bookings available.</p>
            )}
        </div>
    );
};

export default Dashboard;