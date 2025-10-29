import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleErrorMessage } from "../../toastMessgae/error.message";
import { loginApi } from "../../api/authentication/loginApi";
import { handleSuccessMessage } from "../../toastMessgae/success.message";
import { ToastContainer } from "react-toastify";
import { useAuthContext } from "../../context/Authcontext";
import { Helmet } from "react-helmet";

export const Login = () => {

    const { setUserDetailsInLocalStorage } = useAuthContext();

    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setLoginData({
            ...loginData,
            [name]: value
        });
    };

    const handleLoginFormSubmit = async (e) => {
        e.preventDefault();
        const { email, password } = loginData;

        if (!email || !password) {
            handleErrorMessage("All fields are required");
            return;
        };

        if (email && !email.includes("@")) {
            handleErrorMessage("Invalid email Id");
            return;
        };

        if (password && password.length < 8) {
            handleErrorMessage("Password must be 8 Characters long");
            return;
        };

        try {
            const result = await loginApi(loginData);
            const { success, message, error, name, email } = result;

            if (success) {
                handleSuccessMessage(message);
                setUserDetailsInLocalStorage(name, email);
                setLoginData({
                    email: "",
                    password: "",
                });
                setTimeout(() => navigate("/"), 2000);

            } else if (!success) {
                handleErrorMessage(message);
            } else {
                handleErrorMessage(error);
            };
        } catch (error) {
            handleErrorMessage(error.message);
        }
    };

    return (
        <>
            <Helmet>
                <title>Login</title>

                <meta name="description" content="Login to your Task Manager account to manage, create, and track your tasks efficiently." />

                <meta name="keywords" content="Task Manager, Login, Productivity App, Task Tracking, To-do List" />
            </Helmet>

            <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
                <div className="card shadow-lg p-4" style={{ width: "100%", maxWidth: "420px" }}>
                    <h3 className="text-center mb-4 mt-3 fw-bold text-primary">Welcome Back</h3>
                    <form onSubmit={handleLoginFormSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label fw-semibold">Email Address</label>
                            <input type="email" name="email" className="form-control" id="email" placeholder="Enter your email" onChange={handleChange} value={loginData.email} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label fw-semibold">Password</label>
                            <input type="password" name="password" className="form-control" id="password" placeholder="Enter your password" onChange={handleChange} value={loginData.password} />
                        </div>
                        <button type="submit" className="btn btn-primary w-100 mt-2">Login</button>
                        <p className="text-center text-muted mt-3 mb-0">
                            Don’t have an account? <Link to="/signup" className="text-decoration-none">Sign Up</Link>
                        </p>
                    </form>
                </div>
                <ToastContainer />
            </div>
        </>
    )
}