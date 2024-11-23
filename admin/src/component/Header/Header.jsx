import "./header.styles.scss";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser, reset } from "../../features/auth/authSlice";
import { useEffect, useState } from "react";

const Header = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const location = useLocation();
    const [activeLink, setActiveLink] = useState(location.pathname);

    const handleLogout = async () => {
        dispatch(logoutUser());
        dispatch(reset());
    };

    useEffect(() => {
        setActiveLink(location.pathname);
    }, [location.pathname]);

    return (
        <header className="main-header">
            <div className="container">
                <Link to="/">
                    <div className="logo">
                        <img src={process.env.PUBLIC_URL + "/logo.png"} alt="Logo" />
                    </div>
                </Link>
                <nav>
                    <Link to="/rooms" className={activeLink === "/rooms" ? "active" : ""}>Rooms</Link>
                    {user ? (
                        <>
                            <Link to="/dashboard" className={activeLink === "/dashboard" ? "active" : ""}>Dashboard</Link>
                            <Link to="/rooms/create" className={activeLink === "/rooms/create" ? "active" : ""}>Create</Link>
                            <button onClick={handleLogout}>Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className={activeLink === "/login" ? "active" : ""}>Login</Link>
                            <Link to="/register" className={activeLink === "/register" ? "active" : ""}>Register</Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;