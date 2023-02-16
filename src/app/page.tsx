'use client';

import { Inter } from '@next/font/google'
import { Image, Text, Box, Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Heading, Stack, Wrap, WrapItem } from '@chakra-ui/react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div>
      <Stack
          as={Box}
          textAlign={'center'}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}>
          <Heading
            fontWeight={600}
            fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }}
            lineHeight={'110%'}>
            Bienvenue à<br />
            <Text as={'span'} color={'green.400'}>
              Court-Circuit Nancy
            </Text>
          </Heading>
          <Text color={'gray.500'}>
            Découvrez nos produits et services
          </Text>
          <Stack
            direction={'column'}
            spacing={3}
            align={'center'}
            alignSelf={'center'}
            position={'relative'}>
            <Button
              colorScheme={'green'}
              bg={'green.400'}
              rounded={'full'}
              px={6}
              _hover={{
                bg: 'green.500',
              }}>
              Boutique
            </Button>
          </Stack>
        </Stack>
    </div>
  )
}
