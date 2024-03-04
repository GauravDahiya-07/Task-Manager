import React, { useContext, useState, useEffect } from 'react';
import TaskContext from '../context/TaskContext';
import { v4 as uuidv4 } from 'uuid';
import { 
    Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter,
    ModalHeader, ModalOverlay, Select 
} from '@chakra-ui/react';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';

const CreateTask = ({ isOpen, onClose }) => {

    const { tasks, setTasks, taskObj, setTaskObj } = useContext(TaskContext)
    const toast = useToast();
    const [isSaveButtonDisabled, setIsSaveButtonDisabled] = useState(true);

    useEffect(() => {
        setTaskObj({
            taskName: '',
            description: '',
            deadline: '',
            assignedTo: '',
            status: '',
        });
        setIsSaveButtonDisabled(true);
    }, [isOpen, setTaskObj]);

    useEffect(() => {
        const areFieldsFilled = taskObj.taskName && taskObj.description && taskObj.deadline && taskObj.assignedTo && taskObj.status;
        setIsSaveButtonDisabled(!areFieldsFilled);
    }, [taskObj]);

    const handleSaveTask = async () => {
        try {
            const taskId = uuidv4();
            const response = await axios.post('http://localhost:3000/tasks', {
                id: taskId,
                ...taskObj,
            })
            if (response.status === 201) {
                onClose();
                setTasks((prevTasks) => [...prevTasks, { ...response.data, id: taskId }]);
                toast({
                    title: 'Data added successfully!',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
            } else {
                console.error(`Unexpected response status: ${response.status}`);
                toast({
                    title: 'Error adding data. Please try again.',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.error('Error:', error);
            toast({
                title: 'An error occurred. Please try again.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
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
                        value={taskObj.taskName}
                        onChange={(e) => setTaskObj({ ...taskObj, taskName: e.target.value })}
                    />
                    <Input
                        placeholder="Description"
                        mb={3}
                        value={taskObj.description}
                        onChange={(e) => setTaskObj({ ...taskObj, description: e.target.value })}
                    />
                    <Input
                        type="date"
                        placeholder="Deadline"
                        mb={3}
                        value={taskObj.deadline}
                        onChange={(e) => setTaskObj({ ...taskObj, deadline: e.target.value })}
                    />
                    <Input
                        placeholder="Assigned To"
                        mb={3}
                        value={taskObj.assignedTo}
                        onChange={(e) => setTaskObj({ ...taskObj, assignedTo: e.target.value })}
                    />
                    <Select
                        placeholder="Select Status"
                        mb={3}
                        value={taskObj.status}
                        onChange={(e) => setTaskObj({ ...taskObj, status: e.target.value })}
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
