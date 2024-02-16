import React, { useContext, useEffect, useState } from 'react';
import { Button, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import TaskContext from '../context/TaskContext';

const Filter = () => {
    const { tasks, setTasks } = useContext(TaskContext);
    const [originalTasks, setOriginalTasks] = useState([]);

    useEffect(() => {
        setOriginalTasks((prevTasks) => {
            if (prevTasks.length === 0) {
                return tasks;
            }
            return prevTasks;
        });
    }, [tasks]);

    const handleFilter = (status) => {
        let filteredTasks = [];

        if (status === 'all') {
            filteredTasks = originalTasks;
        } else {
            filteredTasks = tasks.filter((task) => task.status === status);
        }

        setTasks(filteredTasks);
    };

    return (
        <Menu>
            <MenuButton as={Button} colorScheme="teal" size="sm" ml={2}>
                Filter
            </MenuButton>
            <MenuList>
                <MenuItem onClick={() => handleFilter('all')}>All</MenuItem>
                <MenuItem onClick={() => handleFilter('Pending')}>Pending</MenuItem>
                <MenuItem onClick={() => handleFilter('Completed')}>Completed</MenuItem>
            </MenuList>
        </Menu>
    );
};

export default Filter;