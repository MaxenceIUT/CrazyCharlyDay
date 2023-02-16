"use client";

import { useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  chakra,
  Box,
  Link,
  Text,
  InputRightElement,
  useColorModeValue,
  HStack,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { FaUserAlt, FaLock, FaPhoneAlt } from "react-icons/fa";
import supabase from "@/utils/supabase-browser";
import { useRouter } from "next/navigation";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);
const PhoneIcon = chakra(FaPhoneAlt);

export default function Login() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    
    const { data, error } = await supabase.auth.signUp({
      email: e.target.email.value,
      password: e.target.password.value,
    });
    if (data.user) {
      await supabase.from("profile").insert([
        {
          id: data.user.id,
          nom: e.target.nom.value,
          prenom: e.target.prenom.value,
        },
      ]);
    }
    router.push("/profile");
  };

  return (
    <div>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("gray.50", "gray.800")}
      >
        <form onSubmit={handleSubmit}>
          <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
            <Stack align={"center"}>
              <Heading fontSize={"4xl"} textAlign={"center"}>
                Créer un compte
              </Heading>
              <Text fontSize={"lg"} color={"gray.600"}>
                Prépare toi à avoir ton compte ✌️
              </Text>
            </Stack>
            <Box
              rounded={"lg"}
              bg={useColorModeValue("white", "gray.700")}
              boxShadow={"lg"}
              p={8}
            >
              <Stack spacing={4}>
                <HStack>
                  <Box>
                    <FormControl id="firstName" isRequired>
                      <FormLabel>Prenom</FormLabel>
                      <Input type="text" id="prenom" />
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl id="lastName" isRequired>
                      <FormLabel>Nom</FormLabel>
                      <Input type="text" id="nom" />
                    </FormControl>
                  </Box>
                </HStack>
                <FormControl id="email" isRequired>
                  <FormLabel>Email address</FormLabel>
                  <Input type="email" id="email" />
                </FormControl>
                <FormControl id="password" isRequired>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input type={showPassword ? "text" : "password"} />
                    <InputRightElement h={"full"}>
                      <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                        {showPassword ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <Stack spacing={10} pt={2}>
                  <Button
                    loadingText="Submitting"
                    size="lg"
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                    type="submit"
                  >
                    Créer un compte
                  </Button>
                </Stack>

                <Stack pt={6}>
                  <Text align={"center"}>
                    Already a user? <Link color={"blue.400"}>Login</Link>
                  </Text>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </form>
      </Flex>
    </div>
  );
}
