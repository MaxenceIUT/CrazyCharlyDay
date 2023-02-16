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
import { FaHeart } from "react-icons/fa";
import supabaseBrowser from "@/utils/supabase-browser";

type ArticleProps = {
  id: number;
  categorie: number;
  nom: string;
  description: string | null;
  prix: number;
  image: string;
};

export default function Article(props: ArticleProps) {
  const router = useRouter();

  const [cart, setCart] = useRecoilState(cartState);

  const addToCart = async () => {
    if (props.categorie == 1) {
      router.push("/produit/" + props.id);
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
        if (!data[0].idCM) return;
        idCM = data[0].idCM;
      }
      // setCart(prevState => [...cart, props]);
      const dataPanier = await supabaseBrowser
        .from("panier")
        .select()
        .eq("id_commande", idCM)
        .eq("id_produit", props.id);

      if (!dataPanier.data) return;
      if (dataPanier.data[0] && dataPanier.data.length > 0) {
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
        setCart((prevState) => [...cart, panier.data[0]]);
      }
    }
  };

  return (
    <div>
      <LinkBox>
        <Card maxW="sm" className="hover:drop-shadow-lg">
          <CardBody>
            <LinkOverlay href={"produit/" + props.id}>
              <div className="w-[100%] flex justify-center">
                <Image
                  src={"img/" + props.id + ".png"}
                  alt="Green double couch with wooden legs"
                  borderRadius="lg"
                  height="250px"
                />
              </div>
            </LinkOverlay>

            <Stack mt="6" spacing="3">
              <Heading size="md" minH="3em">
                {props.nom}
              </Heading>
              <div className="h-24">
                <Text noOfLines={4}>{props.description}</Text>
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
          </CardFooter>
        </Card>
      </LinkBox>
    </div>
  );
}
