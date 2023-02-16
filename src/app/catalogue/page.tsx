"use client";

import {
  Button,
  chakra,
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Wrap,
  WrapItem,
  Menu,
  MenuButton,
  MenuList,
  MenuItem
} from "@chakra-ui/react";

import { useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import Article from "@/components/Article";
import supabase from "@/utils/supabase-browser";

import { FaSearch } from "react-icons/fa";
import { Database } from "lib/database.types";
const CFaSearch = chakra(FaSearch);

let indexMax: Promise<number> = Promise.resolve(1);
let tableIndex: number[] = [];
let limit = 5;

async function getArticle() {
  const { data, error } = await supabase.from("produit").select("*");
  return data;
}

type Produit = Database["public"]["Tables"]["produit"]["Row"];

let dataFetch: Promise<Produit[] | null> = Promise.resolve(null);

function updateNumberPages() {
  indexMax = dataFetch.then((data) => {
    if (data === null) return 0;
    return Math.ceil(data.length / limit);
  });
  indexMax.then((data) => {
    tableIndex = Array.from(Array(data).keys()).map((i) => i + 1);
  });
}

export default function Catalogue() {
  const [products, setProducts] = useState([] as Array<Produit>);
  const [index, setIndex] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [visible, setVisible] = useState(true);

  const searchParam = useSearchParams();
  const page = searchParam.get("page");


  useEffect(() => {
    let indextemp = 1;
    if (page !== null) {
      indextemp = parseInt(page);
      setIndex((curr) => {
        return parseInt(page);
      });
    }
    

    dataFetch = getArticle();
    if (dataFetch === null) {
      return;
    }

    // Get the products from the database
    dataFetch.then((data) => {
      if (data === null) return;
      // Get the products for the current page
      setProducts(data.slice((indextemp - 1) * limit, indextemp * limit));
    });

    updateNumberPages();
  }, []);

  function handleInputChange(page: number) {
    // Get the products for the current page
    dataFetch.then((data) => {
      if (data === null) return;
      else setProducts(data.slice((page - 1) * limit, page * limit));
    });
    setIndex(page);
    window.scrollTo(0, 0);
    // Change href without reloading the page
    window.history.pushState({}, "", `?page=${page}`);
  }

  function handleSearch(searchInput: string) {
    // Get the products for the current page
    dataFetch.then((data) => {
      if (data === null) return;
      return setProducts(
        data.filter((product) =>
          product.nom
            .toLocaleLowerCase()
            .match(searchInput.toLowerCase())
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
          {products.map((product: Produit) => (
            <WrapItem key={product.id} py={5}>
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
              variant={page === index ? "solid" : "outline"}
              type="button"
            >
              {page}
            </Button>
          ))
        }
      </Stack>
    </>
  );
}
