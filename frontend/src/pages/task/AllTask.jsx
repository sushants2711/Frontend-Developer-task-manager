import React, { useEffect, useState } from 'react'
import { FaEdit } from "react-icons/fa";
import { handleErrorMessage } from '../../toastMessgae/error.message';
import { allTaskApi } from '../../api/task/allTaskApi';
import { handleSuccessMessage } from '../../toastMessgae/success.message';
import { toggleApi } from '../../api/task/toggleApi';
import { deleteTaskApi } from '../../api/task/deleteTaskApi';
import { ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export const AllTask = () => {

    const navigate = useNavigate();

    const [task, setTask] = useState([]);
    const [loading, setLoading] = useState(false);

    const [searchData, setSearchData] = useState({
        title: "",
        completed: "",
        createdAt: ""
    });

    const handleChange = (e) => {
        const name = e.target.name;
        let value = e.target.value;

        if (name === "completed") {
            if (value === "true") value = true;
            else if (value === "false") value = false;
            else value = "";
        };

        setSearchData({
            ...searchData,
            [name]: value
        });
    };

    const fetchData = async () => {
        try {
            setLoading(true);
            const result = await allTaskApi();
            const { success, message, error, data } = result;

            if (success) {
                // handleSuccessMessage(message);
                setTask(data);
            } else if (!success) {
                handleErrorMessage(message);
                setTask([]);
            } else {
                handleErrorMessage(error);
                setTask([]);
            }
        } catch (error) {
            handleErrorMessage(error.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchFilterData = async () => {
        if (searchData) {
            try {
                const result = await allTaskApi(searchData);
                const { success, message, error, data } = result;

                if (success) {
                    // handleSuccessMessage(message);
                    setTask(data);
                } else if (!success) {
                    handleErrorMessage(message);
                    setTask([]);
                } else {
                    handleErrorMessage(error);
                    setTask([]);
                };
            } catch (error) {
                handleErrorMessage(error.message);
            };
        } else {
            fetchData();
        };
    };

    useEffect(() => {
        fetchFilterData(searchData);
    }, [searchData]);


    const handleToggle = async (id) => {
        try {
            const result = await toggleApi(id);
            const { success, message, error } = result;

            if (success) {
                handleSuccessMessage(message);
                fetchData();
            } else if (!success) {
                handleErrorMessage(message);
            } else {
                handleErrorMessage(error);
            }
        } catch (error) {
            handleErrorMessage(error.message);
        };
    };

    const handleDelete = async (id) => {
        try {
            const result = await deleteTaskApi(id);
            const { success, message, error } = result;

            if (success) {
                handleSuccessMessage(message);
                fetchData();
            } else if (!success) {
                handleErrorMessage(message);
            } else {
                handleErrorMessage(error);
            };
        } catch (error) {
            handleErrorMessage(error.message);
        };
    };

    const handleEdit = (id) => {
        if (id) {
            const decode = btoa(id);
            navigate(`/update-task/${decode}`);
        };
    };

    return (
        <>
            <Helmet>
                <title>All Task</title>
                <meta name="description" content="View all your tasks in one place. Track progress, filter completed tasks, and stay organized with Task Manager." />
                <meta name="keywords" content="All Tasks, Task List, View Tasks, Manage Tasks, Productivity, To-do List" />
            </Helmet>

            <div className="container my-5">
                <div className="row mb-4">
                    <div className="col-md-6 mb-2">
                        <input
                            name='title'
                            type="search"
                            className="form-control"
                            placeholder="Search task..."
                            onChange={handleChange}
                            value={searchData.title}
                        />
                    </div>
                    <div className="col-md-3 mb-2">
                        <select name="completed" className="form-select" onChange={handleChange} value={searchData.completed}>
                            <option value="">All</option>
                            <option value="true">Completed</option>
                            <option value="false">Pending</option>
                        </select>
                    </div>
                    <div className="col-md-3 mb-2 d-flex align-items-center">
                        <div className="form-check me-2">
                            <input className="form-check-input" type="radio" name="createdAt" id="newest" value="dsc" onChange={handleChange} />
                            <label className="form-check-label" htmlFor="newest">
                                Newest
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="createdAt" id="oldest" value="asc" onChange={handleChange} />
                            <label className="form-check-label" htmlFor="oldest">
                                Oldest
                            </label>
                        </div>
                    </div>
                </div>


                {loading ? (
                    <div className="text-center my-5">
                        <div className="spinner-border text-primary mb-3" role="status"></div>
                        <p className="fw-semibold text-muted">Loading tasks...</p>
                    </div>
                ) : (
                    <div className="row g-3">
                        {task.length > 0 ? (
                            task.map((item) => (
                                <div key={item._id} className="col-12 col-md-6 col-lg-4">
                                    <div className="card shadow-sm p-3 h-100 position-relative">
                                        <div className="position-absolute top-0 end-0 p-2">
                                            <FaEdit className="text-primary" style={{ cursor: 'pointer' }} onClick={() => handleEdit(item._id)} />
                                        </div>
                                        <h5 className="card-title">{item.title}</h5>
                                        <p className="card-text">{item.description}</p>
                                        <p className="mb-2">
                                            <strong>Status:</strong> {item.completed ? "Completed" : "Pending"}
                                        </p>
                                        <p className="mb-2">
                                            <strong>Created At:</strong> {new Date(item.createdAt).toLocaleDateString()}
                                        </p>

                                        <div className="mt-auto pt-4">
                                            <button onClick={() => handleToggle(item._id)}
                                                className={`btn btn-sm w-100 ${item.completed ? "btn-success" : "btn-warning"}`}
                                            >
                                                {item.completed ? "Mark as Pending" : "Mark as Completed"}
                                            </button>

                                            <button onClick={() => handleDelete(item._id)}
                                                className="btn btn-sm btn-danger mt-2 w-100"
                                            >
                                                Delete Task
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-muted">No tasks found</p>
                        )}
                    </div>
                )}
                <ToastContainer />
            </div>
        </>
    );
};
