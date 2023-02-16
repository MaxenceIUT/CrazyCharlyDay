'use client'

import { Heading, Text, Image, Box } from '@chakra-ui/react'

export default function about() {
    return (
        <div>
            <div className='flex flex-col h-48 w-[100%] items-center justify-center'>
                <div className="flex">
                    <Heading mr={2} size='3xl' >A propos de </Heading>
                    <Heading color='orange' size='3xl'>Court-Circuit Nancy</Heading>
                </div>
                <hr className='w-[60%] h-[2px] border-none bg-[#c4c4c4] mt-8'/>
            </div>

            <div className='px-60'>
                <Heading className=''>
                    Court-circuit Nancy est une Société Coopérative d'Intérêt Collectif (SCIC)
                </Heading>
                <div className="flex items-center px-16">
                    <Text className='text-justify mr-8'>Toute personne physique ou morale souhaitant agir de manière concrète pour changer notre mode de consommation en soutenant les filières locales, bio et le zéro déchet peut devenir sociétaire. Court-circuit Nancy accueille des sociétaires de différents horizons : des professionnel·le·s producteurs et productrices, agriculteurs et agricultrices, artisan·e·s ou artistes ; des associations citoyennes de protection de l’environnement, de la résilience alimentaire ; des investisseur·se·s et acteurs ou actrices de l’Économie locale, sociale et solidaire ; des collectivités locales et des particuliers.</Text>
                    <Image src='img/about/about.png' alt='Dan Abramov' boxSize='250px' />
                </div>
            </div>
        </div>
    );
}