"use client";
import { Avatar, Box, Stack, Text, useColorModeValue } from "@chakra-ui/react";

export default function WithLargeQuote() {
  return (
    <Stack
      bg={useColorModeValue("gray.50", "gray.800")}
      py={16}
      px={8}
      spacing={{ base: 8, md: 10 }}
      align={"center"}
      direction={"column"}
    >
      <Text
        fontSize={{ base: "xl", md: "2xl" }}
        textAlign={"center"}
        maxW={"3xl"}
      >
        Nous proposons une large gamme de produits, allant des fruits et légumes
        de saison, aux produits laitiers, viandes, produits de la mer, ainsi
        qu'une sélection de produits d'épicerie fine, de cosmétiques et
        d'articles de maison écologiques. Tous nos produits sont rigoureusement
        sélectionnés pour leur qualité et leur impact environnemental.
      </Text>
      <Box textAlign={"center"}>
        <Avatar mb={2} />
        <Text fontSize={"sm"} color={useColorModeValue("gray.400", "gray.400")}>
          Vice President
        </Text>
      </Box>
    </Stack>
  );
}
