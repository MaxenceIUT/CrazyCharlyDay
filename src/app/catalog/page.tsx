"use client";

import { Stack, Wrap, WrapItem } from "@chakra-ui/react";
import React, { useState, ReactElement } from "react";

import Article from "@/components/Article";

import supabase from "@/utils/supabase-browser";
import { createClient } from "@supabase/supabase-js";
import { Database } from "@/../lib/database.types";

const PRODUCSLIST: ReactElement[] = new Array<ReactElement>();

export async function getArticle() {
  const { data, error } = await supabase.from("produit").select("*");
  return data;
}

export default function Catalogue() {
  const [products, setProducts] = useState(PRODUCSLIST);

  let data = getArticle();

  getArticle().then((data) => {
    data.forEach(
      (element: {
        id: any;
        nom: any;
        prix: any;
        description: any;
        image: any;
      }) => {
        setProducts((prev) => [
          ...prev,
          <WrapItem>
            <Article
              key={products.length}
              nom={element.nom}
              prix={element.prix}
              description={element.description}
              image={element.image}
            />
          </WrapItem>,
        ]);
      }
    );
  });

  return (
    <Stack direction="row">
      <Wrap spacing="30px" justify="center">
        <>{products}</>
      </Wrap>
    </Stack>
  );
}
