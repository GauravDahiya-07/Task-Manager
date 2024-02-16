import React, { useContext, useState } from 'react';
import { Button, ButtonGroup, Menu, MenuButton, MenuList, MenuItem, Text, Flex} from '@chakra-ui/react';
import TaskContext from '../context/TaskContext';

const Sort = () => {
  const { tasks, setTasks } = useContext(TaskContext);
  const [sortBy, setSortBy] = useState(null);

  const handleSort = (field) => {
    const sortedTasks = [...tasks].sort((a, b) => b[field].localeCompare(a[field]));

    setTasks(sortedTasks);
    setSortBy(field);
  };

  return (
    <Menu>
  <Flex alignItems="center" mb={4} mr={12}>
    <Text fontSize="sm" fontWeight="bold" mb={2} mr={2} mt={4}>
      Sort by:
    </Text>
    <MenuButton as={Button} width="150px" height="30px" mt={2} fontSize="sm" >
      {sortBy ? `${sortBy}` : '.....'}
    </MenuButton>
  </Flex>
      
      <MenuList>
        <MenuItem onClick={() => handleSort('assignedTo')}>Assigned To</MenuItem>
        <MenuItem onClick={() => handleSort('deadline')}>Deadline</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default Sort;