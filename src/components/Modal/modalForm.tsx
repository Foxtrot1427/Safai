import React from "react";
import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { colors } from "../../theme/colors";

interface IModel {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size: object;
  buttonLabel: string;
  onSubmit: () => void;
  buttonLabelDisabled?: boolean;
  renderCancelButton?: boolean;
  hasBottomDivider?: boolean;
  isButtonFlex?: boolean;
  isSubmitting?: boolean;
}

const ModalForm = ({
  children,
  isOpen,
  onClose,
  title,
  size,
  buttonLabel,
  onSubmit,
  buttonLabelDisabled,
  renderCancelButton,
  hasBottomDivider = true,
  isButtonFlex = true,
  isSubmitting = false,
}: IModel) => {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const footerPadding = hasBottomDivider ? {} : { paddingTop: 0 };

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        size={size}
        scrollBehavior="inside"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={"16px"} fontWeight={700}>
            {title}
          </ModalHeader>
          <Divider color={"red"} />
          <ModalCloseButton />
          <ModalBody pb={6}>{children}</ModalBody>

          {hasBottomDivider && <Divider color={colors.gray_700} />}
          <ModalFooter display={"flex"} gap={"5px"} {...footerPadding}>
            {renderCancelButton && (
              <Button flex={1} onClick={onClose} variant={"outline"}>
                Cancel
              </Button>
            )}

            {buttonLabel === "" ? null : (
              <Button
                flex={isButtonFlex ? 1 : ""}
                variant={"solid"}
                onClick={() => {
                  onSubmit();
                }}
                isDisabled={buttonLabelDisabled}
                isLoading={isSubmitting}
              >
                {buttonLabel}
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalForm;
