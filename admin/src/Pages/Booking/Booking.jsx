import "./booking.styles.scss";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { deleteBooking, confirmBooking, reset } from "../../features/booking/bookingSlice";
import { useDispatch, useSelector } from "react-redux";

const Booking = () => {
    const { id } = useParams();
    const [booking, setBooking] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isConfirming, setIsConfirming] = useState(false);

    const dispatch = useDispatch();
    const { isSuccess, isError, message } = useSelector((state) => state.booking);
    const navigate = useNavigate();

    useEffect(() => {
        if (isSuccess) {
            navigate("/dashboard"); // Chuyển hướng đến trang dashboard
            dispatch(reset());
        }
        if (isError) {
            dispatch(reset());
        }
    }, [isSuccess, isError, message, navigate, dispatch]);

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
    }, [dispatch, id]);

    const handleConfirm = () => {
        if (window.confirm("Bạn có chắc chắn muốn xác nhận booking này không?")) {
            setIsConfirming(true); // Đặt trạng thái isConfirming thành true
            dispatch(confirmBooking(id)).then(() => {
                setIsConfirming(false); // Đặt trạng thái isConfirming thành false
                alert("Booking đã được xác nhận thành công!"); // Hiển thị thông báo sau khi xác nhận thành công
            }).catch(() => {
                setIsConfirming(false); // Đặt trạng thái isConfirming thành false nếu có lỗi
                alert("Có lỗi xảy ra khi xác nhận booking.");
            });
        }
    };

    const handleDelete = () => {
        if (window.confirm("Bạn có chắc chắn muốn xóa booking này không?")) {
            setIsDeleting(true); // Đặt trạng thái isDeleting thành true
            dispatch(deleteBooking(id)).then(() => {
                setIsDeleting(false); // Đặt trạng thái isDeleting thành false
                alert("Booking đã được xóa thành công!"); // Hiển thị thông báo sau khi xóa thành công
            }).catch(() => {
                setIsDeleting(false); // Đặt trạng thái isDeleting thành false nếu có lỗi
                alert("Có lỗi xảy ra khi xóa booking.");
            });
        }
    };

    return (
        <div className="booking-container">
            <h1 className="heading">Booking Details</h1>

            {booking ? (
                booking.roomId && booking.name && booking.email ? (
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
                            <button className="btn confirm-btn" onClick={handleConfirm} disabled={isConfirming}>
                                {isConfirming ? "Confirming..." : "Confirm"} {/* Thay đổi văn bản nút xác nhận */}
                            </button>
                            <button className="btn delete-btn" onClick={handleDelete} disabled={isDeleting}>
                                {isDeleting ? "Deleting..." : "Delete"}
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="error-message">Booking không đầy đủ thông tin.</div>
                )
            ) : (
                <div className="error-message">Booking không tồn tại hoặc đã bị xóa.</div>
            )}
        </div>
    );
}

export default Booking;