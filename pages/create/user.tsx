import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Heading,
  Spacer,
  Button,
  Grid,
  Center,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { NextPage } from "next/types";
import { FormEvent, useEffect, useState } from "react";
import { formToJson } from "../../helpers/helpers";

const Create: NextPage = () => {
  const { push } = useRouter();
  const [token, setToken] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = formToJson(e.target);
    await fetch("https://oo2-tp.herokuapp.com/usuario", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json",
        Authorization: token,
      },
      body: JSON.stringify(data),
    });

    console.log(data);
  };

  useEffect(() => {
    const auth = localStorage.getItem("token");
    setToken(String(auth));
    if (!auth) {
      push("/login");
    }
  }, []);

  return (
    <Center height="100vh">
      <Box
        maxW="md"
        borderRadius="lg"
        overflow="hidden"
        bg="gray.50"
        p="8"
        boxShadow="lg"
      >
        <Heading marginBottom="3">Crear usuario</Heading>

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
              <Input required id="username" name="nombreUsuario" type="text" />
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
            <Button type="submit" width="100%" colorScheme="blue">
              Crear usuario
            </Button>
          </Grid>
        </form>
      </Box>
    </Center>
  );
};

export default Create;
