import React, { useEffect, useState } from "react";
import { useAuthContext } from "../../context/Authcontext";
import { useNavigate } from "react-router-dom";
import { handleErrorMessage } from "../../toastMessgae/error.message";
import { updateProfileApi } from "../../api/authentication/updateProfileApi";
import { handleSuccessMessage } from "../../toastMessgae/success.message";
import { profileDetailsAPi } from "../../api/authentication/profileDetail";
import { ToastContainer } from "react-toastify";
import { Helmet } from "react-helmet";

export const UpdateProfile = () => {

    const { setUserDetailsInLocalStorage } = useAuthContext();

    const navigate = useNavigate();

    const [profileData, setProfileData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const fetchProfileData = async () => {
        try {
            const result = await profileDetailsAPi();
            const { success, message, error, data } = result;

            if (success) {
                // handleSuccessMessage(message);
                setProfileData({
                    name: data.name,
                    email: data.email
                });
                setUserDetailsInLocalStorage(data.name, data.email);

            } else if (!success) {
                // handleErrorMessage(message);
            } else {
                // handleErrorMessage(error)
            }
        } catch (error) {
            // handleErrorMessage(error.message);
        };
    };

    useEffect(() => {
        fetchProfileData();
    }, []);

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setProfileData({
            ...profileData,
            [name]: value
        });
    };

    const handleToUpdateProfile = async (e) => {
        e.preventDefault();

        const { name, email, password } = profileData;

        if (!name && !email && !password) {
            handleErrorMessage("At least one field is required");
            return;
        };

        if (name && name.length < 2) {
            handleErrorMessage("Name must be greater than 2 Characters long");
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
            const result = await updateProfileApi(profileData);
            const { success, message, error, data } = result;

            if (success) {
                handleSuccessMessage(message);
                setUserDetailsInLocalStorage(data.name, data.email);
                setProfileData({
                    name: "",
                    email: "",
                    password: ""
                });
                setTimeout(() => navigate(-1), 2000);

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
                <title>Update-Profile</title>
                <meta name="description" content="Update your Task Manager profile to keep your information up-to-date, including name, email, and preferences." />
                <meta name="keywords" content="Update Profile, Edit Profile, Account Settings, User Profile, Task Manager" />
            </Helmet>

            <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
                <div className="card p-4 shadow-lg border-0" style={{ width: "25rem" }}>
                    <h3 className="text-center mb-4 text-danger fw-bold">
                        Update Profile
                    </h3>
                    <form onSubmit={handleToUpdateProfile}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label fw-semibold">
                                Name
                            </label>
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                id="name"
                                name="name"
                                placeholder="Enter your name"
                                onChange={handleChange}
                                value={profileData.name}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label fw-semibold">
                                Email
                            </label>
                            <input
                                type="email"
                                className="form-control form-control-lg"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                onChange={handleChange}
                                value={profileData.email}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="form-label fw-semibold">
                                Password
                            </label>
                            <input
                                type="password"
                                className="form-control form-control-lg"
                                id="password"
                                name="password"
                                placeholder="Enter new password"
                                onChange={handleChange}
                                value={profileData.password}
                            />
                        </div>
                        <button type="submit" className="btn btn-danger btn-lg w-100 shadow-sm">
                            Update
                        </button>
                    </form>
                </div>
                <ToastContainer />
            </div>
        </>
    );
};
