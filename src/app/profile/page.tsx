"use client";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  Box,
  Text,
  useColorModeValue,
  HStack,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { Database } from "lib/database.types";

import { useEffect, useState } from "react";
import supabase from "@/utils/supabase-browser";
import { useRouter } from "next/navigation";

type Profile = Database["public"]["Tables"]["profile"]["Row"];

export default function Profile() {
  const router = useRouter();

  const [profile, setProfile] = useState({
    id: "",
    nom: "",
    prenom: "",
    telephone: "",
  } as Profile);

  useEffect(() => {
    const fetchProfile = async () => {
      const jtwl = await supabase.auth.getSession();
      if (jtwl.data.session == null) router.push("/login");
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
        <form onSubmit={handleUpdate}>
          <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
            <Stack align={"center"}>
              <Heading fontSize={"4xl"} textAlign={"center"}>
                Mettre à jour ton profil
              </Heading>
              <Text fontSize={"lg"} color={"gray.600"} textAlign='center'>
                Tu peux ici mettre à jour les informations te concernant. N'hésite pas à renseigner ton numéro de téléphone pour être tenu au courant des dernières nouvelles.
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
                      <FormLabel>Prénom</FormLabel>
                      <Input
                        type="text"
                        id="prenom"
                        defaultValue={
                          !profile.prenom ? undefined : profile.prenom
                        }
                      />
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl id="lastName">
                      <FormLabel>Nom</FormLabel>
                      <Input
                        type="text"
                        id="nom"
                        defaultValue={
                          profile.nom == null ? undefined : profile.nom
                        }
                      />
                    </FormControl>
                  </Box>
                </HStack>
                <FormControl id="telephone">
                  <FormLabel>Téléphone</FormLabel>
                  <InputGroup>
                    <Input
                      type="tel"
                      id="telephone"
                      defaultValue={
                        profile.telephone == null
                          ? undefined
                          : profile.telephone
                      }
                    />
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
                    Mettre à jour
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </form>
      </Flex>
    </div>
  );
}
