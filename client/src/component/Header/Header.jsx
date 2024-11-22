import "./header.styles.scss";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ChatState } from "../../Context/ChatProvider";
import { Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const Header = () => {
    const { isLoggedIn, setIsLoggedIn } = ChatState(); // Lấy trạng thái người dùng
    const navigate = useNavigate();
    const location = useLocation();
    const [activeLink, setActiveLink] = useState(location.pathname);

    const logoutHandler = () => {
        localStorage.removeItem("userInfo"); // Xóa thông tin đăng nhập
        setIsLoggedIn(false);
        navigate("/login"); // Điều hướng về trang đăng nhập
    };

    useEffect(() => {
        setActiveLink(location.pathname); // Cập nhật trạng thái đường dẫn hiện tại
    }, [location.pathname]);

    // Hàm kiểm tra đường dẫn để gắn class "active"
    const isActive = (path) => (activeLink === path ? "active" : "");

    return (
        <header className="main-header">
            <div className="container">
                <Link to="/">
                    <div className="logo">
                        <img src={process.env.PUBLIC_URL + "/logo.png"} alt="Logo" />
                    </div>
                </Link>
                <nav className="namewed">
                    <h1> BK HOTEL</h1>
                </nav>
                <nav>
                    <Link to="/" className={isActive("/")}>
                        Home
                    </Link>
                    <Link to="/rooms" className={isActive("/rooms")}>
                        Rooms
                    </Link>
                    <Link to="/chat" className={isActive("/chat")}>
                        Chat
                    </Link>
                    {!isLoggedIn ? (
                        <Button
                            colorScheme="teal"
                            onClick={() => navigate("/login")}
                        >
                            Login
                        </Button> // Hiện nút Login khi chưa đăng nhập
                    ) : (
                        <Button colorScheme="red" onClick={logoutHandler}>
                            Logout
                        </Button> // Hiện nút Logout khi đã đăng nhập
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;
