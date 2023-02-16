'use strict';

import { Image, Text, Box, Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Heading, Stack, Wrap, WrapItem } from '@chakra-ui/react'

type ArticleProps = {
    nom: string,
    description: string,
    prix: number,
    image: string
}

export default function Article(props: ArticleProps) {

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
              <Button variant='ghost' colorScheme='blue'>
                Ajouter au panier
              </Button>
            </ButtonGroup>
          </CardFooter>
        </Card>
        </div>
    );
}