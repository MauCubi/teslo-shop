'use client';

import Link from 'next/link';
import { ProductsInCart } from './ProductsInCart';
import { Title } from '@/components/ui/title/Title';
import { useEffect, useState } from 'react';
import { useAddressStore } from '@/store/addres/addres-store';
import { useCartStore } from '@/store/cart/cart-store';
import { useShallow } from 'zustand/shallow';
import { currencyFormat } from '@/utils/currencyFormat';
import clsx from 'clsx';
import { placeOrder } from '@/actions/order/place-order';

export const PlaceOrder = () => {
  const { subTotal, total, tax, itemsInCart } = useCartStore(
    useShallow((state) => state.getSummaryInfo())
  );

  const [loaded, setLoaded] = useState(false);

  const [placingOrder, setPlacingOrder] = useState(false);

  const address = useAddressStore((state) => state.address);

  const cart = useCartStore((state) => state.cart)

  useEffect(() => {
    setLoaded(true);
  }, []);

  const onPlaceOrder = async () => {

    const productsInOrder = cart.map( prod => ({
      productId: prod.id,
      quantity: prod.quantity,
      size: prod.size,
    })) 

    setPlacingOrder(true);

    // console.log({address, productsInOrder})

    const resp = await placeOrder(productsInOrder, address)
    // console.log({resp})


    setPlacingOrder(false);
  };

  if (!loaded) {
    <p>Loading...</p>;
  }

  return (
    <div className='flex justify-center items-center mb-72 px-10 sm:px-0'>
      <div className='flex flex-col  w-[1000px] '>
        <Title title='Verificar Compre' />

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
          {/* Carrito */}
          <div className='flex flex-col mt-5 '>
            <span className='text-xl'>Ajustar elementos</span>

            <Link href='/cart' className='underline mb-5'>
              Editar carrito
            </Link>

            {/* Items */}
            <ProductsInCart />
          </div>

          {/* checkout */}
          <div className='bg-white rounded-xl shadow-lg p-7'>
            <h2 className='text-2xl font-bold mb-2'>Direccion de entrega</h2>
            <div className='mb-10'>
              <p className='text-xl'>
                {address.firstName} {address.lastName}
              </p>
              <p>{address.address}</p>
              <p>{address.address2}</p>
              <p>{address.postalCode}</p>
              <p>
                {address.city}, {address.country}
              </p>
              <p>{address.phone}</p>
            </div>

            {/* Divider */}
            <div className='w-full h-0.5 rounded bg-gray-200 mb-10' />

            <h2 className='text-2xl mb-2'>Resumen de la orden</h2>

            {loaded && (
              <div className='grid grid-cols-2'>
                <span>No. Productos</span>
                <span className='text-right'>
                  {itemsInCart === 1
                    ? '1 artículo'
                    : `${itemsInCart} articulos`}
                </span>

                <span>Subtotal</span>
                <span className='text-right'>{currencyFormat(subTotal)}</span>

                <span>Inpuestos (15%)</span>
                <span className='text-right'>{currencyFormat(tax)}</span>

                <span className='text-2xl'>Total</span>
                <span className='text-right text-2xl'>
                  {currencyFormat(total)}
                </span>
              </div>
            )}

            <div className='mb-5 mt-5 w-full'>

              {/* <p>Error de creacion</p> */}

              <button
                onClick={ onPlaceOrder }
                className={
                  clsx({
                    'btn-primary': !placingOrder
                  })
                }
                // href='/orders/123'
              >
                Colocar orden
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
