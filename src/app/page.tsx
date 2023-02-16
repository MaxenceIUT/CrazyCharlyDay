'use client';

import Article from '../components/Article';  
import { Inter } from '@next/font/google'
import { Image, Text, Box, Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Heading, Stack, Wrap, WrapItem } from '@chakra-ui/react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div>
      <Stack direction='column'>
        <Box
          display='flex'
          alignItems='center'
          justifyContent='center'
          width='100%'
          py={12}
          mb={2}
        >
          <ButtonGroup gap='4'>
            <Button colorScheme='whiteAlpha'>WhiteAlpha</Button>
            <Button colorScheme='blackAlpha'>BlackAlpha</Button>
          </ButtonGroup>
        </Box>

        <Wrap spacing={4}>
          <WrapItem>
            <Button colorScheme='gray'>Gray</Button>
          </WrapItem>
          <WrapItem>
            <Button colorScheme='red'>Red</Button>
          </WrapItem>
          <WrapItem>
            <Button colorScheme='orange'>Orange</Button>
          </WrapItem>
          <WrapItem>
            <Button colorScheme='yellow'>Yellow</Button>
          </WrapItem>
          <WrapItem>
            <Button colorScheme='green'>Green</Button>
          </WrapItem>
          <WrapItem>
            <Button colorScheme='teal'>Teal</Button>
          </WrapItem>
          <WrapItem>
            <Button colorScheme='blue'>Blue</Button>
          </WrapItem>
          <WrapItem>
            <Button colorScheme='cyan'>Cyan</Button>
          </WrapItem>
          <WrapItem>
            <Button colorScheme='purple'>Purple</Button>
          </WrapItem>
          <WrapItem>
            <Button colorScheme='pink'>Pink</Button>
          </WrapItem>
          <WrapItem>
            <Button colorScheme='linkedin'>Linkedin</Button>
          </WrapItem>
          <WrapItem>
            <Button colorScheme='facebook'>Facebook</Button>
          </WrapItem>
          <WrapItem>
            <Button colorScheme='messenger'>Messenger</Button>
          </WrapItem>
          <WrapItem>
            <Button colorScheme='whatsapp'>Whatsapp</Button>
          </WrapItem>
          <WrapItem>
            <Button colorScheme='twitter'>Twitter</Button>
          </WrapItem>
          <WrapItem>
            <Button colorScheme='telegram'>Telegram</Button>
          </WrapItem>
        </Wrap>
      </Stack>
      <Card maxW='sm'>
        <CardBody>
          <Image
            src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
            alt='Green double couch with wooden legs'
            borderRadius='lg'
          />
          <Stack mt='6' spacing='3'>
            <Heading size='md'>Living room Sofa</Heading>
            <Text>
              This sofa is perfect for modern tropical spaces, baroque inspired
              spaces, earthy toned spaces and for people who love a chic design with a
              sprinkle of vintage design.
            </Text>
            <Text color='blue.600' fontSize='2xl'>
              $450
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing='2'>
            <Button variant='solid' colorScheme='blue'>
              Buy now
            </Button>
            <Button variant='ghost' colorScheme='blue'>
              Add to cart
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </div>
  )
}
