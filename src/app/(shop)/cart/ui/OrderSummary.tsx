'use client';

import { useCartStore } from '@/store/cart/cart-store';
import { currencyFormat } from '@/utils/currencyFormat';
import { useEffect, useState } from 'react';
import { useShallow } from 'zustand/shallow';

export const OrderSummary = () => {
  const [loaded, setLoaded] = useState(false);
  const { subTotal, total, tax, itemsInCart } = useCartStore( useShallow((state) =>
    state.getSummaryInfo())
  );

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <p>Loading...</p>;
  }

  return (
    <div className='grid grid-cols-2'>
      <span>No. Productos</span>
      <span className='text-right'>
        {itemsInCart === 1 ? '1 artículo' : `${itemsInCart} articulos`}
      </span>

      <span>Subtotal</span>
      <span className='text-right'>{currencyFormat(subTotal)}</span>

      <span>Inpuestos (15%)</span>
      <span className='text-right'>{currencyFormat(tax)}</span>

      <span className='text-2xl'>Total</span>
      <span className='text-right text-2xl'>{currencyFormat(total)}</span>
    </div>
  );
};
