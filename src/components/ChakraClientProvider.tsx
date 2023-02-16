'use client';

import { ChakraProvider } from "@chakra-ui/react";
import Footer from "./Footer";
import Header from "./Header";

export default function ChakraClientProvider({ children }: { children: React.ReactNode }) {
    return (
        <ChakraProvider>
            <Header />
            <main>
                {children}
            </main>
            <Footer />
        </ChakraProvider>
    )
}