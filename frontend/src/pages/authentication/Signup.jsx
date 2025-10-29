import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { handleErrorMessage } from "../../toastMessgae/error.message";
import { useAuthContext } from "../../context/Authcontext";
import { signupApi } from "../../api/authentication/signupApi";
import { handleSuccessMessage } from "../../toastMessgae/success.message";
import { ToastContainer } from "react-toastify";
import { Helmet } from "react-helmet";



export const Signup = () => {

    const { setUserDetailsInLocalStorage } = useAuthContext();

    const navigate = useNavigate();

    const [signupData, setSignupData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setSignupData({
            ...signupData,
            [name]: value
        });
    };

    const handelFormSbmit = async (e) => {
        e.preventDefault();
        const { name, email, password, confirmPassword } = signupData;

        if (!name || !email || !password || !confirmPassword) {
            handleErrorMessage("All fields are required");
            return;
        };

        if (name && name.length < 2) {
            handleErrorMessage("Name must be 2 Characters long");
            return;
        };

        if (email && !email.includes("@")) {
            handleErrorMessage("Invalid email Id");
            return;
        };

        if (password && password.length < 8 || confirmPassword && confirmPassword.length < 8) {
            handleErrorMessage("Password must be 8 Characters long");
            return;
        };

        if (password !== confirmPassword) {
            handleErrorMessage("Password not match");
            return;
        }
        try {
            const result = await signupApi(signupData);
            const { success, message, error, name, email } = result;

            if (success) {
                handleSuccessMessage(message);
                setUserDetailsInLocalStorage(name, email);
                setSignupData({
                    name: "",
                    email: "",
                    password: "",
                    confirmPassword: ""
                });
                setTimeout(() => navigate("/"), 2000);

            } else if (!success) {
                handleErrorMessage(message);
            } else {
                handleErrorMessage(error);
            };
        } catch (error) {
            handleErrorMessage(error.message);
        };
    };

    return (
        <>
            <Helmet>
                <title>Signup</title>
                <meta name="description" content="Create your Task Manager account to manage tasks efficiently, stay organized, and boost productivity." />
                <meta name="keywords" content="Signup, Register, Task Manager, Create Account, Task Management, Productivity App" />
            </Helmet>

            <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
                <div className="card shadow-lg p-4" style={{ width: "100%", maxWidth: "420px" }}>

                    <h3 className="text-center mb-4 fw-bold text-primary">Create Account</h3>

                    <form onSubmit={handelFormSbmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label fw-semibold">Full Name</label>
                            <input type="text" name="name" className="form-control" id="name" placeholder="Enter your name" onChange={handleChange} value={signupData.name} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label fw-semibold">Email Address</label>
                            <input type="email" name="email" className="form-control" id="email" placeholder="Enter your email" onChange={handleChange} value={signupData.email} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label fw-semibold">Password</label>
                            <input type="password" name="password" className="form-control" id="password" placeholder="Enter password" onChange={handleChange} value={signupData.password} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="confirmPassword" className="form-label fw-semibold">Confirm Password</label>
                            <input type="password" name="confirmPassword" className="form-control" id="confirmPassword" placeholder="Enter your password again" onChange={handleChange} value={signupData.confirmPassword} />
                        </div>

                        <button type="submit" className="btn btn-primary w-100 mt-2">Sign Up</button>

                        <p className="text-center text-muted mt-3 mb-0">
                            Already have an account? <Link to="/login" className="text-decoration-none">Login</Link>
                        </p>
                    </form>
                </div>
                <ToastContainer />
            </div>
        </>
    );
};
