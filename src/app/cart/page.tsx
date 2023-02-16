'use client';

import { cartState } from '@/atoms/cartState';
import React from 'react';
import { useRecoilState } from 'recoil';

const Cart = () => {

    const [cart, setCart] = useRecoilState(cartState);

    return (
        <div className='container mx-auto'>
            {/* {cart.length <= 0 ? (
                <div className='text-center'>
                    <h1 className='text-3xl font-bold'>Votre panier est vide</h1>
                    } */}
        </div>
    );
    };

export default Cart;