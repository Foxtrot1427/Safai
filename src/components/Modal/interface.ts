import { ModalProps as ChakraModalProps } from "@chakra-ui/react";

export interface ModalProps extends ChakraModalProps {
  isOpen: boolean;
  onClose: () => void;
  header?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: string;
}
