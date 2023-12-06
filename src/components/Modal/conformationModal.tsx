import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';
import React from 'react';
type CProp = {
  handleSubmit: () => void;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  confirmationMessage?: string;
  deleteLabel?: string;
};

const ConfirmationModel: React.FC<CProp> = ({
  title = 'Confirm Deletion',
  handleSubmit,
  onClose,
  isOpen,
  confirmationMessage = " Are you sure? You can't undo this action afterwards.",
  deleteLabel = 'Delete',
}) => {
  const cancelRef = React.useRef(null);

  const handelDelete = () => {
    handleSubmit();
    onClose();
  };

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {title}
          </AlertDialogHeader>

          <AlertDialogBody>{confirmationMessage}</AlertDialogBody>

          <AlertDialogFooter>
            <Button variant="danger" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handelDelete} ml={3}>
              {deleteLabel}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default ConfirmationModel;
