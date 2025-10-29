import React from 'react'
import { useState } from 'react';
import { FaUserEdit } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { allTaskApi } from '../../api/task/allTaskApi';
import { handleSuccessMessage } from '../../toastMessgae/success.message';
import { handleErrorMessage } from '../../toastMessgae/error.message';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';

export const Profile = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [task, setTask] = useState([]);

    const handleUpdateTheProfile = () => {
        navigate("/update-profile");
    };

    const name = localStorage.getItem("name");
    const email = localStorage.getItem("email");

    const fetchData = async () => {
        try {
            setLoading(true);
            const result = await allTaskApi();
            const { success, message, error, data } = result;

            if (success) {
                // handleSuccessMessage(message);
                setTask(data);
            } else if (!success) {
                // handleErrorMessage(message);
                setTask([]);
            } else {
                // handleErrorMessage(error);
                setTask([]);
            }
        } catch (error) {
            handleErrorMessage(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const totalTask = task.length;
    const completedTask = task.filter((curr) => curr.completed === true).length;
    const pendingTask = totalTask - completedTask;

    return (
        <>
            <Helmet>
                <title>Profile</title>
                <meta name="description" content="View and manage your Task Manager profile. Access your account details, email, and personal settings." />
                <meta name="keywords" content="Profile, User Profile, Task Manager Account, Account Details, User Info" />
            </Helmet>

            {loading ? (
                <div className="d-flex flex-column justify-content-center align-items-center vh-100">
                    <div className="spinner-border text-primary mb-3" role="status"></div>
                    <p className="fw-semibold text-muted">Loading profile data...</p>
                </div>
            ) : (
                <div className="d-flex justify-content-center align-items-center vh-100">
                    <div
                        className="card border-0 p-4 text-center"
                        style={{ maxWidth: "22rem", width: "100%" }}
                    >
                        <div className="position-relative">
                            <img
                                src="demo image.avif"
                                alt="Profile"
                                className="rounded-circle mx-auto d-block border border-3 border-primary"
                                style={{ width: "120px", height: "120px", objectFit: "cover" }}
                            />
                            <button
                                onClick={handleUpdateTheProfile}
                                className="btn btn-primary rounded-circle position-absolute"
                                style={{
                                    top: "75%",
                                    right: "35%",
                                    transform: "translate(50%, -50%)",
                                }}
                            >
                                <FaUserEdit />
                            </button>
                        </div>

                        <h4 className="mt-4 mb-1 text-dark fw-bold">{name}</h4>
                        <p className="text-muted mb-3">{email}</p>

                        <div className="d-flex justify-content-around mt-3">
                            <div>
                                <h6 className="fw-bold text-primary">{totalTask}</h6>
                                <p className="text-muted small mb-0">Total Task</p>
                            </div>
                            <div>
                                <h6 className="fw-bold text-primary">{completedTask}</h6>
                                <p className="text-muted small mb-0">Completed Task</p>
                            </div>
                            <div>
                                <h6 className="fw-bold text-primary">{pendingTask}</h6>
                                <p className="text-muted small mb-0">Pending Task</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
