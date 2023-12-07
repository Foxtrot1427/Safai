import {
  Button,
  Modal as ChakraModal,
  HStack,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { ModalProps } from './interface';

const Modal = ({
  isOpen,
  onClose,
  header,
  children,
  footer,
  ...rest
}: ModalProps) => {
  return (
    <ChakraModal isOpen={isOpen} onClose={onClose} isCentered {...rest}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{header}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <HStack>
            <Button variant={'outline'} onClick={onClose}>
              Cancel
            </Button>
            {footer}
          </HStack>
        </ModalFooter>
      </ModalContent>
    </ChakraModal>
  );
};

export default Modal;
