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
  LinkOverlay,
} from "@chakra-ui/react";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

const Testimonial = ({ children }: { children: ReactNode }) => {
  return <Box>{children}</Box>;
};

const TestimonialContent = ({ children }: { children: ReactNode }) => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      boxShadow={"lg"}
      p={8}
      rounded={"xl"}
      align={"center"}
      pos={"relative"}
      _after={{
        content: `""`,
        w: 0,
        h: 0,
        borderLeft: "solid transparent",
        borderLeftWidth: 16,
        borderRight: "solid transparent",
        borderRightWidth: 16,
        borderTop: "solid",
        borderTopWidth: 16,
        borderTopColor: useColorModeValue("white", "gray.800"),
        pos: "absolute",
        bottom: "-16px",
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      {children}
    </Stack>
  );
};

const TestimonialHeading = ({ children }: { children: ReactNode }) => {
  return (
    <Heading as={"h3"} fontSize={"xl"}>
      {children}
    </Heading>
  );
};

const TestimonialText = ({ children }: { children: ReactNode }) => {
  return (
    <Text
      textAlign={"center"}
      color={useColorModeValue("gray.600", "gray.400")}
      fontSize={"sm"}
    >
      {children}
    </Text>
  );
};

const TestimonialAvatar = ({
  src,
  name,
  title,
}: {
  src: string;
  name: string;
  title: string;
}) => {
  return (
    <Flex align={"center"} mt={8} direction={"column"}>
      <Avatar src={src} mb={2} />
      <Stack spacing={-1} align={"center"}>
        <Text fontWeight={600}>{name}</Text>
        <Text fontSize={"sm"} color={useColorModeValue("gray.600", "gray.400")}>
          {title}
        </Text>
      </Stack>
    </Flex>
  );
};

export default function Home() {
  return (
    <>
      <div>
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          py={20}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
          >
            Bienvenue ??<br />
            <Text as={"span"} color={"green.400"}>
              Court-Circuit Nancy
            </Text>
          </Heading>
          <Text color={"gray.500"}>D??couvrez nos produits et services</Text>
          <Stack
            direction={"column"}
            spacing={3}
            align={"center"}
            alignSelf={"center"}
            position={"relative"}
          >
            <LinkOverlay href={'catalogue'}>
              <Button
                colorScheme={"green"}
                bg={"green.400"}
                rounded={"full"}
                px={6}
                _hover={{
                  bg: "green.500",
                }}
                
              >
                Boutique
              </Button>
            </LinkOverlay>
          </Stack>
        </Stack>
      </div>
      <Box bg={useColorModeValue("gray.100", "gray.700")}>
        <Container maxW={"7xl"} py={16} as={Stack} spacing={12}>
          <Stack spacing={0} align={"center"}>
            <Heading>Retour client</Heading>
            <Text>Nos clients sont heureux de nos produits locaux</Text>
          </Stack>
          <Stack
            direction={{ base: "column", md: "row" }}
            spacing={{ base: 10, md: 4, lg: 10 }}
          >
            <Testimonial>
              <TestimonialContent>
                <TestimonialHeading>
                  D??couverte exceptionnelle
                </TestimonialHeading>
                <TestimonialText>
                  Tr??s belle d??couverte, cadre agr??able et coup?? de la ville.
                  Les produits propos??s sont frais et locaux, tout est pens??
                  pour r??duire les d??chets, bref top !
                </TestimonialText>
              </TestimonialContent>
              <TestimonialAvatar
                src={"https://avatars.dicebear.com/api/male/michelle.svg"}
                name={"Stephanie Gounant"}
                title={""}
              />
            </Testimonial>
            <Testimonial>
              <TestimonialContent>
                <TestimonialHeading>
                  Des produits locaux de qualit??
                </TestimonialHeading>
                <TestimonialText>
                  Magnifique lieu de vie, des produits locaux de qualit?? et des
                  animations nombreuses et r??guli??res !! Je vous conseille d'y
                  aller rapidement ;)
                </TestimonialText>
              </TestimonialContent>
              <TestimonialAvatar
                src={"https://avatars.dicebear.com/api/male/Jeanne.svg"}
                name={"Michael Bouquet"}
                title={""}
              />
            </Testimonial>
            <Testimonial>
              <TestimonialContent>
                <TestimonialHeading>
                  Super Ravie
                </TestimonialHeading>
                <TestimonialText>
                  Un endroit o?? on se sent bien pour y faire ses courses ! Et le
                  tout avec des produits de qualit??, bio, en vrac et en
                  circuits-courts. J'ai aussi appr??ci?? l'affichage du lieu et
                  des conditions de production pour chaque produit.
                </TestimonialText>
              </TestimonialContent>
              <TestimonialAvatar
                src={"https://avatars.dicebear.com/api/female/Jean.svg"}
                name={"In??s Brin"} title={""}              
                />
            </Testimonial>
          </Stack>
        </Container>
      </Box>
    </>
  );
}
