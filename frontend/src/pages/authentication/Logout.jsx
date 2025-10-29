import React from 'react'
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom'

export const Logout = () => {
    const navigate = useNavigate();

    setTimeout(() => {
        navigate("/login");
    }, 3000);

    return (
        <>
            <Helmet>
                <title>Logout</title>
                <meta name="description" content="Logout securely from your Task Manager account. End your session safely and protect your data." />
                <meta name="keywords" content="Logout, Task Manager, Secure Logout, User Session, Sign Out" />
            </Helmet>

            <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
                <div className="card p-4 shadow-lg text-center" style={{ width: "24rem" }}>
                    <div className="alert alert-success mb-3" role="alert">
                        You have been logged out successfully!
                    </div>
                    <p className="text-muted">Redirecting to login page after 3 seconds...</p>
                </div>
            </div>
        </>
    )
}
