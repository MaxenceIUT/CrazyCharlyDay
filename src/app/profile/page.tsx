"use client";
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
const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);
const PhoneIcon = chakra(FaPhoneAlt);
import { Database } from "lib/database.types";

import { useEffect, useState } from "react";
import supabase from "@/utils/supabase-browser";
import { useRouter } from "next/navigation";

type Profile = Database["public"]["Tables"]["profile"]["Row"];

export default function profile() {
  const router = useRouter();

  const [profile, setProfile] = useState({
    id: "",
    nom: null,
    prenom: null,
    telephone: null,
  } as Profile);

  useEffect(() => {
    const fetchProfile = async () => {
      const jtwl = await supabase.auth.getSession();
      const { data, error } = await supabase.from("profile").select();
      if (!data) return;
      setProfile(data[0] as unknown as Profile);
    };
    fetchProfile();
  }, []);

  const handleUpdate = async (e: any) => {
    e.preventDefault();
    if (profile.nom != e.target.nom.value) {
      const { data, error } = await supabase
        .from("profile")
        .update({ nom: e.target.nom.value })
        .match({ id: profile.id });
    }
    if (profile.prenom != e.target.prenom.value) {
      const { data, error } = await supabase
        .from("profile")
        .update({ prenom: e.target.prenom.value })
        .eq("id", profile.id);
    }
    if (profile.telephone != e.target.telephone.value) {
      const { data, error } = await supabase
        .from("profile")
        .update({ telephone: e.target.telephone.value })
        .eq("id", profile.id);
    }
    router.push("/");
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
          <Heading color="teal.400">Mettre à jour le profil</Heading>
          <Box minW={{ base: "90%", md: "468px" }}>
            <form onSubmit={handleUpdate}>
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
                      type="nom"
                      placeholder="Nom"
                      id="nom"
                      defaultValue={
                        profile.nom == null ? undefined : profile.nom
                      }
                    />
                  </InputGroup>
                </FormControl>
                <FormControl isRequired>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<CFaUserAlt color="gray.300" />}
                    />
                    <Input
                      type="prenom"
                      placeholder="Prenom"
                      id="prenom"
                      defaultValue={
                        profile.prenom == null ? undefined : profile.prenom
                      }
                    />
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
                      defaultValue={
                        profile.telephone == null
                          ? undefined
                          : profile.telephone
                      }
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
                  Mettre à jour
                </Button>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Flex>
    </div>
  );
}
