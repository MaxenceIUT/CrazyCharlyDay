'use strict';

import { CartProvider, useCart } from '@/app/cart/useCart';
import { Image, Text, Box, Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Heading, Stack, Wrap, WrapItem } from '@chakra-ui/react'
import { useState, useContext } from 'react';




export default function Article(props: any) {

  

    return (
        <div>
            <Card maxW='sm'>
          <CardBody>
            <Image
                src='{props.image}'
                alt='Green double couch with wooden legs'
                borderRadius='lg'
            />
            <Stack mt='6' spacing='3'>
              <Heading size='md'>
                {props.nom}
              </Heading>
              <Text>
                {props.description}
              </Text>
              <Text color='blue.600' fontSize='2xl'>
                {props.prix}€
              </Text>
            </Stack>
          </CardBody>
          <Divider />
          <CardFooter>
            <ButtonGroup spacing='2'>
              <Button variant='solid' colorScheme='blue'>
                Acheter maintenant
              </Button>
              <CartProvider>
                <Button variant='ghost' colorScheme='blue' onClick={addToCart}>
                  Ajouter au panier
                </Button>
              </CartProvider>
            </ButtonGroup>
          </CardFooter>
        </Card>
        </div>
    );
}