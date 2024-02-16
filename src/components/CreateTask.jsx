import React, { useContext, useState, useEffect } from 'react';
import TaskContext from '../context/TaskContext';
import { v4 as uuidv4 } from 'uuid'; 
import {
    Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter,
    ModalHeader, ModalOverlay, Select
} from '@chakra-ui/react';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';


const CreateTask = ({ isOpen, onClose, onSave }) => {

    const { tasks, setTasks, taskName, setTaskName, description, setDescription,
        deadline, setDeadline, assignedTo, setAssignedTo, status, setStatus } = useContext(TaskContext)
    const toast = useToast();
    const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true);

    useEffect(() => {
        setTaskName('');
        setDescription('');
        setDeadline('');
        setAssignedTo('');
        setStatus(''); 
        setIsSaveButtonDisabled(true);
    }, [isOpen]);

    useEffect(() => {
        // Check if all fields are filled to enable/disable the "Save" button
        const areFieldsFilled = taskName && description && deadline && assignedTo && status;
        setIsSaveButtonDisabled(!areFieldsFilled);
    }, [taskName, description, deadline, assignedTo, status]);

    const handleSaveTask = async () => {
        try {
            const taskId = uuidv4(); 
            const response = await axios.post('http://localhost:3000/tasks', {
                id: taskId,
                taskName, description, deadline, assignedTo, status
            })
            onSave(response.data);
            onClose();
            setTasks((prevTasks) => [...prevTasks, { ...response.data, id: taskId }]);
            toast({
                title: 'Data added successfully!',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });

           
        } catch (error) {
            console.log('Error: ', error)
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="md">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Create New Task</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Input
                        placeholder="Task Name"
                        mb={3}
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                    />
                    <Input
                        placeholder="Description"
                        mb={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <Input
                        type="date"
                        placeholder="Deadline"
                        mb={3}
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                    />
                    <Input
                        placeholder="Assigned To"
                        mb={3}
                        value={assignedTo}
                        onChange={(e) => setAssignedTo(e.target.value)}
                    />
                     <Select
                        placeholder="Select Status"
                        mb={3}
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                    </Select>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="teal" mr={3} onClick={handleSaveTask} isDisabled={isSaveButtonDisabled}>
                        Save
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default CreateTask;
