import "./booking.styles.scss";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { createBooking, reset } from "../../features/booking/bookingSlice";
import { useDispatch, useSelector } from "react-redux";

const Booking = () => {
    const { id: roomId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isSuccess } = useSelector((state) => state.booking);
    const [room, setRoom] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        checkInDate: "",
        checkOutDate: "",
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const { name, email, checkInDate, checkOutDate } = formData;

    useEffect(() => {
        const getRoom = async () => {
            try {
                const res = await fetch(`/api/rooms/${roomId}`);
                const data = await res.json();
                if (!res.ok) {
                    return console.log("There was a problem getting room");
                }
                setRoom(data);
            } catch (error) {
                console.log(error.message);
            }
        };
        getRoom();
    }, [roomId]);

    useEffect(() => {
        if (isSuccess) {
            navigate("/success");
            dispatch(reset());
        }
    }, [isSuccess, navigate, dispatch]);

    const handleChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const dataToSubmit = {
            roomId,
            name,
            email,
            checkInDate,
            checkOutDate
        };

        fetch("/api/bookings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dataToSubmit)
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    console.log("Booking successful");
                    navigate("/success");
                } else {
                    console.error("Booking failed:", data.message);
                    alert("Có lỗi xảy ra. Vui lòng thử lại.");
                }
                return;
            })
            .catch(err => {
                console.error(err);
                alert("Có lỗi xảy ra. Vui lòng thử lại.");
            });
    };



    return (
        <div>
            <h1 className="heading center">Book Now</h1>
            <div className="form-wrapper">
                {error && <div className="error-message">{error}</div>}
                <form action="" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={name}
                            placeholder="Enter full name"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            placeholder="Enter your email"
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="checkInDate">In date</label>
                        <input
                            type="date"
                            name="checkInDate"
                            value={checkInDate}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="checkOutDate">Out date</label>
                        <input
                            type="date"
                            name="checkOutDate"
                            value={checkOutDate}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" disabled={isLoading}>
                        {isLoading ? "Processing..." : "Submit"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Booking;
