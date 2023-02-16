'use client';

import { ChakraProvider } from "@chakra-ui/react";
import Footer from "./Footer";
import Header from "./Header";
import { RecoilRoot } from "recoil";

export default function ChakraClientProvider({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider>
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