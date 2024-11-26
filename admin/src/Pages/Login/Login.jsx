import { useState, useEffect } from 'react';
import { loginUser  , reset } from '../../features/auth/authSlice';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, isSuccess, isError, message } = useSelector((state) => state.auth);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });
    const { email, password } = formData;

    useEffect(() => {
        if (isSuccess) {
            navigate('/dashboard');
            dispatch(reset());
        }
        if (isError) {
            // Kiểm tra và hiển thị thông báo lỗi
            const errorMessage = typeof message === 'string' ? message : JSON.stringify(message);
            alert(errorMessage); 
            dispatch(reset());
        }
    }, [isSuccess, isError, message, user, dispatch, navigate]);

    const handleChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const dataToSubmit = {
            email,
            password,
        };
        dispatch(loginUser (dataToSubmit));
    };

    return (
        <div className="container">
            <h1 className="heading center">Login</h1>
            <div className="form-wrapper">
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input type="text" placeholder="Enter your email" value={email} name='email' onChange={handleChange} />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" placeholder="Enter your password" value={password} name='password' onChange={handleChange} />
                    </div>

                    <button type='submit'>Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Register;