import React, { useContext } from 'react';
import { Button } from '@chakra-ui/react';
import axios from 'axios';
import TaskContext from '../context/TaskContext';

const Reset = () => {
    const { setTasks } = useContext(TaskContext);

    const handleReset = async () => {
        try {
            const response = await axios.get('http://localhost:3000/tasks');
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    return (
        <Button colorScheme="teal" size="sm" onClick={handleReset}>
            Reset
        </Button>
    );
};

export default Reset;