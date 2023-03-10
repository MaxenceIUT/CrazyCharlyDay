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
  MenuItem,
  Checkbox
} from "@chakra-ui/react";

import { useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import Article from "@/components/Article";
import supabase from "@/utils/supabase-browser";

import { FaSearch } from "react-icons/fa";
// on import le l'icon validé
import { FaCheck } from "react-icons/fa";

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

  
  const [showBoisson, setShowBoisson] = useState(true);
  const [showChocolat, setShowChocolat] = useState(true);
  const [showDroguerie, setShowDroguerie] = useState(true);
  const [showCosmetique, setShowCosmetique] = useState(true);
  const [showFromage, setShowFromage] = useState(true);


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

      let d = data.filter((product) =>
        product.nom
          .toLocaleLowerCase()
          .match(searchInput.toLowerCase())
        );
      setProducts(d);
    });

    if (searchInput === "" || searchInput === null) {
      dataFetch.then((data) => {
        if (data === null) return;
        setProducts(data.slice((index - 1) * limit, index * limit));
      });
      setVisible(true);
    } else {
      setVisible(false);
    }
  }

  function searchCheckedItem() {
    dataFetch.then((data) => {
      if (data === null) return;


      let d = data.filter((product) => {
        if ((!showBoisson && product.categorie === 2) ||
            (!showChocolat && product.categorie === 1) ||
            (!showDroguerie && product.categorie === 3) ||
            (!showCosmetique && product.categorie === 4) ||
            (!showFromage && product.categorie === 5)
            ) {
          console.log("on affiche pas le produit: " + product.nom + " car il est de la catégorie: " + product.categorie + "")
          return false;
        }
        return true;
      });
      setProducts(d);
    });
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
        <Stack spacing={5} direction='row' pl={40}>
          <Checkbox colorScheme='blue' defaultChecked isChecked={showBoisson} onChange={(e) => setShowBoisson(e.target.checked)}>
            Boisson
          </Checkbox>
          <Checkbox colorScheme='blue' defaultChecked isChecked={showChocolat} onChange={(e) => setShowChocolat(e.target.checked)}>
            Épicerie
          </Checkbox>
          <Checkbox colorScheme='blue' defaultChecked isChecked={showDroguerie} onChange={(e) => setShowDroguerie(e.target.checked)}>
            Droguerie
          </Checkbox>
          <Checkbox colorScheme='blue' defaultChecked isChecked={showCosmetique} onChange={(e) => setShowCosmetique(e.target.checked)}>
            Cosmétique
          </Checkbox>
          <Checkbox colorScheme='blue' defaultChecked isChecked={showFromage} onChange={(e) => setShowFromage(e.target.checked)}>
            Fromage
          </Checkbox>
          <Button onClick={searchCheckedItem}><FaCheck /></Button>
        </Stack>

        <Wrap spacing="30px" justify="center">
          {products.map((product: Produit) => (
            <WrapItem key={product.id} py={5}>
              <Article
                id={product.id}
                nom={product.nom}
                description={product.description}
                prix={product.prix}
                image={product.nom} 
                categorie={product.categorie}/>
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
