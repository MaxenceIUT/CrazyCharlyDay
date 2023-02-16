import { ReactNode } from 'react';
import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  chakra,
  Collapse,
  Icon,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@chakra-ui/react';
import Image from 'next/image';
import { FaMoon, FaSun, FaChevronDown, FaChevronRight } from 'react-icons/fa';
// on import l'icone panier
import { FaShoppingCart } from 'react-icons/fa';
import { useRecoilState} from 'recoil';
import {cartState} from '@/../src/atoms/cartState';

const SunIcon = chakra(FaSun);
const MoonIcon = chakra(FaMoon);
const ChevronDownIcon = chakra(FaChevronDown);
const ChevronRightIcon = chakra(FaChevronRight);
import logo from '@/../public/logo.png';

const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={'#'}>
    {children}
  </Link>
);

const DesktopNav = () => {
  const linkColor = useColorModeValue('gray.800', 'gray.200');
  const linkHoverColor = useColorModeValue('secondary-gold.400', 'secondary-gold.600');
  const popoverContentBgColor = useColorModeValue('white', 'gray.800');

  return (
    <Stack direction={'row'} spacing={4} alignItems={'center'}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <Link
                p={2}
                href={navItem.href ?? '#'}
                fontSize={'sm'}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: 'none',
                  color: linkHoverColor,
                }}>
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={'xl'}
                bg={popoverContentBgColor}
                p={4}
                rounded={'xl'}
                minW={'sm'}>
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Link
      href={href}
      role={'group'}
      display={'block'}
      p={2}
      rounded={'md'}
      _hover={{ bg: useColorModeValue('secondary-gold.50', 'secondary-gold.100') }}>
      <Stack direction={'row'} align={'center'}>
        <Box>
          <Text
            transition={'all .3s ease'}
            _groupHover={{ color: 'secondary-gold.600' }}
            fontWeight={500}>
            {label}
          </Text>
          <Text fontSize={'sm'}>{subLabel}</Text>
        </Box>
        <Flex
          transition={'all .3s ease'}
          transform={'translateX(-10px)'}
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify={'flex-end'}
          align={'center'}
          flex={1}>
          <Icon color={'secondary-gold.600'} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      p={4}
      display={{ md: 'none' }}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? '#'}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none',
        }}>
        <Text
          fontWeight={600}
          color={useColorModeValue('gray.600', 'gray.200')}>
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}>
          {children &&
            children.map((child) => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Catalogue de produits',
    href: '/catalogue',
  },
  {
    label: 'Contact',
    href: '/contact',
  },
  {
    label: 'En savoir plus',
    children: [
      {
        label: 'Nos engagements',
        subLabel: 'Découvrez les engagements de Court-Circuit Voltaire en matière d\'environnement',
        href: '/nos-engagements',
      },
      {
        label: 'Nos activités',
        subLabel: 'Nous proposons bon nombre d\'activités que vous pourrez retrouver sur cette page',
        href: '/nos-activites',
      },
    ],
  }
];


export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [cart] = useRecoilState(cartState);
  const bgColor = useColorModeValue('gray.100', 'gray.900');
  return (
    <>
      <Box backgroundColor={bgColor} px={4}>
        <Flex h={24} alignItems={'center'} justifyContent={'space-between'}>
          <Flex className="w-full h-full">
            <Image className='w-24 h-24 object-contain' src={logo} alt={'logo'} width={110} height={110} />

            <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
              <DesktopNav />
            </Flex>

          </Flex>

          <Flex alignItems={'center'} justifyItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
              <Menu>
                <MenuButton
                  as={Button}>
                  <FaShoppingCart/>
                  <span className='absolute -right-1 bg-emerald-900 rounded-full text-white text-xs w-4 h-4 flex items-center justify-center'>
                    {cart.length}</span>
                </MenuButton>
                <MenuList>
                  {cart.map((item) => (
                    <MenuItem key={item.id}>
                      <div className='flex items-center'>
                        <div className='flex flex-col'>
                          <span className='font-bold'>{item.nom}</span>
                          <span className='text-xs text-gray-400'>
                            {item.prix}
                          </span>
                        </div>
                      </div>
                    </MenuItem>
                  ))}
                  <Button>
                    <Link href='/cart'>Voir le panier</Link>
                  </Button>
                </MenuList>
                  
              </Menu>
              
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                  <Avatar
                    size={'sm'}
                    src={'https://avatars.dicebear.com/api/male/username.svg'}
                  />
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <br />
                  <Center>
                    <Avatar
                      size={'2xl'}
                      src={'https://avatars.dicebear.com/api/male/username.svg'}
                    />
                  </Center>
                  <br />
                  <Center>
                    <p>Username</p>
                  </Center>
                  <br />
                  <MenuDivider />
                  <MenuItem>Your Servers</MenuItem>
                  <MenuItem>Account Settings</MenuItem>
                  <MenuItem>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}