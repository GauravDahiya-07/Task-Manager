import React, { useContext, useState, useEffect } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, FormControl, FormLabel, Input, Select } from '@chakra-ui/react';
import TaskContext from '../context/TaskContext';
import axios from 'axios';
import { useToast } from '@chakra-ui/react';

const EditTask = ({ isOpen, onClose, task }) => {

  const { tasks, setTasks, setSelectedTask, } = useContext(TaskContext);
  const [editedTask, setEditedTask] = useState(task);
  const [isChange, setIsChange] = useState(false);
  const toast = useToast();

  useEffect(() => {
    if (task) {
      setEditedTask(task);
    }
  }, [task]);

  const handleUpdateTask = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/tasks/${editedTask.id}`, editedTask);

      if (response.status === 200) {
        const updatedTaskList = tasks.map((task) =>
          task.id === editedTask.id ? editedTask : task
        );
        setTasks(updatedTaskList);
        setSelectedTask(null);
        onClose();
        toast({
          title: 'Task Updated',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        console.error('Error updating task:', error);

        toast({
          title: 'Error Updating Task',
          description: 'An error occurred while updating the task.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };
  const handleChange = (field, value) => {
    setEditedTask((prevTask) => ({
      ...prevTask,
      [field]: value,
    }));

    const hasChanged = value !== task[field];
    setIsChange(hasChanged);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Task</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={4}>
            <FormLabel>Task Name</FormLabel>
            <Input
              value={editedTask.taskName}
              onChange={(e) => handleChange('taskName', e.target.value)}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Description</FormLabel>
            <Input
              value={editedTask.description}
              onChange={(e) => handleChange('description', e.target.value)}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Deadline</FormLabel>
            <Input
              type="date"
              value={editedTask.deadline}
              onChange={(e) => handleChange('deadline', e.target.value)}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Assigned To</FormLabel>
            <Input
              value={editedTask.assignedTo}
              onChange={(e) => handleChange('assignedTo', e.target.value)}
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Status</FormLabel>
            <Select
              value={editedTask.status}
              onChange={(e) => handleChange('status', e.target.value)}
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </Select>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleUpdateTask} isDisabled={!isChange}>
            Update
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditTask;
