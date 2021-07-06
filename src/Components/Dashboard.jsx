import React, { useContext } from "react";
import { Button } from "@chakra-ui/react";
import { Box } from "@chakra-ui/layout";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Text,
  Link,
} from "@chakra-ui/react";
import { AuthContext } from "../Components/Authentucation/AuthProvider";
export default function Dashboard() {
  const { logout } = useContext(AuthContext);

  return (
    <div>
      <Box
        width="100%"
        minH="100vh"
        background="gray.100"
        justifyContent="center"
      >
        <Text fontSize="xl" fontWeight="bold">
          welcome to DASHBOARD
        </Text>
        <br />
        <Button colorScheme="red" onClick={() => logout()}>
          Logout
        </Button>
      </Box>
    </div>
  );
}
