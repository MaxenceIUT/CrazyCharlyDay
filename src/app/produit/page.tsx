"use client";

import {
  Image,
  Text,
  Box,
  Heading,
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  chakra,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import supabase from "@/utils/supabase-browser";
import { Database } from "@/../lib/database.types";

type Produit = Database["public"]["Tables"]["produit"]["Row"];

export default function Produit() {
  const [produit, setProduit] = useState({} as Produit);

  useEffect(() => {
    const fetchProduit = async () => {
      const { data, error } = await supabase
        .from("produit")
        .select("*")
        .eq("id", 1);
      if (data == null) return;
      setProduit(data[0]);
    };
    fetchProduit();
  }, []);

  return (
    <div className="flex px-[20%] mt-10">
      <div className="m-3">
        <Box boxSize={"sm"}>
          <Image
            src={"img/" + produit.id + ".png"}
            boxSize={"full"}
            alt="Dan Abramov"
          />
        </Box>
      </div>
      <div className="">
        <Text fontSize="2xl" py={[6]}>
          {produit.nom}
        </Text>
        <Heading size="lg">€{produit.prix}</Heading>

        <div className="">
          <Heading size="md" my={[2]}>
            Description
          </Heading>
          <Text fontSize="sm">{produit.description}</Text>
          <hr className="border-none bg-[#e2e2e2] h-[1px] w-[100%] my-5" />
        </div>
        <div>
          <Heading size="md" my={[2]}>
            Information suplémentaires
          </Heading>
          <Text fontSize="sm">{produit.detail}</Text>
          <hr className="border-none bg-[#e2e2e2] h-[1px] w-[100%] my-5" />
        </div>

        <div className="flex items-center">
          <FormControl mx={4}>
            <NumberInput max={50} min={1}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <ButtonGroup spacing="2" mx={4}>
            <Button variant="solid" colorScheme="green">
              Ajouter au panier
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </div>
  );
}
