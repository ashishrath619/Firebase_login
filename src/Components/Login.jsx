import React, { useContext, useEffect } from "react";
import { Box } from "@chakra-ui/layout";
import { useHistory } from "react-router";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  Text,
  Link,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import { Link as React_dom_Link } from "react-router-dom";
import { LoginResolver } from "../Utils/Validation/LoginResolver";
import { auth } from "../Utils/Firebase/index";
import { AuthContext } from "./Authentucation/AuthProvider";
export default function Login() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm({ resolver: LoginResolver });

  const history = useHistory();
  const { user } = useContext(AuthContext);
  const onSubmit = ({ email, password }) => {
    clearErrors("API_Error");
    console.log(email, password);
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        history.push("/");
      })
      .catch((err) => {
        console.log(err, "error");
        setError("API_Error", {
          message: "Eamil and Password Invaild",
        });
      });
  };
  return (
    <>
      <Box
        width="100%"
        minH="100vh"
        background="gray.200"
        d="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          widht={{ base: "90%", md: "40%", lg: "30%" }}
          shadow="lg"
          background="white"
          p={12}
          rounded={6}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={errors.email}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <Input
                type="email"
                placeholder="enter your email"
                name="email"
                {...register("email")}
              />
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl mt={2} isInvalid={errors.password}>
              <FormLabel htmlFor="password">password</FormLabel>
              <Input
                type="password"
                placeholder="enter your password"
                name="password"
                {...register("password")}
              />
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>

            <Box mt="5" color="red.500">
              {errors.API_Error && errors.API_Error.message}
            </Box>
            <Button
              isLoading={isSubmitting}
              mt={4}
              width="100%"
              type="submit"
              colorScheme="yellow"
            >
              Log in
            </Button>
            <Text textAlign="center">
              <Link as={React_dom_Link} color="gray.500" to="/SignUp">
                Create Account ?
              </Link>
            </Text>
          </form>
        </Box>
      </Box>
    </>
  );
}
