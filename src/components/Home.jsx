import React, { useContext, useState} from 'react'
import { Box, Button, Center, Heading, useDisclosure } from '@chakra-ui/react';
import CreateTask from './CreateTask';
import Display from './Display';
import TaskContext from '../context/TaskContext';

function Home() {
    const { isOpen, onOpen, onClose } = useDisclosure();
  
  
    const { tasks, setTasks, taskName, setTaskName, description, setDescription,
        deadline, setDeadline, assignedTo, setAssignedTo, status, setStatus } = useContext(TaskContext)
    

    const handleSaveTask = (taskData) => {
        console.log('Task data:', taskData);
        onClose();
    };

    

    return (
        <div>
            <Box p={4}>
            <Center>
                <Heading as="h1" size="xl" mb={8}>
                    Task Manager
                </Heading>
            </Center>
            <Center>
                <Button colorScheme="teal" size="lg" onClick = {onOpen} variant='solid'>
                    Create New Task
                </Button>
            </Center>
            

            <CreateTask isOpen={isOpen} onClose={onClose} onSave={handleSaveTask} />

            <Display />
      </Box>
       
        </div >
    )
}

export default Home