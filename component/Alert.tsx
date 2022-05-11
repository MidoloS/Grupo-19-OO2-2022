import { DeleteIcon } from "@chakra-ui/icons";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import React, { FC, ReactNode } from "react";

type Props = {
  type?: "DELETE";
  children: ReactNode;
  title?: string;
  onClick?: () => void;
};

const Alert: FC<Props> = ({
  children,
  type = "DELETE",
  title,
  onClick = () => null,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const types = {
    DELETE: (
      <Button
        leftIcon={<DeleteIcon />}
        colorScheme="red.500"
        variant="solid"
        bg={"red.500"}
        onClick={() => {
          onClick();
          onClose();
        }}
        ml={3}
      >
        Borrar
      </Button>
    ),
  };

  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            {title && (
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                {title}
              </AlertDialogHeader>
            )}
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
              {types[type]}
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default Alert;
