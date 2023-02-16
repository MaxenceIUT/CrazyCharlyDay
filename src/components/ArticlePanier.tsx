"use strict";

import { useRecoilState } from "recoil";
import { cartState } from "@/../src/atoms/cartState";
import {
  Image,
  Popover,
  LinkBox,
  LinkOverlay,
  Text,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Stack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
// on import l'icon basket
import { FaShoppingBasket } from "react-icons/fa";
// on import icon like
import { FaTrash } from "react-icons/fa";
import supabaseBrowser from "@/utils/supabase-browser";
import { useState } from "react";

type ArticleProps = {
  id: number;
  categorie: number;
  nom: string;
  quantite: number;
  prix: number;
  image: string;
  trashedFonction: any;
};

export default function Article(props: ArticleProps) {
  const router = useRouter();

  const [cart, setCart] = useState([]) as any;

  const addToCart = async () => {
    if (props.categorie == 1) {
      router.push("/articleInfo/" + props.id);
    } else {
      const jtwl = await supabaseBrowser.auth.getSession();
      if (!jtwl.data.session) return;
      const id = jtwl.data.session.user.id;
      let idCM;
      const { data, error } = await supabaseBrowser
        .from("commande")
        .select("*")
        .eq("termine", false)
        .eq("idUser", id);
      if (!data || data.length == 0) {
        const { data, error } = await supabaseBrowser
          .from("commande")
          .insert({ idUser: id, termine: false })
          .select();
        if (!data) return;
        idCM = data[0].idCM;
      } else {
        if (!data) return;
        idCM = data[0].idCM;
      }
      // setCart(prevState => [...cart, props]);
      const dataPanier = await supabaseBrowser
        .from("panier")
        .select()
        .eq("id_commande", idCM)
        .eq("id_produit", props.id);

      if (dataPanier.data && dataPanier.data.length > 0) {
        if (!dataPanier.data[0].quantite) return;
        const { data, error } = await supabaseBrowser
          .from("panier")
          .update({ quantite: dataPanier.data[0].quantite + 1 })
          .eq("id_commande", idCM)
          .eq("id_produit", props.id);
      } else {
        const panier = await supabaseBrowser
          .from("panier")
          .insert({ id_commande: idCM, id_produit: props.id, quantite: 1 })
          .select();
        if (!panier.data) return;
        const array = cart.push(panier.data[0]);
        setCart(array);
      }
    }
  };

  return (
    <div>
      <LinkBox>
        <LinkOverlay>
          <Card maxW="sm" className="hover:drop-shadow-lg">
            <CardBody>
              <div className="w-[100%] flex justify-center">
                <Image
                  src={"img/" + props.id + ".png"}
                  alt="Green double couch with wooden legs"
                  borderRadius="lg"
                  height="250px"
                />
              </div>
              <Stack mt="6" spacing="3">
                <Heading size="md" minH="3em">
                  {props.nom}
                </Heading>
                <div className="h-12">
                  <Text noOfLines={4}>
                    Il y en a {props.quantite} dans le panier
                  </Text>
                </div>
                <Text color="blue.600" fontSize="2xl">
                  {props.prix}€
                </Text>
              </Stack>
            </CardBody>
            <Divider />
            <CardFooter className="items-center justify-around">
              <Text mr={2}>Ajouter directement au panier</Text>
              <Button variant="solid" colorScheme="blue" onClick={addToCart}>
                <FaShoppingBasket />
              </Button>
              <Button
                variant="solid"
                colorScheme="red"
                onClick={props.trashedFonction}
              >
                <FaTrash />
              </Button>
            </CardFooter>
          </Card>
        </LinkOverlay>
      </LinkBox>
    </div>
  );
}
