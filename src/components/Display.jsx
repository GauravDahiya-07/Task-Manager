import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import TaskContext from '../context/TaskContext';
import { useToast } from '@chakra-ui/react';
import { Table, Thead, Tbody, Tr, Th, Td, Button, Menu, MenuButton, MenuList, MenuItem, Box, Flex } from '@chakra-ui/react';
import EditTask from './EditTask';
import DeleteTask from './DeleteTask';
import Sort from './Sort';
import Filter from './Filter';
import Pagination from './Pagination';

const Display = () => {

  const { tasks, setTasks, selectedTask, setSelectedTask, tasksPerPage, setTasksPerPage, currentPage, setCurrentPage } = useContext(TaskContext)
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [taskId, setTaskId] = useState(null);
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const toast = useToast();

  const reversedTasks = [...tasks].reverse();
  const currentReversedTasks = reversedTasks.slice(indexOfFirstTask, indexOfLastTask);


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/tasks');

      if (response.status === 200) {
        setTasks(response.data);
      } else {
        console.error('Error:', error);
        toast({
          title: 'Error fetching data. Please try again.',
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

  const handleEdit = (task) => {
    setSelectedTask(task);
    setEditModalOpen(true);
  }

  const handleDelete = (taskId) => {
    setTaskId(taskId);
    setDeleteDialogOpen(true);

  }

  const onDeleteConfirm = async () => {
    try {
      const response = await axios.delete(`http://localhost:3000/tasks/${taskId}`)

      if (response.status === 200 || response.status === 204) {
        setTasks(tasks.filter((task) => task.id !== taskId));
        setDeleteDialogOpen(false);
        toast({
          title: 'Task Deleted',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        console.error(`Unexpected response status:`, response);
        toast({
          title: 'Error Deleting Task',
          description: 'An error occurred while deleting the task.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      toast({
        title: 'Error Deleting Task',
        description: 'An error occurred while deleting the task.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const onDeleteCancel = () => {
    setDeleteDialogOpen(false);
  }

  return (
    <>
      <Box>
        <Flex justifyContent="space-between" alignItems="center" mb={4} mt={4}>
          <Box ml={10}>
            <Filter />
          </Box>
          <Box>
            <Sort />
          </Box>
          <Box mr={6} >
            <Button colorScheme="teal" size="sm" onClick={fetchData}>
              Reset
            </Button>
          </Box>
        </Flex>
        <Table variant="striped" colorScheme="teal" margin={4}>
          <Thead>
            <Tr>
              <Th>Task Name</Th>
              <Th>Description</Th>
              <Th>Deadline</Th>
              <Th>Assigned To</Th>
              <Th>Status</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentReversedTasks.map((task) => (
              <Tr key={task.id}>
                <Td>{task.taskName}</Td>
                <Td>{task.description}</Td>
                <Td>{task.deadline}</Td>
                <Td>{task.assignedTo}</Td>
                <Td>{task.status}</Td>
                <Td>

                  <Menu>
                    <MenuButton as={Button} colorScheme="teal" size="sm">
                      Action
                    </MenuButton>
                    <MenuList>
                      <MenuItem onClick={() => handleEdit(task)}>Edit</MenuItem>
                      <MenuItem onClick={() => handleDelete(task.id)}>Delete</MenuItem>
                    </MenuList>
                  </Menu>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        {isEditModalOpen && (
          <EditTask
            isOpen={isEditModalOpen}
            onClose={() => setEditModalOpen(false)}
            task={selectedTask}
          />
        )}
        <DeleteTask
          isOpen={isDeleteDialogOpen}
          onClose={onDeleteCancel}
          onDeleteConfirm={onDeleteConfirm}
          onDeleteCancel={onDeleteCancel}
        />
      </Box>
      {currentReversedTasks.length > 0 && (
        <Pagination />
      )}
    </>
  );
};

export default Display;
