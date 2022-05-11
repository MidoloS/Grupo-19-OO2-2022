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
  TableContainer,
  Table,
  TableCaption,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  Stack,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon, DownloadIcon } from "@chakra-ui/icons";
import { NextPage } from "next/types";
import { FormEvent, useEffect, useState } from "react";
import { formToJson } from "../helpers/helpers";
import DeleteUser from "../component/Alert";
import xlsx from "json-as-xlsx";
import { useRouter } from "next/router";

const Create: NextPage = () => {
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState("");
  const { push } = useRouter();

  useEffect(() => {
    const auth = localStorage.getItem("token");
    setToken(String(auth));

    fetch("https://oo2-tp.herokuapp.com/usuario", {
      headers: {
        Authorization: String(auth),
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUsers(data);
      });
  }, []);

  const handleDelete = async (id: string) => {
    console.log({ token });
    fetch(`https://oo2-tp.herokuapp.com/usuario/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: String(token),
        "Access-Control-Allow-Origin": "*",
        Accept: "application/json",
      },
    });
  };

  const handleDownload = () => {
    const data = {
      sheet: "Alumnos",
      columns: [
        { label: "Nombre", value: "nombre" },
        { label: "Apellido", value: "apellido" },
        { label: "Email", value: "correo" },
        { label: "Documento", value: "documento" },
      ],
      content: users,
    };
    xlsx([data], {
      fileName: "Alumnos",
      extraLength: 3,
      writeOptions: {},
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    push("/login");
  };

  return (
    <>
      <Button
        leftIcon={<DeleteIcon />}
        colorScheme="red.500"
        variant="solid"
        bg={"red.500"}
        onClick={logout}
        ml={3}
      >
        Borrar
      </Button>
      <Box
        p={3}
        borderRadius="2xl"
        borderWidth="1px"
        borderColor="gray.2s00"
        m={6}
        bg="gray.100"
      >
        <Button
          leftIcon={<DownloadIcon />}
          colorScheme="blue.500"
          variant="solid"
          bg={"blue.500"}
          onClick={handleDownload}
        >
          Descargar Excel
        </Button>
        <TableContainer>
          <Table variant="simple">
            <TableCaption>Usuarios</TableCaption>
            <Thead>
              <Tr>
                <Th>Nombre</Th>
                <Th>Apellido</Th>
                <Th>Correo</Th>
                <Th isNumeric>Documento</Th>
                <Th>Opciones</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map(({ id, nombre, apellido, correo, documento }) => (
                <Tr key={id}>
                  <Td>{nombre}</Td>
                  <Td>{apellido}</Td>
                  <Td>{correo}</Td>
                  <Td isNumeric>{documento}</Td>
                  <Td>
                    <Stack direction="row">
                      <DeleteUser
                        onClick={() => handleDelete(id)}
                        title="Estas seguro que quieres borrar este usuario?"
                      >
                        <Button
                          leftIcon={<DeleteIcon />}
                          colorScheme="red.500"
                          variant="solid"
                          bg={"red.500"}
                        >
                          Borrar
                        </Button>
                      </DeleteUser>

                      <Button
                        leftIcon={<EditIcon />}
                        colorScheme="gray.500"
                        variant="solid"
                        bg={"gray.500"}
                      >
                        Editar
                      </Button>
                    </Stack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default Create;
