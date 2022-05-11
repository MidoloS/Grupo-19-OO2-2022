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
import { FormEvent } from "react";
import { formToJson } from "../helpers/helpers";

const Create: NextPage = () => {
  const { push } = useRouter();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = formToJson(e.target);

    console.log(data);

    const req = await fetch("https://oo2-tp.herokuapp.com/authenticate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const { jwtToken } = await req.json();

    if (jwtToken) {
      localStorage.setItem("token", `Bearer ${jwtToken}`);
      push("/users");
    }
  };

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
        <Heading marginBottom="3">Iniciar Sesion</Heading>

        <form onSubmit={handleSubmit}>
          <Grid templateColumns="1fr" gap={2}>
            <FormLabel>
              Usuario
              <Input required name="username" type="text" />
            </FormLabel>
            <FormLabel>
              Contraseña
              <Input required name="password" type="password" />
            </FormLabel>
            <Button type="submit" width="100%" colorScheme="blue">
              Ingresar
            </Button>
          </Grid>
        </form>
      </Box>
    </Center>
  );
};

export default Create;
