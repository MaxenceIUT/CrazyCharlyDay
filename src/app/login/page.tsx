"use client";

import { useEffect, useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  InputRightElement,
  InputGroup,
  FormErrorMessage,
} from "@chakra-ui/react";

import supabase from "@/utils/supabase-browser";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const alreadysignin = async () => {
    const jtwl = await supabase.auth.getSession();
    if (jtwl.data.session) router.push("/profile");
  };

  useEffect(() => {
    alreadysignin();
  }, []);

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError(false);
    console.log(e.target.email.value);
    console.log(e.target.password.value);
    const { error } = await supabase.auth.signInWithPassword({
      email: e.target.email.value,
      password: e.target.password.value,
    });
    if (error) setError(true);
    else router.push("/profile");
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Connecte toi </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            Connecte toi et remplis ton panier ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  id="email"
                  errorBorderColor="red.300"
                  isInvalid={error}
                />
              </FormControl>
              <FormControl id="password" isRequired isInvalid={error}>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    errorBorderColor="red.300"
                    id="password"
                    type={showPassword ? "text" : "password"}
                  />
                  <InputRightElement h={"full"}>
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>Erreur login invalides</FormErrorMessage>
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Link color={"blue.400"}>Forgot password?</Link>
                </Stack>
                <Button
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  type="submit"
                >
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
