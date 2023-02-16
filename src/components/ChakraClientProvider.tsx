'use client';

import { ChakraProvider } from "@chakra-ui/react";
import Footer from "./Footer";
import Header from "./Header";

import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    "primary-green": "#1c4c4b",
    "secondary-gold": "#f5c548"
  }
});

export default function ChakraClientProvider({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={theme}>
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </ChakraProvider>
  )
}