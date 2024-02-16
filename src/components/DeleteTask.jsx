import React from 'react';
import {
  AlertDialog, AlertDialogOverlay,AlertDialogContent, AlertDialogHeader, AlertDialogCloseButton, AlertDialogBody, AlertDialogFooter,
  Button,} from '@chakra-ui/react';

const DeleteTask = ({ isOpen, onClose, onDeleteConfirm, onDeleteCancel }) => {
  return (
    <AlertDialog isOpen={isOpen} onClose={onClose}>
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader>Delete Task</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>Are you sure you want to delete this task?</AlertDialogBody>
        <AlertDialogFooter>
          <Button colorScheme="red" onClick={onDeleteConfirm}>
            Delete
          </Button>
          <Button onClick={onDeleteCancel}>Cancel</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteTask;
