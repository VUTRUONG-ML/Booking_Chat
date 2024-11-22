import "./header.styles.scss";
import { Link, useNavigate } from "react-router-dom";
import { ChatState } from "../../Context/ChatProvider";
import { Button } from "@chakra-ui/react";

const Header = () => {
    const { isLoggedIn, setIsLoggedIn } = ChatState(); // Lấy trạng thái người dùng
    const navigate = useNavigate();
    const logoutHandler = () => {
        localStorage.removeItem("userInfo"); // Xóa thông tin đăng nhập
        setIsLoggedIn(false);
        navigate("/login"); // Điều hướng về trang chủ 
    };

    return (
        <header className="main-header">
            <div className="container">
                <Link to="/">
                    <div className="logo">
                        <img src={process.env.PUBLIC_URL + "/logo.png"} alt="Logo" />
                    </div>
                </Link>
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/rooms">Rooms</Link>
                    <Link to="/chat">Chat</Link>
                    {!isLoggedIn ? (
                        <button></button> // Hiện nút Login khi chưa đăng nhập
                    ) : (
                        <button onClick={logoutHandler}>Logout</button> // Hiện nút Logout khi đã đăng nhập
                    )}
                </nav>
            </div>
        </header>
    );
}
const links = document.querySelectorAll(".main-header nav");

links.forEach(link => {
    link.addEventListener("click", () => {
        links.forEach(item => item.classList.remove("active")); // Xóa lớp active cũ
        link.classList.add("active"); // Thêm lớp active mới
    });
});



export default Header;
