'use client'

import { Image, Text, Box, Heading, Button, ButtonGroup, FormControl, FormLabel, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, chakra} from '@chakra-ui/react'



export default function articleInfo() {
    
  return (
    <div className='flex px-[20%] mt-10'>
      <div className='m-3'>
        <Box boxSize={'sm'}>
          <Image src='https://bit.ly/dan-abramov' boxSize={'full'} alt='Dan Abramov' />
        </Box>
      </div>
      <div className='px-10'>
        <Text fontSize='2xl' py={[6]}> Aspirateur à impulsion magnétique, ouverture 34,5cm</Text>
        <Heading size='lg' mb={[4]} ml={[4]}>€10,00</Heading>

        <div className=''>
          <Heading size='md' my={[2]}>Description</Heading>
          <Text fontSize='sm'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam fugiat assumenda dignissimos, obcaecati laudantium cupiditate?</Text>
          <hr className='border-none bg-[#e2e2e2] h-[1px] w-[100%] my-5'/>
        </div>
        <div>
          <Heading size='md' my={[2]}>Information suplémentaires</Heading>
          <Text fontSize='sm'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam fugiat assumenda dignissimos, obcaecati laudantium cupiditate?</Text>
          <hr className='border-none bg-[#e2e2e2] h-[1px] w-[100%] my-5'/>
        </div>

        <div className='flex items-center'>
          <FormControl mx={4}>
            <NumberInput max={50} min={1}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
          <ButtonGroup spacing='2' mx={4}>
              <Button variant='solid' colorScheme='green'>
                Ajouter au panier
              </Button>
          </ButtonGroup>
        </div>
      </div>
    </div>
  )
}