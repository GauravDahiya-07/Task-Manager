import React, { useState, useEffect } from 'react'
import TaskContext from './TaskContext'
import axios from 'axios';

const TaskContextProvider = ({ children }) => {

    const [tasks, setTasks] = useState([]);
    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');
    const [assignedTo, setAssignedTo] = useState('');
    const [selectedTask, setSelectedTask] = useState(null);
    const [status, setStatus] = useState(''); 
    const [currentPage, setCurrentPage] = useState(1);
    const [tasksPerPage, setTasksPerPage] = useState(10);

           
    return (
        <TaskContext.Provider value={{  tasks, setTasks, taskName, setTaskName,description, setDescription, 
        deadline, setDeadline, assignedTo, setAssignedTo, selectedTask, setSelectedTask, 
        status,setStatus ,tasksPerPage, setTasksPerPage,currentPage, setCurrentPage }}>
            {children}
        </TaskContext.Provider>
    )
}

export default TaskContextProvider