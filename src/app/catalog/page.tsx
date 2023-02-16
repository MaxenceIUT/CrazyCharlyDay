"use client";

import { Button, Container, Stack, Wrap, WrapItem } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";

import Article from "@/components/Article";

import supabase from "@/utils/supabase-browser";
import { createClient } from "@supabase/supabase-js";
import { Database } from "@/../lib/database.types";

import { RecoilRoot } from "recoil";

let indexPage = 1;
let indexMax: Promise<number> = Promise.resolve(1);
let tableIndex : number[] = [];

export async function getArticle() {
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

export default function Catalogue() {
  const [products, setProducts] = useState([]);
  const [index, setIndex] = useState(indexPage);

  useEffect(() => {
    dataFetch = getArticle();
    // Get the products from the database
    dataFetch.then((data) => {
      // Get the products for the current page
      setProducts(data.slice((index - 1) * limit, index * limit));
    });

    
    indexMax = dataFetch.then((data) => {
      return Math.ceil(data.length / limit);
    });
    indexMax.then((data) => {
      // Array.from(Array(data).keys()+1);
      tableIndex = Array.from(Array(data).keys()).map((i) => i + 1);
    });
  }, [index, products.length]);

  // 5 products per page
  const limit = 5;

  function handlePageChange(page: number) {
    // Get the products for the current page
    dataFetch.then((data) => {
      setProducts(data.slice((page - 1) * limit, page * limit));
    });
  }

  return (
    <>
        <Stack direction="row">
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
        <Stack direction="row" justify="center" padding="10px">
          {
            // Button to swith to each page number
            Array.from(tableIndex).map((page) => (
              <Button
                key={page}
                onClick={() => handlePageChange(page)}
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
