import React from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { handleErrorMessage } from '../../toastMessgae/error.message';
import { getTaskById } from '../../api/task/getTaskById';
import { handleSuccessMessage } from '../../toastMessgae/success.message';
import { useEffect } from 'react';
import { baseurl } from '../../api/baseurl/baseurl';
import { updateTaskApi } from '../../api/task/updateTaskApi';
import { ToastContainer } from 'react-toastify';
import { Helmet } from 'react-helmet';

export const UpdateTask = () => {

    const navigate = useNavigate();

    const { id } = useParams();

    const [taskData, setTaskData] = useState({
        title: "",
        description: "",
        completed: ""
    });

    let decode = null;

    if (id) decode = atob(id);

    const fetchTaskDetails = async () => {
        try {
            const result = await getTaskById(decode);
            const { success, message, data, error } = result;

            if (success) {
                setTaskData({
                    title: data.title,
                    description: data.description,
                    completed: data.completed
                });
            } else if (!success) {
                handleErrorMessage(message);
            } else {
                handleErrorMessage(error);
            };
        } catch (error) {
            handleErrorMessage(error.message);
        };
    };

    useEffect(() => {
        fetchTaskDetails();
    }, [id]);

    const handleChange = (e) => {
        const name = e.target.name;
        let value = e.target.value;

        if (name === "completed") {
            if (value === "true") value = true;
            else if (value === "false") value = false;
        };

        setTaskData({
            ...taskData,
            [name]: value
        });
    };

    const handleToUpdateTask = async (e) => {
        e.preventDefault();

        const { title, description, completed } = taskData;

        if (!title && !description && !completed) {
            handleErrorMessage("At least one field is required to Update the task.");
            return;
        };

        if (title && title.length < 5) {
            handleErrorMessage("Title must be at least 5 characters long");
            return;
        };

        if (description && description.length < 10) {
            handleErrorMessage("Description must be at least 10 characters long");
            return;
        };

        try {
            const result = await updateTaskApi(decode, taskData);
            const { success, message, error } = result;

            if (success) {
                handleSuccessMessage(message);
                setTimeout(() => {
                    navigate(-1);
                }, 2000);
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
                <title>Update-Task</title>
                <meta name="description" content="Edit or update existing tasks, modify descriptions, and mark tasks as completed in Task Manager." />
                <meta name="keywords" content="Update Task, Edit Task, Modify Task, Task Manager, Task Update, Productivity App" />
            </Helmet>

            <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8 col-lg-6">
                        <div className="card shadow-sm p-4">
                            <h3 className="mb-4 text-center">Update Task</h3>

                            <form onSubmit={handleToUpdateTask}>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        className="form-control"
                                        placeholder="Enter task title"
                                        onChange={handleChange}
                                        value={taskData.title}
                                    />
                                </div>


                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">
                                        Description
                                    </label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        className="form-control"
                                        placeholder="Enter task description"
                                        rows="4"
                                        onChange={handleChange}
                                        value={taskData.description}
                                    ></textarea>
                                </div>


                                <div className='mb-3'>
                                    <label htmlFor="completed" className='form-label'>
                                        Completed
                                    </label>
                                    <select name="completed" id="completed" className='form-control' onChange={handleChange}
                                        value={taskData.completed}>
                                        <option value="" selected disabled>Selected any one</option>
                                        <option value="true">true</option>
                                        <option value="false">false</option>
                                    </select>
                                </div>


                                <button type="submit" className="btn btn-primary w-100">
                                    Update Task
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </>
    );
};
