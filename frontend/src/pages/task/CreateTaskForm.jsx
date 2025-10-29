import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { handleErrorMessage } from '../../toastMessgae/error.message';
import { createTaskApi } from '../../api/task/createTaskApi';
import { handleSuccessMessage } from '../../toastMessgae/success.message';
import { ToastContainer } from 'react-toastify';
import { Helmet } from 'react-helmet';


export const CreateTaskForm = () => {
    const navigate = useNavigate();

    const [createTask, setCreateTask] = useState({
        title: "",
        description: "",
        completed: ""
    });

    const handleChange = (e) => {
        const name = e.target.name;
        let value = e.target.value;

        if (name === "completed") {
            if (value === "true") value = true;
            else if (value === "false") value = false;
        };

        setCreateTask({
            ...createTask,
            [name]: value
        });
    };

    const handleTaskCreate = async (e) => {
        e.preventDefault();

        const { title, description, completed } = createTask;

        if (!title || !description || !completed) {
            handleErrorMessage("All field are required");
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
            const result = await createTaskApi(createTask);
            const { success, message, error } = result;

            if (success) {
                handleSuccessMessage(message);
                setCreateTask({
                    title: "",
                    description: "",
                    completed: ""
                });

                setTimeout(() => {
                    navigate("/");
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
                <title>Create-Task</title>
                <meta name="description" content="Add a new task with title, description, and completion status. Manage your to-do list efficiently with Task Manager." />
                <meta name="keywords" content="Create Task, Add Task, New Task, Task Manager, To-do App, Productivity" />
            </Helmet>

            <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8 col-lg-6">
                        <div className="card shadow-sm p-4">
                            <h3 className="text-center mb-4 fw-bold">Create Task</h3>
                            <form onSubmit={handleTaskCreate}>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="title"
                                        name="title"
                                        placeholder="Enter task title"
                                        onChange={handleChange}
                                        value={createTask.title}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">
                                        Description
                                    </label>
                                    <textarea
                                        className="form-control"
                                        id="description"
                                        name="description"
                                        rows="4"
                                        placeholder="Enter task description"
                                        onChange={handleChange}
                                        value={createTask.description}
                                    ></textarea>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="completed" className="form-label">
                                        Completed
                                    </label>
                                    <select
                                        className="form-select"
                                        id="completed"
                                        name="completed"
                                        onChange={handleChange}
                                        value={createTask.completed}
                                    >
                                        <option value="" selected disabled>Select any one</option>
                                        <option value="true">True</option>
                                        <option value="false">False</option>
                                    </select>
                                </div>
                                <button type="submit" className="btn btn-primary w-100">
                                    Create Task
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
