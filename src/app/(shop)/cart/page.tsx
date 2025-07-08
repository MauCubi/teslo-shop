import { Title } from '@/components/ui/title/Title';
import { initialData } from '@/seed/seed';
import Link from 'next/link';
import { ProductsInCart } from './ui/ProductsInCart';
import { OrderSummary } from './ui/OrderSummary';

export default function () {
  // redirect('/empty');

  return (
    <div className='flex justify-center items-center mb-72 px-10 sm:px-0'>
      <div className='flex flex-col  w-[1000px] '>
        <Title title='Carrito' />

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>
          {/* Carrito */}
          <div className='flex flex-col mt-5 '>
            <span className='text-xl'> Agregar mas items</span>

            <Link href='/' className='underline mb-5'>
              Continua Comprando
            </Link>

            {/* Items */}
            <ProductsInCart />
          </div>

          {/* checkout */}
          <div className='bg-white rounded-xl shadow-lg p-7 h-fit'>
            <h2 className='text-2xl mb-2'>Resumen de la orden</h2>

            <OrderSummary />

            <div className='mb-5 mt-5 w-full'>
              <Link
                className='flex btn-primary justify-center'
                href='/checkout/address'
              >
                Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
