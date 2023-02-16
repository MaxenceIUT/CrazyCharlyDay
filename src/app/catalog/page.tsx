"use client";

import {
  Button,
  chakra,
  Container,
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

import Article from "@/components/Article";

import supabase from "@/utils/supabase-browser";

import { FaSearch } from "react-icons/fa";
const CFaSearch = chakra(FaSearch);

let indexPage = 1;
let indexMax: Promise<number> = Promise.resolve(1);
let tableIndex: number[] = [];
let limit = 5;

async function getArticle() {
  const { data, error } = await supabase.from("produit").select("*");
  return data;
}

let dataFetch: Promise<
  | {
      categorie: number;
      description: string;
      detail: string;
      distance: number;
      id: number;
      latitude: number;
      lieu: string;
      longitude: number;
      nom: string;
      poids: number;
      prix: number;
    }[]
  | null
>;

function updateNumberPages() {
  indexMax = dataFetch.then((data) => {
    return Math.ceil(data.length / limit);
  });
  indexMax.then((data) => {
    // Array.from(Array(data).keys()+1);
    tableIndex = Array.from(Array(data).keys()).map((i) => i + 1);
  });
}

export default function Catalogue() {
  const [products, setProducts] = useState([]);
  const [index, setIndex] = useState(indexPage);
  const [searchInput, setSearchInput] = useState("");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    dataFetch = getArticle();
    if (dataFetch === null) {
      return;
    }

    // Get the products from the database
    dataFetch.then((data) => {
      // Get the products for the current page
      setProducts(data.slice((index - 1) * limit, index * limit));
    });

    updateNumberPages();
  }, [index, products.length]);

  function handleInputChange(page: number) {
    // Get the products for the current page
    dataFetch.then((data) => {
      setProducts(data.slice((page - 1) * limit, page * limit));
    });
    setIndex(page);
    window.scrollTo(0, 0);
  }

  function handleSearch(searchInput: string) {
    // Get the products for the current page
    dataFetch.then((data) => {
      return setProducts(
        data.filter((product) =>
          product.nom
            .match(searchInput)
            ?.slice((index - 1) * limit, index * limit)
        )
      );
    });
    updateNumberPages();

    if (searchInput === "" || searchInput === null) {
      setVisible(true);
    } else {
      setVisible(false);
    }

    console.log(searchInput);
  }

  return (
    <>
      <Stack direction="column" alignSelf="center" padding="10px">
        <FormControl width={"70%"} alignSelf="center">
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              children={<CFaSearch color="gray.300" />}
            />
            <Input
              type="text"
              placeholder="Rechercher"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </InputGroup>
        </FormControl>
        <Wrap spacing="30px" justify="center">
          {products.map((product: Database.produit) => (
            <WrapItem key={product.id}>
              <Article
                id={product.id}
                nom={product.nom}
                description={product.description}
                prix={product.prix}
                image={product.nom}
              />
            </WrapItem>
          ))}
        </Wrap>
      </Stack>
      <Stack
        direction="row"
        justify="center"
        padding="10px"
        display={visible ? "flex" : "none"}
      >
        {
          // Button to swith to each page number
          Array.from(tableIndex).map((page) => (
            <Button
              key={page}
              onClick={() => handleInputChange(page)}
              colorScheme="teal"
            >
              {page}
            </Button>
          ))
        }
      </Stack>
    </>
  );
}
