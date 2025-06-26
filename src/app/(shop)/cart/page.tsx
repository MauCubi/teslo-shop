import { QuantitySelector } from '@/components/product/quantity-selector/QuantitySelector';
import { Title } from '@/components/ui/title/Title';
import { initialData } from '@/seed/seed';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';


const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],  
]

export default function() {

  // redirect('/empty');

  return (
    <div className='flex justify-center items-center mb-72 px-10 sm:px-0'>

      <div className='flex flex-col  w-[1000px] '>
        
        <Title title='Carrito'/>

        <div className='grid grid-cols-1 sm:grid-cols-2 gap-10'>

          {/* Carrito */}
          <div className='flex flex-col mt-5 '>

            <span className='text-xl'> Agregar mas items</span>

            <Link href='/' className='underline mb-5'>
              Continua Comprando
            </Link>

          

          {/* Items */}
          {
            productsInCart.map( prod => (
              
              <div key={prod.slug} className='flex mb-5'>
                <Image 
                  src={`/products/${prod.images[0]}`}
                  width={100}
                  height={100}
                  style={{
                    width: '100px',
                    height: '100px'
                  }}
                  alt={prod.title}
                  className='mr-5 rounded'
                />  

                <div>
                  <p>{prod.title}</p>
                  <p>${prod.price}</p>
                  <QuantitySelector quantity={3}/>

                  <button className='underline mt-3'>
                    Remover
                  </button>
                </div>

              </div>

            ))
          }

          </div>



          {/* checkout */}
          <div className='bg-white rounded-xl shadow-lg p-7 h-fit'>
            <h2 className='text-2xl mb-2'>Resumen de la orden</h2>

            <div className='grid grid-cols-2'>

              <span>No. Productos</span>
              <span className='text-right'>3 Articulos</span>

              <span>Subtotal</span>
              <span className='text-right'>$ 100</span>

              <span>Inpuestos (15%)</span>
              <span className='text-right'>$ 100</span>

              <span className='text-2xl'>Total</span>
              <span className='text-right text-2xl'>$ 100</span>

            </div>

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