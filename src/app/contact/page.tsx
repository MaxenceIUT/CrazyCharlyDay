'use client';

import { Box, Card, CardBody, CardHeader, chakra, Flex, Heading, Link, LinkBox, LinkOverlay, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { FaExternalLinkAlt } from "react-icons/fa";

const ExternalLinkIcon = chakra(FaExternalLinkAlt);

export default function Contact() {
  return (
    <Flex
      className="p-14"
      align={"center"}
      justify={"center"}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Contactez-nous !</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            Une question ? Une demande de partenariat ? Une simple envie de communiquer avec nous ? N'hésite pas à nous contacter via cette page ! ❤️
          </Text>
        </Stack>
        <LinkBox>
          <Card size="lg">
            <CardHeader>
              <Heading size='md'>Via notre adresse email</Heading>
            </CardHeader>
            <CardBody>
              <LinkOverlay href="mailto:local@courtcircuitnancy.fr"><Text>Envoyez nous un mail <ExternalLinkIcon mx='2px' /></Text></LinkOverlay>
            </CardBody>
          </Card>
        </LinkBox>
      </Stack>
    </Flex>
  )
}