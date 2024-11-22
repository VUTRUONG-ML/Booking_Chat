const Booking = require("../models/bookingModel");
const { sendBookingConfirmation, sendBookingConfirmations, sendDeleteNotification } = require("../services/emailService");
const getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().populate("roomId");
        if (!bookings) {
            res.status(400);
            throw new Error("Cannot find bookings!");
        }
        return res.status(200).json(bookings);
    } catch (error) {
        next(error);
    }
}

// const createBooking = async (req, res, next) => {
//     try {
//         const booking = await Booking.create(req.body);
//         if (!booking) {
//             res.status(400);
//             throw new Error("Cannot create booking");
//         }
//         return res.status(201).json(booking);
//     } catch (error) {
//         next(error);
//     }
// }

const createBooking = async (req, res, next) => {
    try {
        const booking = await Booking.create(req.body);
        if (!booking) {
            res.status(400);
            throw new Error("Không thể tạo đặt phòng");
        }

        // Lấy booking đã tạo và populate roomId
        const populatedBooking = await Booking.findById(booking._id).populate("roomId");

        // Gửi email xác nhận sau khi đặt phòng thành công
        await sendBookingConfirmation(req.body.email, {
            name: req.body.name,
            roomId: populatedBooking.roomId,
            checkInDate: req.body.checkInDate,
            checkOutDate: req.body.checkOutDate
        });

        return res.status(201).json({
            success: true,
            message: "Booking created successfully",
            data: populatedBooking,
        });

    } catch (error) {
        next(error);
    }
};

const updateBooking = async (req, res, next) => {
    try {
        const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, {
            new: true
        });

        if (!updatedBooking) {
            res.status(400);
            throw new Error("Cannot create booking!");
        }
        const bookings = await Booking.find();
        return res.status(200).json(bookings);
    } catch (error) {
        next(error);
    }
}
const deleteBooking = async (req, res, next) => {
    try {
        const booking = await Booking.findById(req.params.id).populate("roomId");
        if (!booking) {
            res.status(400);
            throw new Error("Cannot delete booking!");
        }

        // Gửi email thông báo xóa booking
        await sendDeleteNotification(booking.email, {
            name: booking.name,
            roomId: booking.roomId,
            checkInDate: booking.checkInDate,
            checkOutDate: booking.checkOutDate
        });

        // Xóa booking
        await Booking.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            success: true,
            message: "Booking deleted successfully",
            id: req.params.id
        });
    } catch (error) {
        next(error);
    }
};
//get single booking
const getBooking = async (req, res, next) => {
    try {
        const booking = await Booking.findById(req.params.id).populate("roomId");
        if (!booking) {
            res.status(400);
            throw new Error("Booking not found!")
        }
        return res.status(200).json(booking);
    } catch (error) {
        next(error);
    }
}
const confirmBooking = async (req, res, next) => {
    try {
        const booking = await Booking.findById(req.params.id).populate("roomId");
        if (!booking) {
            res.status(400);
            throw new Error("Booking not found!");
        }

        // Cập nhật trạng thái xác nhận
        booking.confirmed = true;
        await booking.save();

        // Gửi email xác nhận
        await sendBookingConfirmations(booking.email, {
            name: booking.name,
            roomId: booking.roomId,
            checkInDate: booking.checkInDate,
            checkOutDate: booking.checkOutDate
        });

        return res.status(200).json({
            success: true,
            message: "Booking confirmed successfully",
            data: booking,
        });
    } catch (error) {
        next(error);
    }
};
module.exports = {
    getBookings,
    createBooking,
    updateBooking,
    deleteBooking,
    getBooking,
    confirmBooking
};
