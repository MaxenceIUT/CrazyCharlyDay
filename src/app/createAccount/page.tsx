"use client";

import { useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  InputLeftElement,
  chakra,
  Box,
  Link,
  Avatar,
  FormControl,
  FormHelperText,
  InputRightElement,
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

  const handleShowClick = () => setShowPassword(!showPassword);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(e.target.email.value);
    console.log(e.target.nom.value);
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
        flexDirection="column"
        width="100wh"
        height="100vh"
        backgroundColor="gray.200"
        justifyContent="center"
        alignItems="center"
      >
        <Stack
          flexDir="column"
          mb="2"
          justifyContent="center"
          alignItems="center"
        >
          <Avatar bg="teal.500" />
          <Heading color="teal.400">Créer votre compte</Heading>
          <Box minW={{ base: "90%", md: "468px" }}>
            <form
              onSubmit={(event) => {
                handleSubmit(event);
              }}
            >
              <Stack
                spacing={4}
                p="1rem"
                backgroundColor="whiteAlpha.900"
                boxShadow="md"
              >
                <FormControl isRequired>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<CFaUserAlt color="gray.300" />}
                    />
                    <Input
                      type="email"
                      id="email"
                      placeholder="Adresse email"
                    />
                  </InputGroup>
                </FormControl>
                <FormControl isRequired>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      color="gray.300"
                      children={<CFaLock color="gray.300" />}
                    />
                    <Input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      placeholder="Mot de passe"
                    />
                  </InputGroup>
                </FormControl>
                <FormControl isRequired>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      color="gray.300"
                      children={<CFaLock color="gray.300" />}
                    />
                    <Input
                      type={showPassword ? "text" : "password"}
                      id="passwordConfirm"
                      placeholder="Confirmation du mot de passe"
                    />
                  </InputGroup>
                </FormControl>
                <FormControl isRequired>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<CFaUserAlt color="gray.300" />}
                    />
                    <Input type="nom" placeholder="Nom" id="nom" />
                  </InputGroup>
                </FormControl>
                <FormControl isRequired>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<CFaUserAlt color="gray.300" />}
                    />
                    <Input type="prenom" placeholder="Prenom" id="prenom" />
                  </InputGroup>
                </FormControl>
                <FormControl>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<PhoneIcon color="gray.300" />}
                    />
                    <Input
                      type="telephone"
                      placeholder="Telephone"
                      id="telephone"
                    />
                  </InputGroup>
                </FormControl>
                <Button
                  borderRadius={0}
                  type="submit"
                  variant="solid"
                  colorScheme="teal"
                  width="full"
                >
                  Créer un compte
                </Button>
              </Stack>
            </form>
          </Box>
        </Stack>
        <Box>
          Vous possédez déjà un compte ?{" "}
          <Link color="teal.500" href="../login">
            Se Connecter.
          </Link>
        </Box>
      </Flex>
    </div>
  );
}
