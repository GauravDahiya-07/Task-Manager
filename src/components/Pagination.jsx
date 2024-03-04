import React, { useContext, useState, useEffect } from 'react';
import { Box, Button, Select, Text } from '@chakra-ui/react';
import TaskContext from '../context/TaskContext';

const Pagination = () => {
  const { tasks, tasksPerPage, setTasksPerPage, currentPage, setCurrentPage } = useContext(TaskContext);
  const [selectedValue, setSelectedValue] = useState(tasksPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const handleDropdown = (event) => {
    const newSize = parseInt(event.target.value, 10);
    setSelectedValue(newSize);
    setTasksPerPage(newSize);
    paginate(1);
  };
  const startIndex = (currentPage - 1) * tasksPerPage + 1;
  const endIndex = Math.min(currentPage * tasksPerPage, tasks.length);
  const totalPages = Math.ceil(tasks.length / tasksPerPage);


  return (
    <Box mt={4} display="flex" alignItems="center" justifyContent="space-between">
      <Button
        colorScheme="teal"
        size="sm"
        isDisabled={currentPage === 1}
        onClick={() => paginate(currentPage - 1)}
      >
        {'<'}
      </Button>
      <Text mx={2} fontSize="sm">
        Page {currentPage} of {totalPages}
      </Text>

      <Text mx={2} fontSize="sm">
        Viewing {startIndex}-{endIndex} of {tasks.length}
      </Text>
      <Select
        size="sm"
        value={selectedValue}
        onChange={handleDropdown}
        width="auto"
      >
        <option value={5}>5 per page</option>
        <option value={10}>10 per page</option>
      </Select>

      <Button
        colorScheme="teal"
        size="sm"
        isDisabled={currentPage === totalPages}
        onClick={() => paginate(currentPage + 1)}
      >
        {'>'}
      </Button>
    </Box>
  );
};

export default Pagination;
