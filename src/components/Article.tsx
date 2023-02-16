'use strict';

import { Image, Popover, LinkBox, LinkOverlay,  Text, Box, Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Heading, Stack, Wrap, WrapItem } from '@chakra-ui/react'
import { useRouter } from 'next/navigation'

type ArticleProps = {
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
            <LinkOverlay href={'articleInfo/'+props.id}>
                <Card maxW='sm' className="hover:drop-shadow-lg">
                  <CardBody>
                    <div className="w-[100%] flex justify-center">
                      <Image
                            src={'img/'+props.id+'.jpg'}
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
                  <CardFooter>
                    <Button variant='solid' colorScheme='blue'>
                      Ajouter au panier
                    </Button>
                  </CardFooter>
              </Card>
            </LinkOverlay>
          </LinkBox>
        </div>
    );
}