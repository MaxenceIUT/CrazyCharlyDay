'use client';

import { ChakraProvider } from "@chakra-ui/react";
import Footer from "./Footer";
import Header from "./Header";
import { RecoilRoot } from "recoil";

import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  initialColorMode: 'light',
  useSystemColorMode: true,
  colors: {
    "primary-green": {
      50: "#f0fff4",
      900: "#1c4c4b",
    },
    "secondary-gold": {
      50: "#fffaf0",
      100: "#2c2c1b",
      400: "#f6c648",
      600: "#f5c548",
      900: "#c69e2a",
    }
  }
});

export default function ChakraClientProvider({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={theme}>
      <RecoilRoot>
        <Header />
        <main>
          {children}
        </main>
        <Footer />
      </RecoilRoot>
    </ChakraProvider>
  )
}