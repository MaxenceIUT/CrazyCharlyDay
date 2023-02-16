"use client";

import { Inter } from "@next/font/google";
import {
  Image,
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
  useColorModeValue,
  Flex,
  Avatar,
  Container,
  SimpleGrid,
  Icon,
  chakra,
} from "@chakra-ui/react";

import { ReactElement, ReactNode } from "react";

import { FcCloseUpMode, FcShipped, FcFullTrash } from "react-icons/fc";

import FaLeaf from "react-icons/fa";
import ImTruck from "react-icons/im";
import GiRecycling from "react-icons/gi";

interface FeatureProps {
  title: string;
  text: string;
  icon: ReactElement;
}

const Feature = ({ title, text, icon }: FeatureProps) => {
  return (
    <Stack>
      <Flex
        w={16}
        h={16}
        align={"center"}
        justify={"center"}
        color={"white"}
        rounded={"full"}
        bg={"gray.100"}
        mb={1}
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{title}</Text>
      <Text color={"gray.600"}>{text}</Text>
    </Stack>
  );
};

export default function engagements() {
  return (
    <>
      <Container maxW={"7xl"} py={12} justifySelf="center">
        <div className="flew w-[100%] justify-center">
          <Heading lineHeight={1.1} fontWeight={600} fontSize={"4xl"}>
            Nos engagements
          </Heading>

          <Box p={4}>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
              <Feature
                icon={<Icon as={FcShipped} w={10} h={10} />}
                title={"Nos producteurs / productrices"}
                text={
                  "Le choix de nos partenariats est fondé sur le respect de critères sociaux et écologiques exigeants : nos fournisseur·se·s s’inscrivent dans une démarche de développement durable, proposent des produits respectueux de l’humain et de la nature. Nos producteurs et productrices sont exigeants sur la qualité de leurs produits et nous nous engageons à leur côté pour une transparence totale et un mode de consommation plus éthique."
                }
              />
              <Feature
                icon={<Icon as={FcCloseUpMode} w={10} h={10} />}
                title={"Les produits"}
                text={
                  "L’épicerie propose en vrac un maximum de produits locaux (moins de 200 kms), issus de l’agriculture biologique autant que possible. Dès lors qu’un produit n’existe pas localement nous nous tournons exclusivement vers l’agriculture biologique et le commerce équitable. Nous garantissons et exigeons une traçabilité claire et une transparence sur la provenance et la composition de l’ensemble de nos produits. Retrouvez toutes les informations sur nos étiquettes : producteur.rice, distance, origine … ou sur simple demande !"
                }
              />
              <Feature
                icon={<Icon as={FcFullTrash} w={10} h={10} />}
                title={"La réduction des déchets"}
                text={
                  "Comment ça fonctionne pour vous ? Vous venez avec vos contenants, nous les pesons puis y ajoutons un code barre. Remplissez-les ensuite avec les produits de votre choix et nous retirons le poids de votre récipient lors du passage en caisse ! Si vous n’avez pas assez de contenants, nous vous en fournissons gratuitement. Nous travaillons en amont avec nos producteurs et productrices afin de réduire nous aussi les déchets de Court-Circuit Nancy : réutilisation des emballages et contenants, système de consigne …"
                }
              />
            </SimpleGrid>
          </Box>
        </div>
      </Container>
    </>
  );
}
