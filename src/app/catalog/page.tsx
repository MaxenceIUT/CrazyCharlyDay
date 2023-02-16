"use client";

import { Stack } from "@chakra-ui/react";
import React, { useState } from "react";

import Article from "@/components/Article";

import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/database";

const supabase = createClient<Database>(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

const article = (props) => {
    nom : string;
}

export async function getArticle() {
  return await supabase.from("articles").select("*");
}


export default function Catalogue() {
  const [articles, setArticles] = useState([]);

  getArticle().then((data) => {
    setArticles(data.data);
  });

  return (
    <Stack direction="row">
      {articles.map((article) => (
        <Article
          nom={article.nom}
          description={article.description}
          prix={article.prix}
          image={article.image}
        />
      ))}
    </Stack>
  );
}
