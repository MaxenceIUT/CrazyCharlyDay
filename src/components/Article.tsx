'use strict';

import { Image, Text, Box, Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Heading, Stack, Wrap, WrapItem } from '@chakra-ui/react'
import {useCart} from '@/../lib/useCart';
import { use } from 'react';
import {useRecoilState} from 'recoil';
import {cartState} from '@/../src/atoms/cartState';


export default function Article(props: any) {

  const [cart, setCart] = useRecoilState(cartState);

  const addToCart = () => {
    if (!props.categorie == 1 ) {
      setCart(prevState => [...cart, props]);
    } else {
      routeur.push('/articleInfo/'+props.id);
    }

  }

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
                <Button variant='ghost' colorScheme='blue' onClick={addToCart}>
                  Ajouter au panier
                </Button>
            </ButtonGroup>
          </CardFooter>
        </Card>
        </div>
    );
}