const nodemailer = require('nodemailer');

// Cấu hình transporter
const transporter = nodemailer.createTransport({
    service: 'Gmail', // hoặc sử dụng một dịch vụ khác như Outlook, Yahoo...
    auth: {
        user: 'thien349k@gmail.com', // Email của bạn
        pass: 'kyuo gxak ehos iftu'  // Mật khẩu ứng dụng (không dùng mật khẩu chính)
    }
});

// Hàm gửi email
const sendBookingConfirmation = async (to, bookingDetails) => {
    const { name, checkInDate, checkOutDate, roomId } = bookingDetails;
    const mailOptions = {
        from: '"Hotel Booking" <your-email@gmail.com>', // Tên hiển thị của người gửi
        to: to, // Email người nhận
        subject: 'Xác nhận đặt phòng thành công', // Chủ đề email
        html: `
            <h1>Xin chào ${name},</h1>
            <p>Cảm ơn bạn đã đặt phòng tại khách sạn của chúng tôi.</p>
            <p><b>Chi tiết đặt phòng:</b></p>
            <ul>
                <li>Mã phòng: ${roomId}</li>
                <li>Ngày nhận phòng: ${new Date(checkInDate).toLocaleDateString()}</li>
                <li>Ngày trả phòng: ${new Date(checkOutDate).toLocaleDateString()}</li>
            </ul>
            <p>Chúng tôi rất mong được đón tiếp bạn!</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email đã được gửi thành công');
    } catch (error) {
        console.log('Lỗi gửi email:', error);
    }
};


module.exports = { sendBookingConfirmation };
