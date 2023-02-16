'use strict';

import { Image, Popover, LinkBox, LinkOverlay,  Text, Box, Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Heading, Stack, Wrap, WrapItem } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
// on import l'icon basket
import { FaShoppingBasket } from 'react-icons/fa'
// on import icon like
import { FaHeart } from 'react-icons/fa'

type ArticleProps = {
  id: number,
  nom: string,
  description: string,
  prix: number,
  image: string
}

export default function Article(props: ArticleProps) {

  const router = useRouter();

    return (
        <div>
          <LinkBox>
            <LinkOverlay href={'produit/'+props.id}>
                <Card maxW='sm' className="hover:drop-shadow-lg">
                  <CardBody>
                    <div className="w-[100%] flex justify-center">
                      <Image
                            src={'img/'+props.id+'.png'}
                            alt='Green double couch with wooden legs'
                            borderRadius='lg'
                            height='250px'
                            />
                    </div>
                    <Stack mt='6' spacing='3'>
                      <Heading size='md' minH='3em'>
                        {props.nom}
                      </Heading>
                      <div className="h-24">
                        <Text noOfLines={4}>
                          {props.description}
                        </Text>
                      </div>
                      <Text color='blue.600' fontSize='2xl'>
                        {props.prix}€
                      </Text>
                    </Stack>
                  </CardBody>
                  <Divider />
                  <CardFooter className="items-center justify-around">
                    <Text mr={2}>Ajouter directement au panier</Text>
                    <Button variant='solid' colorScheme='blue'>
                      <FaShoppingBasket />
                    </Button>
                  </CardFooter>
              </Card>
            </LinkOverlay>
          </LinkBox>
        </div>
    );
}