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
        from: '"Hotel Booking" <your-email@gmail.com>',
        to: to,
        subject: 'Xác nhận thanh toán',
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <div style="max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
                    <h1 style="text-align: center; color: #4CAF50;">Xác nhận đặt phòng</h1>
                    <p>Xin chào <strong>${name}</strong>,</p>
                    <p>Cảm ơn bạn đã đặt phòng tại khách sạn của chúng tôi. Dưới đây là chi tiết đặt phòng của bạn:</p>
                    <ul style="list-style-type: none; padding: 0;">
                        <li style="padding: 10px; border: 1px solid #ddd; border-radius: 4px; margin-bottom: 10px;">
                            <strong>Mã phòng:</strong> ${roomId.name}
                        </li>
                        <li style="padding: 10px; border: 1px solid #ddd; border-radius: 4px; margin-bottom: 10px;">
                            <strong>Ngày nhận phòng:</strong> ${new Date(checkInDate).toLocaleDateString()}
                        </li>
                        <li style="padding: 10px; border: 1px solid #ddd; border-radius: 4px; margin-bottom: 10px;">
                            <strong>Ngày trả phòng:</strong> ${new Date(checkOutDate).toLocaleDateString()}
                        </li>
                    </ul>
                    <div style="text-align: center;">
                        <img src="https://res.cloudinary.com/dvvefarog/image/upload/v1732901665/z6060000453380_e1857ad9614246ab92f467a0119c435c_i4cllr.jpg" alt="QR Code" style="max-width: 100%; height: auto; border-radius: 8px;"/>
                    </div>
                    <p style="margin-top: 20px;">Chúng tôi rất mong được đón tiếp bạn!</p>
                    <footer style="text-align: center; margin-top: 30px; font-size: 0.9em; color: #777;">
                        <p>Khách sạn ABC</p>
                        <p>Địa chỉ: 123 Đường XYZ, Thành phố, Quốc gia</p>
                        <p>Điện thoại: (012) 345-6789</p>
                    </footer>
                </div>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email đã được gửi thành công');
    } catch (error) {
        console.log('Lỗi gửi email:', error);
    }
};
// Hàm gửi email thông báo xóa booking
const sendBookingConfirmations = async (to, bookingDetails) => {
    const { name, checkInDate, checkOutDate, roomId } = bookingDetails;
    const mailOptions = {
        from: '"Hotel Booking" <your-email@gmail.com>',
        to: to,
        subject: 'Đặt phòng thành công',
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <div style="max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
                    <h1 style="text-align: center; color: #4CAF50;">Đặt phòng thành công</h1>
                    <p>Xin chào <strong>${name}</strong>,</p>
                    <p>Cảm ơn bạn đã đặt phòng tại khách sạn của chúng tôi. Dưới đây là chi tiết đặt phòng của bạn:</p>
                    <ul style="list-style-type: none; padding: 0;">
                        <li style="padding: 10px; border: 1px solid #ddd; border-radius: 4px; margin-bottom: 10px;">
                            <strong>Mã phòng:</strong> ${roomId.name}
                        </li>
                        <li style="padding: 10px; border: 1px solid #ddd; border-radius: 4px; margin-bottom: 10px;">
                            <strong>Ngày nhận phòng:</strong> ${new Date(checkInDate).toLocaleDateString()}
                        </li>
                        <li style="padding: 10px; border: 1px solid #ddd; border-radius: 4px; margin-bottom: 10px;">
                            <strong>Ngày trả phòng:</strong> ${new Date(checkOutDate).toLocaleDateString()}
                        </li>
                    </ul>
                    
                    <p style="margin-top: 20px;">Chúng tôi rất mong được đón tiếp bạn!</p>
                    <footer style="text-align: center; margin-top: 30px; font-size: 0.9em; color: #777;">
                        <p>Khách sạn ABC</p>
                        <p>Địa chỉ: 123 Đường XYZ, Thành phố, Quốc gia</p>
                        <p>Điện thoại: (012) 345-6789</p>
                    </footer>
                </div>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email đã được gửi thành công');
    } catch (error) {
        console.log('Lỗi gửi email:', error);
    }
};
const sendDeleteNotification = async (to, bookingDetails) => {
    const { name, roomId, checkInDate, checkOutDate } = bookingDetails;
    const mailOptions = {
        from: '"Hotel Booking" <your-email@gmail.com>',
        to: to,
        subject: 'Thông báo hủy đặt phòng',
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <div style="max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
                    <h1 style="text-align: center; color: #D9534F;">Thông báo hủy đặt phòng</h1>
                    <p>Xin chào <strong>${name}</strong>,</p>
                    <p>Chúng tôi xin thông báo rằng đặt phòng của bạn với mã phòng <strong>${roomId.name}</strong> đã bị hủy.</p>
                    <p><b>Chi tiết đặt phòng:</b></p>
                    <ul style="list-style-type: none; padding: 0;">
                        <li style="padding: 10px; border: 1px solid #ddd; border-radius: 4px; margin-bottom: 10px;">
                            <strong>Mã phòng:</strong> ${roomId.name}
                        </li>
                        <li style="padding: 10px; border: 1px solid #ddd; border-radius: 4px; margin-bottom: 10px;">
                            <strong>Ngày nhận phòng:</strong> ${new Date(checkInDate).toLocaleDateString()}
                        </li>
                        <li style="padding: 10px; border: 1px solid #ddd; border-radius: 4px; margin-bottom: 10px;">
                            <strong>Ngày trả phòng:</strong> ${new Date(checkOutDate).toLocaleDateString()}
                        </li>
                    </ul>
                    <p>Chúng tôi rất tiếc vì sự bất tiện này và hy vọng được phục vụ bạn trong tương lai!</p>
                    <footer style="text-align: center; margin-top: 30px; font-size: 0.9em; color: #777;">
                        <p>Khách sạn ABC</p>
                        <p>Địa chỉ: 123 Đường XYZ, Thành phố, Quốc gia</p>
                        <p>Điện thoại: (012) 345-6789</p>
                    </footer>
                </div>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email thông báo xóa đã được gửi thành công');
    } catch (error) {
        console.log('Lỗi gửi email thông báo xóa:', error);
    }
};

module.exports = { sendBookingConfirmation, sendBookingConfirmations, sendDeleteNotification };
