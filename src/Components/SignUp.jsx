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
import { SignupRsolver } from "../Utils/Validation/Signup";
import { auth } from "../Utils/Firebase/index";
import { AuthContext } from "./Authentucation/AuthProvider";
export default function SignUp() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm({ resolver: SignupRsolver });

  const history = useHistory();
  const { user } = useContext(AuthContext);
  console.log(user);
  const onSubmit = ({ email, password }) => {
    clearErrors("API_Error");
    console.log(email, password);
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        history.push("/");
      })
      .catch((err) => {
        console.log(err, "error");
        setError("API_Error", {
          message: err.message,
        });
      });
  };
  useEffect(() => {
    if (user) history.push("/");
  });
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
            <FormControl mt={2} isInvalid={errors.repeat_password}>
              <FormLabel htmlFor="repeat_password"> Repeat password</FormLabel>
              <Input
                type="password"
                placeholder="enter your password"
                name="repeat_password"
                {...register("repeat_password")}
              />
              <FormErrorMessage>
                {" "}
                {errors.repeat_password && errors.repeat_password.message}
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
              colorScheme="messenger"
            >
              Sign Up
            </Button>
            <Text textAlign="center">
              <Link as={React_dom_Link} color="gray.500" to="/Login">
                Already registerd?
              </Link>
            </Text>
          </form>
        </Box>
      </Box>
    </>
  );
}
