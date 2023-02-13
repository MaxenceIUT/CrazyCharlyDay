'use client';

import { Inter } from '@next/font/google'
import { Box, Button, ButtonGroup, Stack, Wrap, WrapItem } from '@chakra-ui/react'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={inter.className}>
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
      </div>
    </main>
  )
}
