import React, { useState, useEffect } from 'react'
import TaskContext from './TaskContext'

const TaskContextProvider = ({ children }) => {

    const [tasks, setTasks] = useState([]);
    const [taskObj, setTaskObj] = useState({
        taskName: '',
        description: '',
        deadline: '',
        assignedTo: '',
        status: '',
    });

    const [selectedTask, setSelectedTask] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [tasksPerPage, setTasksPerPage] = useState(10);


    return (
        <TaskContext.Provider value={{
            tasks, setTasks, taskObj, setTaskObj, selectedTask, setSelectedTask,
            tasksPerPage, setTasksPerPage, currentPage, setCurrentPage
        }}>
            {children}
        </TaskContext.Provider>
    )
}

export default TaskContextProvider