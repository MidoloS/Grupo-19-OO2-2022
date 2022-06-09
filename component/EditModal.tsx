import { EditIcon } from "@chakra-ui/icons";
import {
  Center,
  Box,
  Heading,
  Grid,
  FormLabel,
  Input,
  Button,
  Modal,
  useDisclosure,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalFooter,
} from "@chakra-ui/react";
import { FormEvent, useEffect, useRef, useState } from "react";
import { formToJson } from "../helpers/helpers";

const EditModal = ({ id }) => {
  const [token, setToken] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = useRef();

  useEffect(() => {
    const auth = localStorage.getItem("token");
    setToken(String(auth));
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = formToJson(e.target);
    const req = await fetch(`https://oo2-tp.herokuapp.com/usuario/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json",
        Authorization: token,
      },
      body: JSON.stringify(data),
    });
    const res = await req.json();
    console.log({ res });

    console.log(data);
  };

  return (
    <>
      <Button
        leftIcon={<EditIcon />}
        colorScheme="gray.500"
        variant="solid"
        bg={"gray.500"}
        onClick={onOpen}
      >
        Editar
      </Button>
      <Modal p={3} finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent p={5}>
          <ModalHeader>Actualizar usuario</ModalHeader>
          <form onSubmit={handleSubmit}>
            <Grid templateColumns="1fr" gap={2}>
              <FormLabel htmlFor="name">
                Nombre
                <Input required id="name" name="nombre" type="text" />
              </FormLabel>
              <FormLabel htmlFor="subname">
                Apellido
                <Input required id="subname" name="apellido" type="text" />
              </FormLabel>
              <FormLabel htmlFor="dni">
                D.N.I
                <Input required id="dni" name="documento" type="text" />
              </FormLabel>
              <FormLabel htmlFor="email">
                Correo electronico
                <Input required id="email" name="correo" type="email" />
              </FormLabel>
              <FormLabel htmlFor="username">
                Usuario
                <Input
                  required
                  id="username"
                  name="nombreUsuario"
                  type="text"
                />
              </FormLabel>
              <FormLabel htmlFor="password">
                Contraseña
                <Input
                  required
                  id="password"
                  name="contrasenia"
                  type="password"
                />
              </FormLabel>
            </Grid>
            <ModalFooter>
              <Button type="submit" width="100%" colorScheme="blue">
                Actualizar usuario
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditModal;
