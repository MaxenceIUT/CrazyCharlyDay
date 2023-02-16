"use client";

import { cartState } from "@/atoms/cartState";
import Article from "@/components/Article";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import supabaseBrowser from "@/utils/supabase-browser";
import { Stack, Wrap, WrapItem } from "@chakra-ui/react";
import { useState } from "react";
import ArticlePanier from "@/components/ArticlePanier";

const Cart = () => {
  const [cart, setCart] = useState([] as Array<any>);
  const [cartState, setCartState] = useState([] as Array<any>);

  useEffect(() => {
    const fetch = async () => {
      const id = "0026e160-811a-44c4-97d2-77b6193da798";

      const idCommande = await supabaseBrowser
        .from("commande")
        .select("*")
        .eq("termine", false)
        .eq("idUser", id);

      const { data, error } = await supabaseBrowser
        .from("panier")
        .select()
        .eq("id_commande", idCommande.data[0].idCM);
      let articles = [];
      setCartState(data);
      await data.forEach(async (element: { id_produit: any }) => {
        let article = await supabaseBrowser
          .from("produit")
          .select()
          .eq("id", element.id_produit);
        articles.push(article.data[0]);
        setCart(articles);
      });
      setCart(articles);
    };
    fetch();
  }, []);

  return (
    <div className="container mx-auto">
      {!cart ? (
        <h1 className="text-2xl">Votre panier est vide</h1>
      ) : (
        <div>
          <Stack direction="column" alignSelf="center" padding="10px">
            <Wrap spacing="30px" justify="center">
              {cart.map((article) => (
                <WrapItem key={article.id}>
                  <ArticlePanier
                    key={article.id}
                    id={article.id}
                    categorie={article.categorie}
                    nom={article.nom}
                    quantite={
                      cartState.find((e) => e.id_produit == article.id).quantite
                    }
                    prix={article.prix}
                    image={article.image}
                    trashedFonction={() => {
                        setCartState(cartState.filter((e) => e.id_produit != article.id));
                        setCart(cart.filter((e) => e.id != article.id));
                        supabaseBrowser.from("panier").delete().eq("id_produit", article.id);
                        
                    }}
                  />
                </WrapItem>
              ))}
            </Wrap>
          </Stack>
        </div>
      )}
    </div>
  );
};

export default Cart;
