'use client';

import { ProductImage } from '@/components/product/product-image/ProductImage';
import { QuantitySelector } from '@/components/product/quantity-selector/QuantitySelector';
import { useCartStore } from '@/store/cart/cart-store';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export const ProductsInCart = () => {
  const updateProductQuantity = useCartStore(
    (state) => state.updateProductQuantity
  );
  const productsInCart = useCartStore((state) => state.cart);
  const removeProduct = useCartStore((state) => state.removeProduct);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {productsInCart.map((prod) => (
        <div key={`${prod.slug}-${prod.size}`} className='flex mb-5'>
          <ProductImage
            src={prod.image}
            width={100}
            height={100}
            style={{
              width: '100px',
              height: '100px',
            }}
            alt={prod.title}
            className='mr-5 rounded'
          />

          <div>
            <Link
              className='hover:underline cursor-pointer'
              href={`/product/${prod.slug}`}
            >
              {prod.size} {prod.title}
            </Link>

            <p>${prod.price}</p>

            <QuantitySelector
              quantity={prod.quantity}
              onQuantityChange={(quantity) =>
                updateProductQuantity(prod, quantity)
              }
            />

            <button
              onClick={() => removeProduct(prod)}
              className='underline mt-3 cursor-pointer'
            >
              Remover
            </button>
          </div>
        </div>
      ))}
    </>
  );
};
