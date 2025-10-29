import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/Authcontext";
import { logoutApi } from "../api/authentication/logout";
import { handleSuccessMessage } from "../toastMessgae/success.message";
import { handleErrorMessage } from "../toastMessgae/error.message";

export const Navbar = () => {

    const { removeDataFromLocalStorage } = useAuthContext();

    const navigate = useNavigate();

    const name = localStorage.getItem("name");

    const handleLogout = async () => {
        try {
            const result = await logoutApi();
            const { success, message, error } = result;

            if (success) {
                handleSuccessMessage(message);
                removeDataFromLocalStorage();
                setTimeout(() => {
                    navigate("/logout")
                }, 2000);

            } else if (!success) {
                handleErrorMessage(message);
            } else {
                handleErrorMessage(error);
            }
        } catch (error) {
            handleErrorMessage(error.message);
        };
    };
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <h2 className="navbar-brand fw-bold" to="/">
                    Primetrade.ai
                </h2>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div
                    className="collapse navbar-collapse justify-content-lg-end text-center"
                    id="navbarNav"
                >
                    <ul className="navbar-nav gap-lg-4">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/" end>
                                Dashboard
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/task-form" end>
                                Add Task
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/profile">
                                Profile
                            </NavLink>
                        </li>
                        {!name &&
                            <>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/login">
                                        Login
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/signup">
                                        Signup
                                    </NavLink>
                                </li>
                            </>
                        }
                        {name &&
                            <>
                                <li className="nav-item">
                                    <button className="nav-link" onClick={handleLogout}>
                                        Logout
                                    </button>
                                </li>
                            </>
                        }
                    </ul>
                </div>
            </div>
        </nav >
    );
};
