import React from 'react'
import { Routes, Route } from "react-router-dom";
import { Navbar } from '../components/Navbar';
import { Signup } from '../pages/authentication/Signup';
import { Login } from '../pages/authentication/Login';
import { Logout } from '../pages/authentication/Logout';
import { AllTask } from '../pages/task/AllTask';
import { UpdateProfile } from '../pages/authentication/UpdateProfile';
import { Profile } from '../pages/authentication/Profile';
import { UpdateTask } from '../pages/task/UpdateTask';
import { CreateTaskForm } from '../pages/task/CreateTaskForm';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';


export const Routing = () => {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path='/signup' element={<PublicRoute><Signup /></PublicRoute>} />
                <Route path='/login' element={<PublicRoute><Login /></PublicRoute>} />
                <Route path='/logout' element={<Logout />} />
                <Route path='/' element={<PrivateRoute><AllTask /></PrivateRoute>} />
                <Route path='/update-profile' element={<PrivateRoute><UpdateProfile /></PrivateRoute>} />
                <Route path='/profile' element={<PrivateRoute><Profile /></PrivateRoute>} />
                <Route path='/update-task/:id' element={<PrivateRoute><UpdateTask /></PrivateRoute>} />
                <Route path='/task-form' element={<PrivateRoute><CreateTaskForm /></PrivateRoute>} />
            </Routes>
        </>
    )
}
