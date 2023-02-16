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
import supabase from "@/utils/supabase-browser";
import { useRouter } from "next/navigation";

import { FaEyeSlash, FaEye } from "react-icons/fa";

const HideIcon = chakra(FaEyeSlash);
const ShowIcon = chakra(FaEye);

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
              <Text fontSize={"lg"} color={"gray.600"}  textAlign="center">
                Prépare toi à rejoindre ta référence locale en matière d'environnement et de « Good Food » ✌️
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
                  <FormLabel>Adresse email</FormLabel>
                  <Input type="email" id="email" />
                </FormControl>
                <FormControl id="password" isRequired>
                  <FormLabel>Mot de passe</FormLabel>
                  <InputGroup>
                    <Input type={showPassword ? "text" : "password"} />
                    <InputRightElement h={"full"} marginRight="1">
                      <Button size="sm" onClick={handleShowClick}>
                        {showPassword ? <HideIcon/> : <ShowIcon/>}
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
                    Déjà un compte ? <Link href="/login" color={"blue.400"}>Se connecter</Link>
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
