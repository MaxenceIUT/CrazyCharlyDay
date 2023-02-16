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
import React, { Component } from 'react';

type Produit = Database["public"]["Tables"]["produit"]["Row"];

export default function Produit({ params }: { params: { id: number } }) {
  const [produit, setProduit] = useState({} as Produit);

  useEffect(() => {
    const fetchProduit = async () => {
      const { data, error } = await supabase
        .from("produit")
        .select("*")
        .eq("id", params.id); 
      setProduit(data[0]);
    };
    fetchProduit();
  }, []);

  const position = [100, 100];


  return (
    <div className="flex flex-col">
      <div className="flex mt-10 mx-20 py-10 pr-10">
        <div className="m-3 h-[100%] items-center flex">
          <Box boxSize={"sm"}>
            <Image
              src={"/img/" + params.id + ".png"}
              boxSize={"full"}
              alt="Dan Abramov"
            />
          </Box>
        </div>
        <div className="px-10">
          <Text fontSize="2xl" py={[6]}>
            {produit.nom}
          </Text>
          <Heading size="lg" mb={[4]}>
            €{produit.prix}
          </Heading>

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
            {produit.categorie == 1 ? (
              <div className="flex items-center">
                <FormControl mx={4}>
                  <NumberInput max={50} min={1} >
                    <NumberInputField />
                  </NumberInput>
                </FormControl>
                <Text fontSize="sm" mx={4}>Kg</Text>
              </div>
            ) : (
              <FormControl mx={4}>
                <NumberInput max={50} min={1}>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            )}
            <ButtonGroup spacing="2" mx={4}>
              <Button variant="solid" colorScheme="green">
                Ajouter au panier
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </div>
    </div>
  );
}
